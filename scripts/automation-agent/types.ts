/**
 * Type definitions for Automation Idea Discovery Agent
 */

export interface RawSource {
  url: string;
  title: string;
  content: string;
  publishedDate: string;
  domain: string;
  trustScore: number;
}

export interface AutomationOpportunity {
  title: string;
  slug: string;
  industry: string;
  problem: string;
  solution: string[];
  roiMetrics: {
    timeSaved: string;
    costSavings: string;
    paybackPeriod: string;
    productivityGain?: string;
  };
  difficulty: number; // 1-10
  difficultyLabel: 'Easy' | 'Medium' | 'Hard';
  tools: string[];
  proof: {
    company: string;
    results: string;
    marketTrend?: string;
  };
  sourceUrl: string;
  sourceDomain: string;
  publishedDate: string;
  roiScore: number; // 1-10 (for filtering)
  trustScore: number; // Source trust score
}

export interface GeneratedContent {
  slug: string;
  mdxContent: string;
  ogImagePrompt: string;
}

export interface ValidationResult {
  isValid: boolean;
  reason?: string;
  warnings?: string[];
}

export interface PipelineStats {
  sourcesScraped: number;
  opportunitiesExtracted: number;
  opportunitiesValidated: number;
  ideasPublished: number;
  ideasRejected: number;
  rejectionReasons: Record<string, number>;
  duration: number; // milliseconds
  estimatedCost: number; // £
}

export interface NotificationPayload {
  published?: number;
  rejected?: number;
  duration?: string;
  publishedTitles?: string[];
  rejectedDetails?: Array<{ title: string; reason: string }>;
  error?: string;
  stats?: PipelineStats;
}
