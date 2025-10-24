#!/usr/bin/env node
/**
 * Automated Automation Idea Discovery using Claude
 *
 * This script uses Claude to:
 * 1. Search for automation case studies and success stories
 * 2. Extract key information (ROI, tools, implementation)
 * 3. Generate MDX content for the website
 * 4. Commit and push to GitHub
 *
 * Cost: ~£2-5 per run (much cheaper than Perplexity + Claude)
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface AutomationIdea {
  title: string;
  slug: string;
  industry: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  roiScore: number;
  timeSaved: string;
  costSavings: string;
  paybackPeriod: string;
  tools: string[];
  publishedDate: string;
  sourceUrl: string;
  content: {
    problem: string;
    solution: string[];
    considerations: string[];
    proof: string;
  };
}

/**
 * Ask Claude to discover new automation opportunities
 */
async function discoverAutomationIdeas(): Promise<AutomationIdea[]> {
  console.log('🔍 Asking Claude to discover automation opportunities...\n');

  const prompt = `You are an expert automation consultant researching real-world automation success stories.

Your task: Find 3 high-quality automation opportunities with proven ROI that would be valuable for UK businesses.

REQUIREMENTS:
1. Focus on REAL case studies with concrete numbers (time saved, cost reduction, etc.)
2. Prioritize recent success stories (2023-2025)
3. Include diverse industries (healthcare, finance, retail, manufacturing, etc.)
4. Each idea must have:
   - Clear problem statement
   - Measurable ROI metrics
   - Specific tools/platforms used
   - Proof of success (company name + results)
   - Source URL to verify

TRUSTED SOURCES TO SEARCH:
- McKinsey, BCG, Bain consulting reports
- Gartner, Forrester research
- UiPath, Microsoft, AWS case studies
- NHS Digital case studies
- Harvard Business Review
- Industry-specific publications

OUTPUT FORMAT (JSON array):
[
  {
    "title": "Automate X Process to Save Y Hours",
    "slug": "automate-x-process-save-y-hours",
    "industry": "Healthcare" | "Finance" | "Retail" | "Manufacturing" | "Contact Center" | etc.,
    "difficulty": "Easy" | "Medium" | "Hard",
    "roiScore": 1-10,
    "timeSaved": "e.g. 17 minutes per transaction",
    "costSavings": "e.g. £878k annually",
    "paybackPeriod": "e.g. 4-6 months",
    "tools": ["Tool 1", "Tool 2"],
    "publishedDate": "${new Date().toISOString().split('T')[0]}",
    "sourceUrl": "https://...",
    "content": {
      "problem": "Detailed problem description...",
      "solution": [
        "Step 1 - Description",
        "Step 2 - Description",
        "Step 3 - Description"
      ],
      "considerations": [
        "Consideration 1",
        "Consideration 2"
      ],
      "proof": "Company X achieved Y result saving Z..."
    }
  }
]

Find 3 real automation opportunities with proven ROI. Return ONLY valid JSON.`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    temperature: 1,
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

  // Extract JSON from response
  const jsonMatch = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (!jsonMatch) {
    console.error('❌ Failed to extract JSON from Claude response');
    console.log('Response:', responseText.substring(0, 500));
    return [];
  }

  try {
    const ideas = JSON.parse(jsonMatch[0]) as AutomationIdea[];
    console.log(`✅ Discovered ${ideas.length} automation ideas\n`);
    return ideas;
  } catch (error) {
    console.error('❌ Failed to parse JSON:', error);
    return [];
  }
}

/**
 * Check if idea already exists
 */
function ideaExists(slug: string): boolean {
  const contentDir = path.join(process.cwd(), 'content/automation-ideas');
  const filePath = path.join(contentDir, `${slug}.mdx`);
  return fs.existsSync(filePath);
}

/**
 * Get list of existing idea titles for duplicate checking
 */
function getExistingIdeas(): string[] {
  const contentDir = path.join(process.cwd(), 'content/automation-ideas');
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  return files
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''));
}

/**
 * Generate MDX content for an automation idea
 */
