#!/usr/bin/env node
/**
 * Migration Script: MDX Files → Supabase Database
 *
 * This script reads all existing automation idea MDX files
 * and migrates them to the Supabase database
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  console.error('   Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface AutomationIdeaMDX {
  slug: string
  title: string
  publishedAt: string
  summary: string
  industry: string
  difficulty: string
  roiScore: number
  timeSaved: string
  costSavings: string
  paybackPeriod: string
  tools: string[]
  sourceUrl: string
  content: string
}

/**
 * Read all MDX files from content/automation-ideas
 */
function readMDXFiles(): AutomationIdeaMDX[] {
  const contentDir = path.join(process.cwd(), 'content/automation-ideas')

  if (!fs.existsSync(contentDir)) {
    console.error(`❌ Directory not found: ${contentDir}`)
    return []
  }

  const files = fs.readdirSync(contentDir)
  const mdxFiles = files.filter(f => f.endsWith('.mdx'))

  console.log(`📁 Found ${mdxFiles.length} MDX files\n`)

  const ideas: AutomationIdeaMDX[] = []

  for (const file of mdxFiles) {
    const filePath = path.join(contentDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const slug = file.replace('.mdx', '')

    ideas.push({
      slug,
      title: data.title || slug,
      publishedAt: data.publishedAt || new Date().toISOString(),
      summary: data.summary || '',
      industry: data.industry || 'General',
      difficulty: data.difficulty || 'Medium',
      roiScore: data.roiScore || 7,
      timeSaved: data.timeSaved || '',
      costSavings: data.costSavings || '',
      paybackPeriod: data.paybackPeriod || '',
      tools: Array.isArray(data.tools) ? data.tools : [],
      sourceUrl: data.sourceUrl || '',
      content: content.trim()
    })

    console.log(`   ✓ Parsed: ${slug}`)
  }

  return ideas
}

/**
 * Migrate ideas to Supabase
 */
async function migrateToSupabase(ideas: AutomationIdeaMDX[]) {
  console.log(`\n📤 Migrating ${ideas.length} ideas to Supabase...\n`)

  let successCount = 0
  let errorCount = 0

  for (const idea of ideas) {
    try {
      const { data, error } = await supabase
        .from('automation_ideas')
        .upsert({
          slug: idea.slug,
          title: idea.title,
          industry: idea.industry,
          difficulty: idea.difficulty,
          roi_score: idea.roiScore,
          time_saved: idea.timeSaved,
          cost_savings: idea.costSavings,
          payback_period: idea.paybackPeriod,
          tools: idea.tools,
          source_url: idea.sourceUrl,
          summary: idea.summary,
          published_at: idea.publishedAt,
          metadata: {
            content_mdx: idea.content,
            migrated_at: new Date().toISOString()
          }
        }, {
          onConflict: 'slug'
        })
        .select()

      if (error) {
        console.error(`   ❌ Error migrating ${idea.slug}:`, error.message)
        errorCount++
      } else {
        console.log(`   ✅ Migrated: ${idea.slug}`)
        successCount++
      }

      // Rate limit: wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100))

    } catch (err) {
      console.error(`   ❌ Exception migrating ${idea.slug}:`, err)
      errorCount++
    }
  }

  console.log(`\n📊 Migration Complete:`)
  console.log(`   Success: ${successCount}`)
  console.log(`   Errors:  ${errorCount}`)
  console.log(`   Total:   ${ideas.length}\n`)
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 MDX → Supabase Migration Tool')
  console.log('=' .repeat(50))
  console.log()

  // Read MDX files
  const ideas = readMDXFiles()

  if (ideas.length === 0) {
    console.log('⚠️  No ideas found to migrate')
    return
  }

  // Migrate to Supabase
  await migrateToSupabase(ideas)

  console.log('✅ Migration completed!\n')
  console.log('📝 Next steps:')
  console.log('   1. Verify data in Supabase dashboard')
  console.log('   2. Update app to read from Supabase instead of MDX')
  console.log('   3. Keep MDX files as backup (don\'t delete yet)\n')
}

// Run
main().catch(err => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
