const fs = require('fs');
const https = require('https');

const SUPABASE_URL = 'https://ktcczycvtrqatviwyqxq.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Y2N6eWN2dHJxYXR2aXd5cXhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQ4OTk3MCwiZXhwIjoyMDc3MDY1OTcwfQ.qD_JnjwpYL1WnSkDMk_FB3ttVjaFBOBMj4APd0faR_Q';

// Read SQL file
const sql = fs.readFileSync('./supabase-saas-schema.sql', 'utf8');

// Execute SQL via Supabase REST API
const data = JSON.stringify({ query: sql });

const options = {
  hostname: 'ktcczycvtrqatviwyqxq.supabase.co',
  port: 443,
  path: '/rest/v1/rpc/exec_sql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Length': data.length
  }
};

console.log('🚀 Running SQL schema in Supabase...');

const req = https.request(options, (res) => {
  let body = '';

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('✅ Database schema created successfully!');
      console.log('Tables created:');
      console.log('  - user_profiles');
      console.log('  - automation_ideas');
      console.log('  - user_favorites');
      console.log('  - automation_reports');
      console.log('  - report_purchases');
      console.log('  - newsletter_subscribers ✉️');
      console.log('  - page_views');
      console.log('  - notification_queue');
    } else {
      console.error('❌ Error:', res.statusCode);
      console.error(body);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error);
});

req.write(data);
req.end();
