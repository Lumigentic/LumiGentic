import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface AutomationIdea {
  slug: string;
  title: string;
  industry: string;
  difficulty: string;
  difficultyScore: number;
  roiScore: number;
  timeSaved: string;
  costSavings: string;
  paybackPeriod: string;
  productivityGain?: string;
  tools: string[];
  publishedDate: string;
  sourceUrl: string;
  sourceDomain: string;
  content: string;
}

const ideasDirectory = path.join(process.cwd(), 'content/automation-ideas');

export function getAllAutomationIdeas(): AutomationIdea[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(ideasDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(ideasDirectory);
    const allIdeas = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(ideasDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          ...data,
          content,
        } as AutomationIdea;
      });

    // Sort by published date (newest first)
    return allIdeas.sort((a, b) => {
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });
  } catch (error) {
    console.error('Error reading automation ideas:', error);
    return [];
  }
}

export function getAutomationIdeaBySlug(slug: string): AutomationIdea | null {
  try {
    const fullPath = path.join(ideasDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...data,
      content,
    } as AutomationIdea;
  } catch (error) {
    console.error(`Error reading automation idea ${slug}:`, error);
    return null;
  }
}

export function getIndustries(): string[] {
  const ideas = getAllAutomationIdeas();
  const industries = new Set(ideas.map((idea) => idea.industry));
  return Array.from(industries).sort();
}

export function getDifficulties(): string[] {
  return ['Easy', 'Medium', 'Hard'];
}
