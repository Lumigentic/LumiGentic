import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const apiKey = request.headers.get('x-api-key') || 
                   request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (apiKey !== process.env.API_SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const automationIdea = await request.json()

    if (!automationIdea.title || !automationIdea.summary) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    if (automationIdea.metadata?.supabase_id) {
      const { data, error } = await supabase
        .from('automation_ideas')
        .update({
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', automationIdea.metadata.supabase_id)
        .select()

      if (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        id: automationIdea.metadata.supabase_id,
        data: data[0]
      })
    }

    const { data, error } = await supabase
      .from('automation_ideas')
      .insert([{
        title: automationIdea.title,
        summary: automationIdea.summary,
        slug: automationIdea.slug,
        industry: automationIdea.industry,
        difficulty: automationIdea.difficulty,
        published_at: new Date().toISOString()
      }])
      .select()

    if (error) {
      return NextResponse.json({ error: 'Insert failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data[0].id, data: data[0] }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Automation Ideas API is working!',
    method: 'Use POST to submit'
  })
}
```

---

## **FINAL FOLDER STRUCTURE SHOULD BE:**
```
.app/
├── automation-ideas/          ← Display page
│   ├── [slug]/
│   ├── AutomationIdeasClient.tsx
│   ├── page.tsx
│   └── (NO route.js here!)
│
└── api/                       ← NEW folder
    └── automation-ideas/      ← NEW folder
        └── route.js           ← API endpoint goes here
