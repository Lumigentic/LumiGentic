import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/automation-ideas');

export interface AutomationIdeaFrontmatter {
  title: string;
  slug: string;
  industry: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
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
}

export interface AutomationIdea {
  slug: string;
  frontmatter: AutomationIdeaFrontmatter;
  content: string;
}

export interface SerializedAutomationIdea {
  slug: string;
  frontmatter: AutomationIdeaFrontmatter;
  mdxSource: string; // Raw MDX content for MDXRemote RSC
}

/**
 * Get all automation idea slugs
 */
export function getAllIdeaSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace('.mdx', ''));
}

/**
 * Get automation idea by slug
 */
export function getIdeaBySlug(slug: string): AutomationIdea | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as AutomationIdeaFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading idea ${slug}:`, error);
    return null;
  }
}

/**
 * Get all automation ideas
 */
export function getAllIdeas(): AutomationIdea[] {
  const slugs = getAllIdeaSlugs();
  const ideas = slugs
    .map(slug => getIdeaBySlug(slug))
    .filter((idea): idea is AutomationIdea => idea !== null);

  // Sort by ROI score (highest first)
  return ideas.sort((a, b) => b.frontmatter.roiScore - a.frontmatter.roiScore);
}

/**
 * Get serialized MDX for rendering
 */
export async function getSerializedIdea(slug: string): Promise<SerializedAutomationIdea | null> {
  const idea = getIdeaBySlug(slug);

  if (!idea) {
    return null;
  }

  return {
    slug: idea.slug,
    frontmatter: idea.frontmatter,
    mdxSource: idea.content, // Return raw MDX content for MDXRemote RSC
  };
}

/**
 * Get ideas filtered by industry
 */
export function getIdeasByIndustry(industry: string): AutomationIdea[] {
  return getAllIdeas().filter(
    idea => idea.frontmatter.industry.toLowerCase() === industry.toLowerCase()
  );
}

/**
 * Get ideas filtered by difficulty
 */
export function getIdeasByDifficulty(difficulty: string): AutomationIdea[] {
  return getAllIdeas().filter(
    idea => idea.frontmatter.difficulty.toLowerCase() === difficulty.toLowerCase()
  );
}

/**
 * Get ideas filtered by minimum ROI score
 */
export function getIdeasByMinROI(minScore: number): AutomationIdea[] {
  return getAllIdeas().filter(
    idea => idea.frontmatter.roiScore >= minScore
  );
}

/**
 * Get unique industries from all ideas
 */
export function getAllIndustries(): string[] {
  const ideas = getAllIdeas();
  const industries = ideas.map(idea => idea.frontmatter.industry);
  return Array.from(new Set(industries)).sort();
}

/**
 * Get unique difficulties from all ideas
 */
export function getAllDifficulties(): string[] {
  const ideas = getAllIdeas();
  const difficulties = ideas.map(idea => idea.frontmatter.difficulty);
  return Array.from(new Set(difficulties)).sort();
}

/**
 * Search ideas by keyword
 */
export function searchIdeas(keyword: string): AutomationIdea[] {
  const lowercaseKeyword = keyword.toLowerCase();
  return getAllIdeas().filter(idea => {
    const searchText = `
      ${idea.frontmatter.title}
      ${idea.frontmatter.industry}
      ${idea.frontmatter.tools.join(' ')}
      ${idea.content}
    `.toLowerCase();

    return searchText.includes(lowercaseKeyword);
  });
}
