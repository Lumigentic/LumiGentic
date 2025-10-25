import { getAllIdeas } from '@/lib/mdx';
import { AutomationIdeasClient } from './AutomationIdeasClient';

export const metadata = {
  title: 'Automation Idea Browser | LumiGentic',
  description: 'Discover proven automation opportunities from leading organisations. Each idea includes real ROI metrics, implementation guidance, and tools required.',
};

export default function AutomationIdeasPage() {
  // Get all automation ideas from MDX files
  const ideas = getAllIdeas();

  // Transform to format expected by client component
  const ideasData = ideas.map(idea => ({
    slug: idea.slug,
    title: idea.frontmatter.title,
    industry: idea.frontmatter.industry,
    difficulty: idea.frontmatter.difficulty,
    difficultyScore: idea.frontmatter.difficultyScore,
    roiScore: idea.frontmatter.roiScore,
    timeSaved: idea.frontmatter.timeSaved,
    costSavings: idea.frontmatter.costSavings,
    paybackPeriod: idea.frontmatter.paybackPeriod,
    tools: idea.frontmatter.tools,
  }));

  return <AutomationIdeasClient ideas={ideasData} />;
}
