#!/bin/bash

# Supabase credentials
SUPABASE_URL="https://ktcczycvtrqatviwyqxq.supabase.co"
SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Y2N6eWN2dHJxYXR2aXd5cXhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQ4OTk3MCwiZXhwIjoyMDc3MDY1OTcwfQ.qD_JnjwpYL1WnSkDMk_FB3ttVjaFBOBMj4APd0faR_Q"

echo "🚀 Setting up Supabase database tables..."

# Read SQL file and execute each statement
cat supabase-saas-schema.sql | while IFS= read -r line; do
  if [[ ! -z "$line" ]] && [[ ! "$line" =~ ^-- ]]; then
    echo "$line"
  fi
done

echo ""
echo "⚠️  SQL file prepared. Now we need to run it in Supabase SQL Editor."
echo ""
echo "📋 Please follow these steps:"
echo ""
echo "1. Open: https://supabase.com/dashboard/project/ktcczycvtrqatviwyqxq/sql/new"
echo "2. Open file: supabase-saas-schema.sql in VSCode"
echo "3. Copy all (Cmd+A, Cmd+C)"
echo "4. Paste in Supabase SQL Editor (Cmd+V)"
echo "5. Click 'Run' button"
echo ""
echo "✅ This will create all 8 tables for newsletter, users, reports, etc."