function generateMDX(idea: AutomationIdea): string {
  return `---
title: "${idea.title}"
publishedAt: "${idea.publishedDate}"
summary: "${idea.content.problem.substring(0, 150)}..."
industry: "${idea.industry}"
difficulty: "${idea.difficulty}"
roiScore: ${idea.roiScore}
timeSaved: "${idea.timeSaved}"
costSavings: "${idea.costSavings}"
paybackPeriod: "${idea.paybackPeriod}"
tools: ${JSON.stringify(idea.tools)}
sourceUrl: "${idea.sourceUrl}"
---

## 🎯 The Problem

${idea.content.problem}

## 💡 The Automation

How this automation works:

${idea.content.solution.map((step, i) => `${i + 1}. **${step.split(' - ')[0]}** - ${step.split(' - ')[1] || ''}`).join('\n')}

## 🔧 Tools Required

${idea.tools.map(tool => `- **${tool}**`).join('\n')}

## ⚠️ Implementation Considerations

${idea.content.considerations.map(c => `- ${c}`).join('\n')}

## ✅ Proof & Signals

${idea.content.proof}

[View Source](${idea.sourceUrl})

---

*Ready to explore this for your organisation? [Get a bespoke automation report](/#contact) tailored to your business with detailed ROI projections and implementation roadmaps.*
`;
}

/**
 * Save idea to file system
 */
function saveIdea(idea: AutomationIdea): void {
  const contentDir = path.join(process.cwd(), 'content/automation-ideas');

  // Create directory if it doesn't exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const filePath = path.join(contentDir, `${idea.slug}.mdx`);
  const mdxContent = generateMDX(idea);

  fs.writeFileSync(filePath, mdxContent, 'utf-8');
  console.log(`   ✅ Saved: ${idea.slug}.mdx`);
}

/**
 * Commit and push new ideas to GitHub
 */
function commitAndPush(newIdeas: AutomationIdea[]): void {
  if (newIdeas.length === 0) {
    console.log('\n📭 No new ideas to commit');
    return;
  }

  console.log('\n📤 Committing and pushing to GitHub...');

  try {
    // Stage all new MDX files
    newIdeas.forEach(idea => {
      execSync(`git add "content/automation-ideas/${idea.slug}.mdx"`, { stdio: 'inherit' });
    });

    // Create commit message
    const titles = newIdeas.map(i => `- ${i.title}`).join('\n');
    const commitMessage = `Add ${newIdeas.length} new automation idea${newIdeas.length > 1 ? 's' : ''}

${titles}

🤖 Discovered and published by Claude Automation Agent`;

    execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });

    console.log('\n✅ Successfully pushed to GitHub!');
    console.log('🚀 Vercel will auto-deploy in ~2 minutes');
  } catch (error) {
    console.error('❌ Git operation failed:', error);
    throw error;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🤖 LumiGentic Automation Idea Discovery Agent');
  console.log('=' .repeat(50));
  console.log();

  try {
    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required');
    }

    // Get existing ideas
    const existingIdeas = getExistingIdeas();
    console.log(`📚 Found ${existingIdeas.length} existing ideas\n`);

    // Discover new ideas
    const discoveredIdeas = await discoverAutomationIdeas();

    if (discoveredIdeas.length === 0) {
      console.log('❌ No ideas discovered');
      return;
    }

    // Filter out duplicates
    const newIdeas = discoveredIdeas.filter(idea => {
      if (ideaExists(idea.slug)) {
        console.log(`   ⏭️  Skipping duplicate: ${idea.slug}`);
        return false;
      }
      return true;
    });

    if (newIdeas.length === 0) {
      console.log('\n✅ All discovered ideas already exist');
      return;
    }

    console.log(`\n✨ Found ${newIdeas.length} new idea${newIdeas.length > 1 ? 's' : ''}:`);
    newIdeas.forEach(idea => {
      console.log(`   - ${idea.title}`);
    });
    console.log();

    // Save new ideas
    console.log('💾 Saving new ideas...');
    newIdeas.forEach(saveIdea);

    // Commit and push
    commitAndPush(newIdeas);

    console.log('\n✅ Discovery pipeline completed successfully!');
  } catch (error) {
    console.error('\n❌ Pipeline failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { main, discoverAutomationIdeas };
