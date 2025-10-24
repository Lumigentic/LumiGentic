/**
 * Extraction Agent: Uses Claude to extract structured automation opportunities
 * from discovered sources
 */

import Anthropic from '@anthropic-ai/sdk';
import { RawSource, AutomationOpportunity } from './types';
import { RATE_LIMITS } from './config';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Extract automation opportunities from all sources
 */
export async function extractOpportunities(
  sources: RawSource[]
): Promise<AutomationOpportunity[]> {
  console.log('🧠 Extracting opportunities with Claude...\n');

  const allOpportunities: AutomationOpportunity[] = [];

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    console.log(`📝 Analyzing ${i + 1}/${sources.length}: ${source.domain}`);

    try {
      const opportunities = await extractFromSource(source);
      allOpportunities.push(...opportunities);
      console.log(`   ✅ Extracted ${opportunities.length} opportunities\n`);

      // Rate limiting
      if (i < sources.length - 1) {
        await sleep(RATE_LIMITS.extractionDelayMs);
      }
    } catch (error) {
      console.error(`   ❌ Extraction failed: ${error}\n`);
    }
  }

  console.log(`💡 Total opportunities extracted: ${allOpportunities.length}\n`);
  return allOpportunities;
}

/**
 * Extract opportunities from a single source using Claude
 */
async function extractFromSource(source: RawSource): Promise<AutomationOpportunity[]> {
  const prompt = `Analyze this article and extract automation opportunities with quantifiable ROI.

SOURCE INFORMATION:
Title: ${source.title}
URL: ${source.url}
Domain: ${source.domain} (Trust Score: ${source.trustScore}/10)
Content:
${source.content}

TASK:
Extract ALL automation opportunities mentioned in this content. For each opportunity, provide:

1. **Title**: Clear, specific automation opportunity (e.g., "Auto-Generate Clinical Notes from Audio Recording")

2. **Industry**: Primary industry/sector (choose one: Healthcare, Finance, Manufacturing, Retail, Professional Services, SME, Government, Contact Center, Logistics)

3. **Problem**: 2-3 sentences describing:
   - What manual process is being automated
   - Quantify the waste (hours/week, £/$ cost, error rate)
   - Who is affected (role, team size, department)

4. **Solution**: Step-by-step breakdown (4-6 steps) of how the automation works

5. **ROI Metrics** (MUST have real numbers - do not guess):
   - timeSaved: e.g., "3.5 hours per assessment" or "40% reduction"
   - costSavings: e.g., "£450,000 annually" or "$2.1M over 3 years"
   - paybackPeriod: e.g., "6 months" or "18 months"
   - productivityGain: (optional) e.g., "2.5x throughput increase"

6. **Difficulty**: Score 1-10 where:
   - 1-3 = Easy (simple integration, low-code, <4 weeks)
   - 4-7 = Medium (custom build, some integration, 4-12 weeks)
   - 8-10 = Hard (complex systems, compliance, >12 weeks)

7. **Tools**: Specific technologies mentioned (e.g., "GPT-4", "UiPath", "Zapier", "Power Automate")

8. **Proof**:
   - company: Name of company that implemented this
   - results: Specific metrics achieved
   - marketTrend: (optional) Why this is trending now

9. **ROI Score**: Rate 1-10 based on:
   - Quantifiable impact (10 = £500k+ savings, 1 = marginal)
   - Speed to value (10 = <6mo payback, 1 = >3yr)
   - Credibility of data (10 = specific numbers + company name, 1 = vague)

CRITICAL REQUIREMENTS:
- Only extract opportunities with REAL NUMBERS (don't make up ROI data)
- If no company name is mentioned, mark company as "Not specified"
- If ROI data is vague or missing, DO NOT include that opportunity
- Prefer opportunities relevant to UK businesses
- Each opportunity must be distinct (don't duplicate similar ideas)

OUTPUT FORMAT:
Respond with a JSON array of opportunities. If no clear opportunities with ROI data exist, return an empty array [].

Example:
[
  {
    "title": "Auto-Generate Clinical Notes from Audio Recording",
    "industry": "Healthcare",
    "problem": "Clinicians spend 5.8 hours on documentation for every autism diagnostic assessment, compared to 2.5-3.5 hour standard. This excessive paperwork limits patient throughput and contributes to backlogs of 18+ months.",
    "solution": [
      "Record consultation audio with patient consent (GDPR-compliant)",
      "AI transcribes speech in real-time using Whisper API",
      "GPT-4 extracts clinical observations and structures data",
      "Auto-populate assessment templates in EHR system",
      "Clinician reviews and approves final notes in 15 minutes"
    ],
    "roiMetrics": {
      "timeSaved": "3.5 hours per assessment",
      "costSavings": "£1.5M annually for medium diagnostic team",
      "paybackPeriod": "4-6 months",
      "productivityGain": "2.5x patient throughput increase"
    },
    "difficulty": 7,
    "tools": ["OpenAI Whisper", "GPT-4 API", "FHIR/HL7 Integration"],
    "proof": {
      "company": "NHS Trust (UK)",
      "results": "60% time reduction, £1.5M net annual contribution",
      "marketTrend": "NHS Digital Transformation Agenda 2025"
    },
    "roiScore": 9
  }
]`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const firstContent = message.content[0];
  if (firstContent.type !== 'text') {
    throw new Error('Expected text content from Claude API');
  }
  const responseText = firstContent.text;

  // Extract JSON from response (handle markdown code blocks)
  const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) ||
                    responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);

  if (!jsonMatch) {
    console.warn('   ⚠️  No JSON found in response');
    return [];
  }

  try {
    const opportunities = JSON.parse(jsonMatch[1] || jsonMatch[0]);

    // Enrich each opportunity with source metadata
    return opportunities.map((opp: any) => ({
      ...opp,
      slug: generateSlug(opp.title),
      difficultyLabel: getDifficultyLabel(opp.difficulty),
      sourceUrl: source.url,
      sourceDomain: source.domain,
      publishedDate: source.publishedDate,
      trustScore: source.trustScore,
    }));
  } catch (error) {
    console.error('   ❌ Failed to parse JSON:', error);
    return [];
  }
}

/**
 * Generate URL-friendly slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Convert difficulty score to label
 */
function getDifficultyLabel(score: number): 'Easy' | 'Medium' | 'Hard' {
  if (score <= 3) return 'Easy';
  if (score <= 7) return 'Medium';
  return 'Hard';
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { extractFromSource, generateSlug, getDifficultyLabel };
