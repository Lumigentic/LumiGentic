import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// =====================================================
// TYPE DEFINITIONS
// =====================================================

export type NewsletterSubscriber = {
  id?: string
  email: string
  subscribed_at?: string
  name?: string
  source?: string
}

export type AutomationIdeaFromDB = {
  id: string
  slug: string
  title: string
  summary: string
  industry: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  roi_score: number
  time_saved: string | null
  cost_savings: string | null
  payback_period: string | null
  tools: string[]
  source_url: string | null
  published_at: string
  is_featured: boolean
  is_premium: boolean
  views_count: number
  favorites_count: number
  report_purchases_count: number
  created_at: string
  updated_at: string
  metadata: {
    content_mdx?: string
    migrated_at?: string
    difficulty_score?: number
    productivity_gain?: string
    published_date?: string
    source_domain?: string
  }
}

export type AutomationIdea = {
  slug: string
  title: string
  industry: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  difficultyScore: number
  roiScore: number
  timeSaved: string
  costSavings: string
  paybackPeriod: string
  productivityGain?: string
  tools: string[]
  publishedDate: string
  sourceUrl: string
  sourceDomain: string
  content: string
}

// =====================================================
// HELPER FUNCTIONS: AUTOMATION IDEAS
// =====================================================

/**
 * Transform database record to app format
 */
function transformIdeaFromDB(dbIdea: AutomationIdeaFromDB): AutomationIdea {
  return {
    slug: dbIdea.slug,
    title: dbIdea.title,
    industry: dbIdea.industry,
    difficulty: dbIdea.difficulty,
    difficultyScore: dbIdea.metadata?.difficulty_score ||
                     (dbIdea.difficulty === 'Easy' ? 1 : dbIdea.difficulty === 'Medium' ? 2 : 3),
    roiScore: dbIdea.roi_score,
    timeSaved: dbIdea.time_saved || 'Not specified',
    costSavings: dbIdea.cost_savings || 'Not specified',
    paybackPeriod: dbIdea.payback_period || 'Not specified',
    productivityGain: dbIdea.metadata?.productivity_gain,
    tools: dbIdea.tools || [],
    publishedDate: dbIdea.metadata?.published_date || dbIdea.published_at || dbIdea.created_at,
    sourceUrl: dbIdea.source_url || '',
    sourceDomain: dbIdea.metadata?.source_domain || (dbIdea.source_url ? new URL(dbIdea.source_url).hostname : ''),
    content: dbIdea.metadata?.content_mdx || dbIdea.summary || ''
  }
}

/**
 * Get all automation ideas from Supabase
 */
export async function getAllAutomationIdeas(): Promise<AutomationIdea[]> {
  try {
    const { data, error } = await supabase
      .from('automation_ideas')
      .select('*')
      .order('roi_score', { ascending: false })

    if (error) {
      console.error('Error fetching automation ideas:', error)
      return []
    }

    return (data as AutomationIdeaFromDB[]).map(transformIdeaFromDB)
  } catch (err) {
    console.error('Exception fetching automation ideas:', err)
    return []
  }
}

/**
 * Get automation idea by slug
 */
export async function getAutomationIdeaBySlug(slug: string): Promise<AutomationIdea | null> {
  try {
    const { data, error } = await supabase
      .from('automation_ideas')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error(`Error fetching idea ${slug}:`, error)
      return null
    }

    if (!data) return null

    return transformIdeaFromDB(data as AutomationIdeaFromDB)
  } catch (err) {
    console.error(`Exception fetching idea ${slug}:`, err)
    return null
  }
}

/**
 * Get all automation idea slugs (for static generation)
 */
export async function getAllAutomationIdeaSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('automation_ideas')
      .select('slug')
      .order('slug', { ascending: true })

    if (error) {
      console.error('Error fetching idea slugs:', error)
      return []
    }

    return data.map((item: { slug: string }) => item.slug)
  } catch (err) {
    console.error('Exception fetching idea slugs:', err)
    return []
  }
}

/**
 * Get ideas filtered by industry
 */
export async function getAutomationIdeasByIndustry(industry: string): Promise<AutomationIdea[]> {
  try {
    const { data, error } = await supabase
      .from('automation_ideas')
      .select('*')
      .eq('industry', industry)
      .order('roi_score', { ascending: false })

    if (error) {
      console.error(`Error fetching ideas for industry ${industry}:`, error)
      return []
    }

    return (data as AutomationIdeaFromDB[]).map(transformIdeaFromDB)
  } catch (err) {
    console.error(`Exception fetching ideas for industry ${industry}:`, err)
    return []
  }
}

/**
 * Get unique industries from all ideas
 */
export async function getAllIndustries(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('automation_ideas')
      .select('industry')
      .order('industry', { ascending: true })

    if (error) {
      console.error('Error fetching industries:', error)
      return []
    }

    const industries = new Set(data.map((item: { industry: string }) => item.industry))
    return Array.from(industries).sort()
  } catch (err) {
    console.error('Exception fetching industries:', err)
    return []
  }
}

/**
 * Increment view count for an idea
 */
export async function incrementIdeaViews(slug: string): Promise<void> {
  try {
    const { error } = await supabase
      .rpc('increment_idea_views', { idea_slug_param: slug })

    if (error) {
      console.error(`Error incrementing views for ${slug}:`, error)
    }
  } catch (err) {
    console.error(`Exception incrementing views for ${slug}:`, err)
  }
}
