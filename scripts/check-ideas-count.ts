import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkIdeas() {
  const { data, error, count } = await supabase
    .from('automation_ideas')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching ideas:', error)
    return
  }

  console.log('\n=== AUTOMATION IDEAS DATABASE ===')
  console.log(`Total ideas: ${count}`)
  console.log('\nLatest 20 ideas:')
  data?.slice(0, 20).forEach((idea, index) => {
    console.log(`${index + 1}. ${idea.published_at} - ${idea.title}`)
  })

  console.log('\n=== IDEAS BY DATE ===')
  const byDate = data?.reduce((acc: any, idea) => {
    const date = idea.published_at
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  Object.entries(byDate || {}).sort().forEach(([date, count]) => {
    console.log(`${date}: ${count} ideas`)
  })
}

checkIdeas()
