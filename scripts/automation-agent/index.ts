#!/usr/bin/env node
/**
 * Main Orchestrator: Automation Idea Discovery Pipeline
 *
 * This autonomous agent:
 * 1. Searches trusted sources for automation opportunities
 * 2. Extracts structured data with Claude
 * 3. Validates quality and prevents duplicates
 * 4. Generates polished MDX content
 * 5. Publishes directly to the website
 * 6. Sends notifications
 *
 * Runs daily via GitHub Actions cron job
 */

import { discoverAutomationSources } from './discover';
import { extractOpportunities } from './extract';
import { validateOpportunity } from './validate';
import { generateIdeaContent } from './generate';
import { publishToSite, canPublishMore, shouldAutoPublish } from './publish';
import { sendNotification } from './notify';
import { PUBLISHING_CONFIG, RATE_LIMITS } from './config';
import type { PipelineStats, AutomationOpportunity } from './types';

/**
 * Main pipeline execution
 */
export async function runAutomationPipeline(): Promise<void> {
  console.log('╔═══════════════════════════════════════════════════╗');
  console.log('║   🤖 LumiGentic Automation Idea Discovery Agent  ║');
  console.log('║   Autonomous Research → Validation → Publishing  ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  const startTime = Date.now();
  const stats: PipelineStats = {
    sourcesScraped: 0,
    opportunitiesExtracted: 0,
    opportunitiesValidated: 0,
    ideasPublished: 0,
    ideasRejected: 0,
    rejectionReasons: {},
    duration: 0,
    estimatedCost: 0,
  };

  const published: AutomationOpportunity[] = [];
  const rejected: Array<{ opportunity: AutomationOpportunity; reason: string }> = [];

  try {
    // STEP 1: Discover sources from trusted domains
    console.log('═══════════════════════════════════════════════════');
    console.log('STEP 1: Discovering Sources');
    console.log('═══════════════════════════════════════════════════\n');

    const sources = await discoverAutomationSources();
    stats.sourcesScraped = sources.length;

    if (sources.length === 0) {
      console.log('⚠️  No sources found. Exiting.\n');
      await sendNotification({
        published: 0,
        rejected: 0,
        duration: '0',
        publishedTitles: [],
      });
      return;
    }

    // STEP 2: Extract opportunities using Claude
    console.log('═══════════════════════════════════════════════════');
    console.log('STEP 2: Extracting Opportunities');
    console.log('═══════════════════════════════════════════════════\n');

    const opportunities = await extractOpportunities(sources);
    stats.opportunitiesExtracted = opportunities.length;

    if (opportunities.length === 0) {
      console.log('⚠️  No opportunities extracted. Exiting.\n');
      await sendNotification({
        published: 0,
        rejected: 0,
        duration: getDuration(startTime),
        publishedTitles: [],
      });
      return;
    }

    // Sort by ROI score (highest first)
    opportunities.sort((a, b) => b.roiScore - a.roiScore);

    // STEP 3: Validate, Generate, and Publish
    console.log('═══════════════════════════════════════════════════');
    console.log('STEP 3: Validating & Publishing');
    console.log('═══════════════════════════════════════════════════\n');

    for (const opportunity of opportunities) {
      // Check if we've hit daily limit
      if (!(await canPublishMore(published.length))) {
        console.log(`⏸️  Reached daily limit (${PUBLISHING_CONFIG.maxIdeasPerDay} ideas). Stopping.\n`);
        break;
      }

      console.log(`\n📋 Processing: ${opportunity.title}`);
      console.log(`   Industry: ${opportunity.industry} | ROI: ${opportunity.roiScore}/10 | Source: ${opportunity.sourceDomain}\n`);

      // Validate
      const validation = await validateOpportunity(opportunity);

      if (!validation.isValid) {
        console.log(`   ❌ Rejected: ${validation.reason}\n`);
        rejected.push({ opportunity, reason: validation.reason || 'Unknown' });
        stats.ideasRejected++;
        stats.rejectionReasons[validation.reason || 'Unknown'] =
          (stats.rejectionReasons[validation.reason || 'Unknown'] || 0) + 1;
        continue;
      }

      if (validation.warnings && validation.warnings.length > 0) {
        console.log(`   ⚠️  Warnings: ${validation.warnings.join(', ')}`);
      }

      stats.opportunitiesValidated++;

      // Decide: auto-publish or queue for review
      const autoPublish = shouldAutoPublish(opportunity.roiScore);

      if (!autoPublish) {
        console.log(`   ⏸️  ROI score ${opportunity.roiScore}/10 - would queue for manual review`);
        console.log(`   💡 Set PUBLISHING_CONFIG.autoPublishThreshold lower to enable auto-publish\n`);
        // In fully autonomous mode, we skip review queue and just don't publish
        rejected.push({ opportunity, reason: 'Below auto-publish threshold' });
        stats.ideasRejected++;
        continue;
      }

      // Generate content
      console.log(`   ✍️  Generating content...`);
      const content = await generateIdeaContent(opportunity);

      // Publish
      console.log(`   📤 Publishing...`);
      await publishToSite(content);

      published.push(opportunity);
      stats.ideasPublished++;

      console.log(`   ✅ Published successfully!\n`);

      // Rate limiting between publishes
      if (published.length < PUBLISHING_CONFIG.maxIdeasPerDay) {
        await sleep(RATE_LIMITS.extractionDelayMs);
      }
    }

    // STEP 4: Send notifications
    console.log('═══════════════════════════════════════════════════');
    console.log('STEP 4: Sending Notifications');
    console.log('═══════════════════════════════════════════════════\n');

    stats.duration = Date.now() - startTime;
    stats.estimatedCost = estimateCost(stats);

    await sendNotification({
      published: stats.ideasPublished,
      rejected: stats.ideasRejected,
      duration: getDuration(startTime),
      publishedTitles: published.map(p => p.title),
      rejectedDetails: rejected.map(r => ({
        title: r.opportunity.title,
        reason: r.reason,
      })),
      stats,
    });

    // Final summary
    console.log('═══════════════════════════════════════════════════');
    console.log('Pipeline Complete');
    console.log('═══════════════════════════════════════════════════\n');

    console.log(`📊 SUMMARY:`);
    console.log(`   Sources scraped:      ${stats.sourcesScraped}`);
    console.log(`   Opportunities found:  ${stats.opportunitiesExtracted}`);
    console.log(`   Validated:            ${stats.opportunitiesValidated}`);
    console.log(`   Published:            ${stats.ideasPublished} ✅`);
    console.log(`   Rejected:             ${stats.ideasRejected} ❌`);
    console.log(`   Duration:             ${getDuration(startTime)} minutes`);
    console.log(`   Estimated cost:       £${stats.estimatedCost.toFixed(2)}\n`);

    if (stats.ideasPublished > 0) {
      console.log(`🎉 Successfully published ${stats.ideasPublished} new automation ideas!\n`);
      console.log(`   View at: https://lumigentic.com/automation-ideas\n`);
    }

    if (Object.keys(stats.rejectionReasons).length > 0) {
      console.log(`📋 Rejection reasons:`);
      Object.entries(stats.rejectionReasons)
        .sort(([, a], [, b]) => b - a)
        .forEach(([reason, count]) => {
          console.log(`   ${count}x ${reason}`);
        });
      console.log('');
    }

  } catch (error) {
    console.error('\n❌ Pipeline failed with error:\n');
    console.error(error);

    await sendNotification({
      error: error instanceof Error ? error.message : String(error),
    });

    process.exit(1);
  }
}

/**
 * Get duration in minutes
 */
function getDuration(startTime: number): string {
  return ((Date.now() - startTime) / 1000 / 60).toFixed(1);
}

/**
 * Estimate API costs
 */
function estimateCost(stats: PipelineStats): number {
  // Rough estimates:
  // - Perplexity: £0.02 per search
  // - Claude extraction: £0.10 per opportunity
  // - Claude validation: £0.05 per opportunity (high scores only)
  // - Claude content generation: £0.15 per idea

  const searchCost = stats.sourcesScraped * 0.02;
  const extractionCost = stats.opportunitiesExtracted * 0.10;
  const validationCost = stats.opportunitiesValidated * 0.05;
  const generationCost = stats.ideasPublished * 0.15;

  return searchCost + extractionCost + validationCost + generationCost;
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run if called directly
if (require.main === module) {
  runAutomationPipeline()
    .then(() => {
      console.log('✅ Pipeline completed successfully\n');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Pipeline failed:', error);
      process.exit(1);
    });
}

export default runAutomationPipeline;
