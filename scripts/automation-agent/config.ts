/**
 * Configuration for Automation Idea Discovery Agent
 *
 * This agent discovers automation opportunities from trusted sources,
 * validates content quality, and publishes to the LumiGentic website.
 */

export const TRUSTED_SOURCES = {
  // Tier 1: Premium consulting & research firms
  tier1: [
    'mckinsey.com',
    'bcg.com',
    'deloitte.com',
    'accenture.com',
    'pwc.com',
    'bain.com',
    'gartner.com',
    'forrester.com',
  ],

  // Tier 2: Major tech vendors with real case studies
  tier2: [
    'microsoft.com',
    'salesforce.com',
    'uipath.com',
    'automationanywhere.com',
    'servicenow.com',
    'workday.com',
    'oracle.com',
    'sap.com',
    'ibm.com',
  ],

  // Tier 3: Reputable business/tech media
  tier3: [
    'hbr.org',              // Harvard Business Review
    'forbes.com',
    'techcrunch.com',
    'technologyreview.com',
    'wsj.com',
    'ft.com',
    'economist.com',
  ],

  // Tier 4: Industry-specific publications
  tier4: [
    'healthcareitnews.com',
    'manufacturingglobal.com',
    'finextra.com',
    'retailtechnology.co.uk',
  ],

  // Tier 5: Academic & research
  tier5: [
    'arxiv.org',
    'ieee.org',
  ],

  // Tier 6: Government & official sources
  tier6: [
    'nhs.uk',
    'gov.uk',
    'digital.nhs.uk',
  ],
};

// Flatten all trusted domains
export const ALL_TRUSTED_DOMAINS = Object.values(TRUSTED_SOURCES).flat();

// Source quality scoring
export const SOURCE_TRUST_SCORES: Record<string, number> = {
  // Tier 1 = 10/10 (highest trust)
  ...Object.fromEntries(TRUSTED_SOURCES.tier1.map(d => [d, 10])),

  // Tier 2 = 9/10
  ...Object.fromEntries(TRUSTED_SOURCES.tier2.map(d => [d, 9])),

  // Tier 3 = 8/10
  ...Object.fromEntries(TRUSTED_SOURCES.tier3.map(d => [d, 8])),

  // Tier 4 = 7/10
  ...Object.fromEntries(TRUSTED_SOURCES.tier4.map(d => [d, 7])),

  // Tier 5 = 8/10
  ...Object.fromEntries(TRUSTED_SOURCES.tier5.map(d => [d, 8])),

  // Tier 6 = 10/10
  ...Object.fromEntries(TRUSTED_SOURCES.tier6.map(d => [d, 10])),
};

// Search queries to discover automation opportunities
export const SEARCH_QUERIES = [
  // Case studies with ROI
  "automation case study 2025 ROI results",
  "AI automation success story cost savings",
  "process automation implementation £ million saved",
  "RPA deployment results healthcare finance",

  // Industry-specific
  "healthcare automation AI clinical workflow 2025",
  "manufacturing automation efficiency gains",
  "financial services automation case study",
  "retail automation inventory management",
  "SME automation productivity improvement",

  // Technology trends
  "generative AI business automation use case",
  "GPT-4 enterprise automation deployment",
  "computer vision automation invoice processing",
  "speech-to-text clinical documentation automation",

  // Pain points & opportunities
  "manual process costing businesses time money",
  "administrative burden UK businesses 2025",
  "workflow inefficiency enterprise solutions",
];

// Quality validation thresholds
export const QUALITY_THRESHOLDS = {
  minROIScore: 7,              // Must score 7/10 or higher
  minTrustScore: 7,            // Source must be tier 3 or better
  maxPublishedAgeDays: 365,    // Content must be less than 1 year old
  requireNumbers: true,        // Must have quantitative ROI data
  requireCompanyName: true,    // Must name company that implemented
  minContentLength: 500,       // Minimum 500 chars of content
};

// Publishing configuration
export const PUBLISHING_CONFIG = {
  maxIdeasPerDay: 3,           // Max 3 new ideas per day
  autoPublishThreshold: 9,     // Auto-publish if ROI score >= 9
  requireReviewThreshold: 7,   // Queue for review if ROI score 7-8
  gitCommitMessage: '🤖 Add automation idea',
  notifySlack: true,
  notifyEmail: true,
};

// API rate limits
export const RATE_LIMITS = {
  searchDelayMs: 2000,         // Wait 2s between searches
  extractionDelayMs: 3000,     // Wait 3s between extractions
  maxSearchesPerRun: 10,       // Max 10 searches per run
  maxPublishesPerRun: 3,       // Max 3 publishes per run
};

export default {
  TRUSTED_SOURCES,
  ALL_TRUSTED_DOMAINS,
  SOURCE_TRUST_SCORES,
  SEARCH_QUERIES,
  QUALITY_THRESHOLDS,
  PUBLISHING_CONFIG,
  RATE_LIMITS,
};
