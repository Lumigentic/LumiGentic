import { getAllAutomationIdeas } from '@/lib/supabase';
import { AutomationIdeasClient } from './AutomationIdeasClient';

export const metadata = {
  title: 'Automation Idea Browser | LumiGentic',
  description: 'Discover proven automation opportunities from leading organisations. Each idea includes real ROI metrics, implementation guidance, and tools required.',
};

export default async function AutomationIdeasPage() {
  // Get all automation ideas from Supabase
  const ideas = await getAllAutomationIdeas();

  // Transform to format expected by client component
  const ideasData = ideas.map(idea => ({
    slug: idea.slug,
    title: idea.title,
    industry: idea.industry,
    difficulty: idea.difficulty,
    difficultyScore: idea.difficultyScore,
    roiScore: idea.roiScore,
    timeSaved: idea.timeSaved,
    costSavings: idea.costSavings,
    paybackPeriod: idea.paybackPeriod,
    tools: idea.tools,
  }));

  return <AutomationIdeasClient ideas={ideasData} />;
}
