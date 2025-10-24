/**
 * Content Generation Agent: Creates polished MDX content with LumiGentic brand voice
 */

import Anthropic from '@anthropic-ai/sdk';
import { AutomationOpportunity, GeneratedContent } from './types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Generate polished MDX content for an automation opportunity
 */
export async function generateIdeaContent(
  opportunity: AutomationOpportunity
): Promise<GeneratedContent> {
  console.log(`✍️  Generating content: ${opportunity.title}`);

  const prompt = `You are a professional content writer for LumiGentic, a UK-based AI automation consultancy.

Transform this automation opportunity into an engaging, SEO-optimized idea card for our Automation Idea Browser.

OPPORTUNITY DATA:
${JSON.stringify(opportunity, null, 2)}

OUTPUT AN MDX FILE with this exact structure:

---
title: "${opportunity.title}"
slug: "${opportunity.slug}"
industry: "${opportunity.industry}"
difficulty: "${opportunity.difficultyLabel}"
difficultyScore: ${opportunity.difficulty}
roiScore: ${opportunity.roiScore}
timeSaved: "${opportunity.roiMetrics.timeSaved}"
costSavings: "${opportunity.roiMetrics.costSavings}"
paybackPeriod: "${opportunity.roiMetrics.paybackPeriod}"
${opportunity.roiMetrics.productivityGain ? `productivityGain: "${opportunity.roiMetrics.productivityGain}"` : ''}
tools: ${JSON.stringify(opportunity.tools)}
publishedDate: "${new Date().toISOString()}"
sourceUrl: "${opportunity.sourceUrl}"
sourceDomain: "${opportunity.sourceDomain}"
---

# ${opportunity.title}

## 📊 The Numbers

- **Time Saved**: ${opportunity.roiMetrics.timeSaved}
- **Annual Impact**: ${opportunity.roiMetrics.costSavings}
- **Payback Period**: ${opportunity.roiMetrics.paybackPeriod}
${opportunity.roiMetrics.productivityGain ? `- **Productivity Gain**: ${opportunity.roiMetrics.productivityGain}` : ''}
- **Difficulty**: ${opportunity.difficulty}/10 (${opportunity.difficultyLabel})

## 🎯 The Problem

${enhanceProblemStatement(opportunity.problem)}

## 💡 The Automation

How this automation works:

${opportunity.solution.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## 🔧 Tools Required

${opportunity.tools.map(tool => `- **${tool}** - ${describeToolUsage(tool)}`).join('\n')}

## ⚠️ Implementation Considerations

${generateImplementationGuidance(opportunity)}

## ✅ Proof & Signals

- **Case Study**: ${opportunity.proof.company}
- **Results Achieved**: ${opportunity.proof.results}
${opportunity.proof.marketTrend ? `- **Market Trend**: ${opportunity.proof.marketTrend}` : ''}
- **Source**: [${opportunity.sourceDomain}](${opportunity.sourceUrl})

## 🚀 Getting Started

### DIY Approach

${generateDIYSteps(opportunity)}

**Estimated build time**: ${estimateBuildTime(opportunity.difficulty)} weeks

### Professional Build

LumiGentic can deliver this automation with:
- Full compliance and security review
- Seamless system integration
- Team training and change management
- Ongoing support and optimization

**Typical delivery**: ${estimateProfessionalDelivery(opportunity.difficulty)} weeks

---

**Ready to explore this for your organisation?**

[Book a Discovery Call](/contact) • [Get a Bespoke Automation Report](/reports)

---

*Part of the [LumiGentic Automation Idea Browser](/automation-ideas) • Published ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}*

WRITING GUIDELINES YOU MUST FOLLOW:
- UK spellings (organisation, realise, optimise, etc.)
- Professional but conversational tone (like talking to a business leader)
- Focus on business outcomes first, technology second
- Use concrete numbers, never vague phrases like "significant savings"
- Balance aspiration with realism - don't overhype
- Include both DIY and "hire LumiGentic" paths (not pushy)
- SEO-friendly (use keywords naturally in headings/content)
- Avoid buzzwords and jargon where possible
- Keep paragraphs short (2-3 sentences max)
- Use active voice

Now output the complete MDX file following this structure exactly.`;

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
  const mdxContent = firstContent.text;

  // Generate OG image prompt for social sharing
  const ogImagePrompt = generateOGImagePrompt(opportunity);

  console.log(`   ✅ Content generated (${mdxContent.length} chars)\n`);

  return {
    slug: opportunity.slug,
    mdxContent: cleanMDXContent(mdxContent),
    ogImagePrompt,
  };
}

/**
 * Enhance problem statement (placeholder - Claude will do this)
 */
function enhanceProblemStatement(problem: string): string {
  return problem; // Claude will enhance this in the prompt
}

/**
 * Describe tool usage (placeholder - Claude will do this)
 */
function describeToolUsage(tool: string): string {
  return ''; // Claude will fill this in
}

/**
 * Generate implementation guidance based on difficulty
 */
function generateImplementationGuidance(opportunity: AutomationOpportunity): string {
  const guidance: string[] = [];

  if (opportunity.industry === 'Healthcare') {
    guidance.push('GDPR and NHS data standards compliance required');
    guidance.push('Clinical validation and approval processes');
  }

  if (opportunity.industry === 'Finance') {
    guidance.push('FCA compliance and audit trail requirements');
    guidance.push('Data security and encryption standards');
  }

  if (opportunity.difficulty >= 7) {
    guidance.push('Complex system integration (8-12 weeks)');
    guidance.push('Dedicated technical resources needed');
  }

  if (guidance.length === 0) {
    return 'Standard implementation practices apply. Consider pilot testing with a small team before full rollout.';
  }

  return guidance.map(g => `- ${g}`).join('\n');
}

/**
 * Generate DIY steps (placeholder - Claude will do this)
 */
function generateDIYSteps(opportunity: AutomationOpportunity): string {
  return ''; // Claude will generate this
}

/**
 * Estimate build time based on difficulty
 */
function estimateBuildTime(difficulty: number): string {
  if (difficulty <= 3) return '2-4';
  if (difficulty <= 6) return '6-10';
  return '12-16';
}

/**
 * Estimate professional delivery time
 */
function estimateProfessionalDelivery(difficulty: number): string {
  if (difficulty <= 3) return '2-4';
  if (difficulty <= 6) return '4-8';
  return '8-12';
}

/**
 * Generate OG image prompt for social sharing
 */
function generateOGImagePrompt(opportunity: AutomationOpportunity): string {
  return `Professional automation infographic for "${opportunity.title}".
Modern, clean design with LumiGentic branding (black, white, subtle gradients).
Include: ${opportunity.industry} industry icon, ROI metric "${opportunity.roiMetrics.costSavings}",
difficulty indicator (${opportunity.difficultyLabel}), and payback period "${opportunity.roiMetrics.paybackPeriod}".
Style: Enterprise-grade, trustworthy, data-driven visualization.`;
}

/**
 * Clean MDX content (remove code fences if Claude added them)
 */
function cleanMDXContent(content: string): string {
  // Remove markdown code fences if present
  let cleaned = content.replace(/^```mdx?\s*\n/i, '').replace(/\n```\s*$/i, '');

  // Ensure proper frontmatter formatting
  if (!cleaned.startsWith('---\n')) {
    cleaned = '---\n' + cleaned;
  }

  return cleaned.trim();
}

export {
  enhanceProblemStatement,
  generateImplementationGuidance,
  estimateBuildTime,
  generateOGImagePrompt,
};
