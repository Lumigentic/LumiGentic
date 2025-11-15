import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkROI() {
  const { data, error } = await supabase
    .from('automation_ideas')
    .select('roi_score, title')
    .limit(10)

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Sample ROI scores:')
    data.forEach(d => console.log(`${d.title}: ${d.roi_score}`))
  }
}

checkROI()
