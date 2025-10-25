/**
 * Validation Agent: Ensures quality and prevents duplicates
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';
import path from 'path';
import { AutomationOpportunity, ValidationResult } from './types';
import { QUALITY_THRESHOLDS } from './config';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Validate an automation opportunity before publishing
 */
export async function validateOpportunity(
  opportunity: AutomationOpportunity
): Promise<ValidationResult> {
  const warnings: string[] = [];

  // Check 1: ROI score threshold
  if (opportunity.roiScore < QUALITY_THRESHOLDS.minROIScore) {
    return {
      isValid: false,
      reason: `ROI score too low: ${opportunity.roiScore}/10 (minimum: ${QUALITY_THRESHOLDS.minROIScore})`,
    };
  }

  // Check 2: Trust score threshold
  if (opportunity.trustScore < QUALITY_THRESHOLDS.minTrustScore) {
    return {
      isValid: false,
      reason: `Source trust score too low: ${opportunity.trustScore}/10 (minimum: ${QUALITY_THRESHOLDS.minTrustScore})`,
    };
  }

  // Check 3: Has ROI metrics
  if (QUALITY_THRESHOLDS.requireNumbers) {
    if (!opportunity.roiMetrics.costSavings || !opportunity.roiMetrics.timeSaved) {
      return {
        isValid: false,
        reason: 'Missing required ROI metrics (cost savings or time saved)',
      };
    }
  }

  // Check 4: Has company name (if required)
  if (QUALITY_THRESHOLDS.requireCompanyName) {
    if (!opportunity.proof.company || opportunity.proof.company === 'Not specified') {
      warnings.push('No specific company name mentioned');
    }
  }

  // Check 5: Content length
  const totalContentLength =
    opportunity.problem.length +
    opportunity.solution.join(' ').length;

  if (totalContentLength < QUALITY_THRESHOLDS.minContentLength) {
    return {
      isValid: false,
      reason: `Content too short: ${totalContentLength} chars (minimum: ${QUALITY_THRESHOLDS.minContentLength})`,
    };
  }

  // Check 6: No duplicates
  const isDuplicate = await checkForDuplicates(opportunity.title, opportunity.slug);
  if (isDuplicate) {
    return {
      isValid: false,
      reason: 'Duplicate of existing published idea',
    };
  }

  // Check 7: AI credibility validation (for high-value opportunities)
  if (opportunity.roiScore >= 8) {
    const credibilityCheck = await validateCredibilityWithAI(opportunity);
    if (!credibilityCheck.isCredible) {
      return {
        isValid: false,
        reason: credibilityCheck.reason || 'Failed AI credibility check',
      };
    }
  }

  return {
    isValid: true,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Check if similar idea already exists
 */
async function checkForDuplicates(title: string, slug: string): Promise<boolean> {
  const ideasDir = path.join(process.cwd(), 'content/automation-ideas');

  try {
    // Check if slug already exists
    const slugPath = path.join(ideasDir, `${slug}.mdx`);
    try {
      await fs.access(slugPath);
      return true; // File exists with same slug
    } catch {
      // File doesn't exist, continue with semantic check
    }

    // Check semantic similarity with existing ideas
    const files = await fs.readdir(ideasDir);

    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;

      const content = await fs.readFile(path.join(ideasDir, file), 'utf-8');
      const existingTitle = content.match(/^title:\s*"(.+)"$/m)?.[1];

      if (existingTitle) {
        const similarity = await checkTitleSimilarity(title, existingTitle);
        if (similarity > 0.85) {
          console.log(`   ⚠️  High similarity (${similarity}) with: ${existingTitle}`);
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    // Directory doesn't exist yet, no duplicates possible
    if ((error as any).code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

/**
 * Check semantic similarity between two titles using Claude
 */
async function checkTitleSimilarity(title1: string, title2: string): Promise<number> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 50,
    messages: [
      {
        role: 'user',
        content: `Are these two automation ideas essentially the same thing?

Idea 1: ${title1}
Idea 2: ${title2}

Rate similarity from 0.0 (completely different concepts) to 1.0 (same idea, just different wording).

Examples:
- "Invoice OCR Automation" vs "Auto-Extract Data from Invoices" = 0.95 (same idea)
- "Clinical Notes Automation" vs "Invoice Processing" = 0.0 (different)
- "Email Auto-Response" vs "Email Categorization" = 0.5 (related but different)

Respond with ONLY a decimal number between 0.0 and 1.0, nothing else.`,
      },
    ],
  });

  const firstContent = message.content[0];
  if (firstContent.type !== 'text') {
    throw new Error('Expected text content from Claude API');
  }
  const response = firstContent.text.trim();
  const similarity = parseFloat(response);

  return isNaN(similarity) ? 0 : similarity;
}

/**
 * Use Claude to validate credibility of opportunity
 */
async function validateCredibilityWithAI(
  opportunity: AutomationOpportunity
): Promise<{ isCredible: boolean; reason?: string }> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `Evaluate this automation opportunity for credibility and realism:

${JSON.stringify(opportunity, null, 2)}

Check for:
1. **ROI Realism**: Are the cost savings and time savings realistic? (Not too good to be true)
2. **Source Credibility**: Is ${opportunity.sourceDomain} a reputable source? (Trust score: ${opportunity.trustScore}/10)
3. **Technical Feasibility**: Can this actually be implemented with current technology?
4. **Market Relevance**: Would this be valuable to UK businesses in 2025?
5. **Data Specificity**: Are the metrics specific enough? (avoid vague claims)

Red flags to watch for:
- ROI claims >1000% without solid proof
- "Revolutionary" or "game-changing" language without substance
- Vague metrics like "significant improvement" without numbers
- Technologies that don't exist yet
- Unrealistic timelines (e.g., "implement in 1 week")

Respond with JSON only:
{
  "isCredible": true or false,
  "reason": "brief explanation if false",
  "confidenceScore": 0-10
}`,
      },
    ],
  });

  const firstContent = message.content[0];
  if (firstContent.type !== 'text') {
    throw new Error('Expected text content from Claude API');
  }
  const responseText = firstContent.text;

  try {
    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { isCredible: false, reason: 'Failed to parse validation response' };
    }

    const result = JSON.parse(jsonMatch[0]);
    return {
      isCredible: result.isCredible && result.confidenceScore >= 7,
      reason: result.reason,
    };
  } catch (error) {
    console.error('   ⚠️  Failed to parse credibility check:', error);
    return { isCredible: false, reason: 'Validation parsing error' };
  }
}

export { checkForDuplicates, checkTitleSimilarity, validateCredibilityWithAI };
