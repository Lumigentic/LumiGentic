// .app/api/automation-ideas/route.js
// API route for App Router (Next.js 13+)

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    // Get API key from headers
    const apiKey = request.headers.get('x-api-key') || 
                   request.headers.get('authorization')?.replace('Bearer ', '')
    
    // Verify API key
    if (apiKey !== process.env.API_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get data from request body
    const automationIdea = await request.json()

    // Validate required fields
    if (!automationIdea.title || !automationIdea.summary) {
      return NextResponse.json(
        { error: 'Missing required fields: title and summary are required' },
        { status: 400 }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Check if this is an update (item from Supabase) or new insert
    if (automationIdea.metadata?.supabase_id) {
      // Update existing record
      const { data, error } = await supabase
        .from('automation_ideas')
        .update({
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', automationIdea.metadata.supabase_id)
        .select()

      if (error) {
        console.error('Supabase update error:', error)
        return NextResponse.json(
          { error: 'Failed to update in database', details: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Automation idea published',
        id: automationIdea.metadata.supabase_id,
        data: data[0]
      })
    }

    // Insert new record
    const { data, error } = await supabase
      .from('automation_ideas')
      .insert([
        {
          title: automationIdea.title,
          summary: automationIdea.summary,
          slug: automationIdea.slug,
          industry: automationIdea.industry,
          difficulty: automationIdea.difficulty,
          roi_range: automationIdea.roi_range,
          time_saved: automationIdea.time_saved,
          cost_savings: automationIdea.cost_savings,
          payback_period: automationIdea.payback_period,
          tools: automationIdea.tools,
          source_url: automationIdea.source_url,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save to database', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Automation idea created',
      id: data[0].id,
      data: data[0]
    }, { status: 201 })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// Optional: Handle GET requests to test the endpoint
export async function GET() {
  return NextResponse.json({
    message: 'Automation Ideas API endpoint is working!',
    method: 'Use POST to submit automation ideas'
  })
}
```

### **5. Scroll down and commit:**
- Commit message: "Add automation ideas API route"
- Click **"Commit new file"**

---

## **After Committing:**

1. **Vercel will automatically deploy** (takes 1-2 minutes)
2. **Your API endpoint will be:**
```
   https://lumi-gentic-cev8.vercel.app/api/automation-ideas
