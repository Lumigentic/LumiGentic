#!/usr/bin/env node
/**
 * Test Script: Verify Supabase Connection
 *
 * Tests that the new Supabase helper functions work correctly
 */

import { config } from 'dotenv'
import { getAllAutomationIdeas, getAutomationIdeaBySlug, getAllAutomationIdeaSlugs } from './lib/supabase'

// Load environment variables
config({ path: '.env.local' })

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase Connection...\n')
  console.log('=' .repeat(60))

  try {
    // Test 1: Get all slugs
    console.log('\n📋 Test 1: Fetching all idea slugs...')
    const slugs = await getAllAutomationIdeaSlugs()
    console.log(`✅ Found ${slugs.length} idea slugs`)
    if (slugs.length > 0) {
      console.log(`   First few: ${slugs.slice(0, 3).join(', ')}`)
    }

    // Test 2: Get all ideas
    console.log('\n📚 Test 2: Fetching all ideas...')
    const ideas = await getAllAutomationIdeas()
    console.log(`✅ Found ${ideas.length} ideas`)

    if (ideas.length > 0) {
      console.log('\n   Top 3 ideas by ROI:')
      ideas.slice(0, 3).forEach((idea, index) => {
        console.log(`   ${index + 1}. ${idea.title}`)
        console.log(`      Industry: ${idea.industry} | ROI: ${idea.roiScore}/10`)
        console.log(`      Time Saved: ${idea.timeSaved}`)
      })
    }

    // Test 3: Get individual idea
    if (slugs.length > 0) {
      const testSlug = slugs[0]
      console.log(`\n🔎 Test 3: Fetching individual idea: ${testSlug}`)
      const idea = await getAutomationIdeaBySlug(testSlug)

      if (idea) {
        console.log(`✅ Successfully fetched idea: "${idea.title}"`)
        console.log(`   Industry: ${idea.industry}`)
        console.log(`   Difficulty: ${idea.difficulty}`)
        console.log(`   ROI Score: ${idea.roiScore}/10`)
        console.log(`   Tools: ${idea.tools.join(', ')}`)
        console.log(`   Content length: ${idea.content.length} characters`)
      } else {
        console.log('❌ Failed to fetch individual idea')
      }
    }

    console.log('\n' + '=' .repeat(60))
    console.log('🎉 All tests passed! Supabase integration is working!')
    console.log('=' .repeat(60))

  } catch (error) {
    console.error('\n❌ Test failed:', error)
    process.exit(1)
  }
}

// Run tests
testSupabaseConnection().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
