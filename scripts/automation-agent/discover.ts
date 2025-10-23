/**
 * Discovery Agent: Searches trusted sources for automation opportunities
 * Uses Perplexity API for high-quality search with built-in citations
 */

import { RawSource } from './types';
import {
  SEARCH_QUERIES,
  ALL_TRUSTED_DOMAINS,
  SOURCE_TRUST_SCORES,
  RATE_LIMITS
} from './config';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  citations?: string[];
}

/**
 * Search for automation opportunities using Perplexity API
 */
export async function discoverAutomationSources(): Promise<RawSource[]> {
  console.log('🔍 Starting discovery from trusted sources...\n');

  const allSources: RawSource[] = [];
  const maxQueries = Math.min(SEARCH_QUERIES.length, RATE_LIMITS.maxSearchesPerRun);

  for (let i = 0; i < maxQueries; i++) {
    const query = SEARCH_QUERIES[i];
    console.log(`📡 Query ${i + 1}/${maxQueries}: "${query}"`);

    try {
      const sources = await searchWithPerplexity(query);
      allSources.push(...sources);
      console.log(`   ✅ Found ${sources.length} sources\n`);

      // Rate limiting
      if (i < maxQueries - 1) {
        await sleep(RATE_LIMITS.searchDelayMs);
      }
    } catch (error) {
      console.error(`   ❌ Search failed: ${error}\n`);
    }
  }

  // Deduplicate by URL
  const uniqueSources = deduplicateSources(allSources);
  console.log(`📚 Total unique sources: ${uniqueSources.length}\n`);

  return uniqueSources;
}

/**
 * Search using Perplexity API (includes source citations)
 */
async function searchWithPerplexity(query: string): Promise<RawSource[]> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY not set');
  }

  const response = await fetch(PERPLEXITY_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [
        {
          role: 'system',
          content: `You are a research assistant finding automation case studies from credible sources only.
Only cite sources from these domains: ${ALL_TRUSTED_DOMAINS.join(', ')}.
Focus on recent (2024-2025) case studies with quantifiable ROI data.`
        },
        {
          role: 'user',
          content: `${query}

Find 3-5 recent case studies or articles about automation implementations with clear ROI metrics.
For each, provide:
1. Article title
2. Source URL
3. Brief summary (2-3 sentences) highlighting the ROI/impact
4. Publication date (if available)

Only include sources from trusted business/tech publications, consulting firms, or major tech vendors.`
        }
      ],
      temperature: 0.2,
      return_citations: true,
      search_recency_filter: 'year', // Last year only
    }),
  });

  if (!response.ok) {
    throw new Error(`Perplexity API error: ${response.statusText}`);
  }

  const data: PerplexityResponse = await response.json();
  const content = data.choices[0]?.message?.content || '';
  const citations = data.citations || [];

  // Parse the response to extract sources
  return parsePerplexityResponse(content, citations);
}

/**
 * Parse Perplexity response into structured sources
 */
function parsePerplexityResponse(content: string, citations: string[]): RawSource[] {
  const sources: RawSource[] = [];

  // For each citation, validate domain and create source object
  for (const url of citations) {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '');

      // Only include if from trusted domain
      if (!ALL_TRUSTED_DOMAINS.includes(domain)) {
        console.log(`   ⚠️  Skipping untrusted domain: ${domain}`);
        continue;
      }

      const trustScore = SOURCE_TRUST_SCORES[domain] || 5;

      sources.push({
        url,
        title: extractTitleFromContent(content, url),
        content: content, // Perplexity's summary
        publishedDate: new Date().toISOString().split('T')[0], // We'll extract this later
        domain,
        trustScore,
      });
    } catch (error) {
      console.error(`   ⚠️  Invalid URL: ${url}`);
    }
  }

  return sources;
}

/**
 * Extract title from Perplexity's content for a given URL
 */
function extractTitleFromContent(content: string, url: string): string {
  // Simple heuristic: find the line that mentions this URL
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(url) || lines[i].includes(new URL(url).hostname)) {
      // Look for nearby title-like text
      if (i > 0 && lines[i - 1].length > 10) {
        return lines[i - 1].replace(/^\d+\.\s*/, '').replace(/^#+\s*/, '').trim();
      }
    }
  }

  // Fallback: extract from URL path
  try {
    const urlObj = new URL(url);
    return urlObj.pathname
      .split('/')
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, ' ')
      .replace(/\.\w+$/, '') || 'Automation Case Study';
  } catch {
    return 'Automation Case Study';
  }
}

/**
 * Deduplicate sources by URL
 */
function deduplicateSources(sources: RawSource[]): RawSource[] {
  const seen = new Set<string>();
  const unique: RawSource[] = [];

  for (const source of sources) {
    if (!seen.has(source.url)) {
      seen.add(source.url);
      unique.push(source);
    }
  }

  return unique;
}

/**
 * Sleep utility for rate limiting
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Export for testing
export { searchWithPerplexity, parsePerplexityResponse };
