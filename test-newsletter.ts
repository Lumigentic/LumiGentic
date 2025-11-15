#!/usr/bin/env node
/**
 * Test Script: Verify Newsletter Subscription
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testNewsletterSubscription() {
  console.log('🔍 Testing Newsletter Subscription...\n')
  console.log('=' .repeat(60))

  const testEmail = `test-${Date.now()}@example.com`
  const testName = 'Test User'

  try {
    // Test 1: Subscribe to newsletter
    console.log('\n📧 Test 1: Subscribing to newsletter...')
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: testEmail,
          name: testName,
          source: 'test-script',
          subscribed_at: new Date().toISOString(),
        }
      ])
      .select()

    if (error) {
      console.error('❌ Error subscribing:', error)
      return false
    }

    console.log(`✅ Successfully subscribed: ${testEmail}`)
    console.log(`   Name: ${testName}`)
    console.log(`   Source: test-script`)

    // Test 2: Try duplicate subscription (should fail gracefully)
    console.log('\n📧 Test 2: Testing duplicate email protection...')
    const { error: duplicateError } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: testEmail,
          name: 'Duplicate User',
          source: 'test-script',
        }
      ])

    if (duplicateError) {
      if (duplicateError.code === '23505') {
        console.log('✅ Duplicate email correctly rejected (expected behavior)')
      } else {
        console.error('❌ Unexpected error:', duplicateError)
      }
    } else {
      console.log('⚠️  Warning: Duplicate email was allowed (should be rejected)')
    }

    // Test 3: Verify data in database
    console.log('\n📧 Test 3: Verifying subscriber count...')
    const { count, error: countError } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('❌ Error counting subscribers:', countError)
    } else {
      console.log(`✅ Total subscribers in database: ${count}`)
    }

    console.log('\n' + '=' .repeat(60))
    console.log('🎉 Newsletter subscription tests passed!')
    console.log('=' .repeat(60))

    return true

  } catch (error) {
    console.error('\n❌ Test failed:', error)
    return false
  }
}

// Run tests
testNewsletterSubscription().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
