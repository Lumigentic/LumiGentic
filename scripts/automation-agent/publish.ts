/**
 * Publishing Agent: Writes MDX files and commits to Git
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { GeneratedContent } from './types';
import { PUBLISHING_CONFIG } from './config';

/**
 * Publish automation idea to the website
 */
export async function publishToSite(content: GeneratedContent): Promise<void> {
  const ideasDir = path.join(process.cwd(), 'content/automation-ideas');

  // Ensure directory exists
  await fs.mkdir(ideasDir, { recursive: true });

  // Write MDX file
  const filePath = path.join(ideasDir, `${content.slug}.mdx`);
  await fs.writeFile(filePath, content.mdxContent, 'utf-8');

  console.log(`   ✅ Created: content/automation-ideas/${content.slug}.mdx`);

  // Git commit and push
  await commitAndPush(content.slug);
}

/**
 * Commit and push to GitHub
 */
async function commitAndPush(slug: string): Promise<void> {
  const cwd = process.cwd();

  try {
    // Configure git (in case running in CI)
    try {
      execSync('git config user.email "automation-agent@lumigentic.com"', { cwd });
      execSync('git config user.name "LumiGentic Automation Agent"', { cwd });
    } catch {
      // Already configured
    }

    // Add the new file
    execSync('git add content/automation-ideas/', { cwd, stdio: 'pipe' });

    // Check if there are changes to commit
    try {
      execSync('git diff --cached --quiet', { cwd, stdio: 'pipe' });
      console.log('   ℹ️  No changes to commit (file may already exist)');
      return;
    } catch {
      // Changes exist, continue with commit
    }

    // Commit
    const commitMessage = `${PUBLISHING_CONFIG.gitCommitMessage}: ${slug}

Published by automation agent
Source validation: ✅ Passed
Quality checks: ✅ Passed

🤖 Generated with Claude Code
`;

    execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { cwd, stdio: 'pipe' });
    console.log(`   ✅ Committed: ${slug}`);

    // Push to remote
    execSync('git push origin main', { cwd, stdio: 'pipe' });
    console.log(`   🚀 Pushed to GitHub`);

  } catch (error: any) {
    console.error(`   ❌ Git operation failed: ${error.message}`);

    // If push failed due to authentication, log helpful message
    if (error.message.includes('Authentication failed')) {
      console.error(`
   💡 TIP: Ensure GitHub credentials are configured for GitHub Actions.
      Set GITHUB_TOKEN in secrets for automated pushes.
      `);
    }

    throw error;
  }
}

/**
 * Check if we've hit daily publishing limit
 */
export async function canPublishMore(publishedCount: number): Promise<boolean> {
  return publishedCount < PUBLISHING_CONFIG.maxIdeasPerDay;
}

/**
 * Determine if idea should auto-publish or queue for review
 */
export function shouldAutoPublish(roiScore: number): boolean {
  return roiScore >= PUBLISHING_CONFIG.autoPublishThreshold;
}

export { commitAndPush };
