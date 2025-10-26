# 🚀 Supabase Setup Guide for LumiGentic SaaS

Complete step-by-step guide to set up Supabase for the LumiGentic automation platform.

## 📋 What We're Building

**LumiGentic SaaS Platform:**
- ✅ User authentication & profiles
- ✅ Automation ideas database
- ✅ Newsletter subscriptions
- ✅ Report purchases (Stripe integration)
- ✅ User dashboard
- ✅ Email notifications
- ✅ Analytics tracking

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in / Create account
3. Click "New Project"
4. Fill in:
   - **Name:** `lumigentic-prod` (or `lumigentic-dev` for testing)
   - **Database Password:** Generate strong password (save it!)
   - **Region:** Europe West (London) - closest to UK users
5. Click "Create new project"
6. Wait 2-3 minutes for setup

---

## Step 2: Run Database Schema

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy entire contents of `supabase-saas-schema.sql`
4. Paste into SQL editor
5. Click **RUN** (or Cmd/Ctrl + Enter)
6. Verify success - you should see:
   ```
   Success. No rows returned
   ```

This creates all tables:
- `user_profiles`
- `automation_ideas`
- `user_favorites`
- `automation_reports`
- `report_purchases`
- `newsletter_subscribers`
- `page_views`
- `notification_queue`

---

## Step 3: Get API Credentials

1. Go to **Project Settings** → **API**
2. Copy these values:

```bash
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (secret!)
```

---

## Step 4: Configure Environment Variables

Create `.env.local` file in project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # Keep secret!

# Stripe (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Resend or SendGrid)
RESEND_API_KEY=re_...
# OR
SENDGRID_API_KEY=SG...

# Anthropic (for AI agent)
ANTHROPIC_API_KEY=sk-ant-...
```

⚠️ **IMPORTANT:** Add `.env.local` to `.gitignore` (already done)

---

## Step 5: Enable Authentication

1. In Supabase Dashboard → **Authentication** → **Providers**
2. Enable:
   - ✅ **Email** (default - always on)
   - ✅ **Google OAuth** (recommended)
   - ✅ **GitHub OAuth** (optional)

### Google OAuth Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Authorized redirect URI: `https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback`
4. Copy Client ID and Secret to Supabase

### Configure email templates:
1. **Authentication** → **Email Templates**
2. Customize:
   - Confirm signup
   - Magic Link
   - Password reset

---

## Step 6: Set Up Row Level Security (RLS)

RLS is already configured in the schema! Verify policies:

1. Go to **Database** → **Tables**
2. Click on `automation_ideas`
3. Go to **Policies** tab
4. You should see:
   - "Anyone can view free automation ideas"
   - "Authenticated users can view premium ideas"

Repeat for other tables to verify policies are active.

---

## Step 7: Migrate Existing MDX Data

Run migration script to import existing automation ideas:

```bash
# Make sure .env.local is configured first!
npm run migrate-to-supabase
```

This will:
- ✅ Read all MDX files from `content/automation-ideas/`
- ✅ Parse frontmatter and content
- ✅ Insert into `automation_ideas` table
- ✅ Keep MDX files as backup

Expected output:
```
📁 Found 9 MDX files

   ✓ Parsed: ai-chatbot-customer-service...
   ✓ Parsed: predictive-maintenance...
   ...

📤 Migrating 9 ideas to Supabase...

   ✅ Migrated: ai-chatbot-customer-service...
   ...

📊 Migration Complete:
   Success: 9
   Errors:  0
```

---

## Step 8: Verify Database Content

1. Go to **Table Editor** in Supabase
2. Click `automation_ideas` table
3. You should see all 9 ideas with:
   - title, slug, industry, roi_score
   - tools array
   - metadata.content_mdx (full MDX content)

---

## Step 9: Set Up Storage (for Report Files)

1. Go to **Storage** → **Create Bucket**
2. Name: `report-files`
3. **Public bucket:** ❌ No (private)
4. Create bucket
5. Set up policies:

```sql
-- Allow authenticated users to read their purchased reports
CREATE POLICY "Users can download purchased reports"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'report-files'
  AND auth.uid()::text IN (
    SELECT user_id::text FROM report_purchases
    WHERE report_id::text = (storage.foldername(name))[1]
    AND payment_status = 'completed'
  )
);

-- Allow service role to upload reports
CREATE POLICY "Service role can upload reports"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'report-files');
```

---

## Step 10: Configure Email Provider

### Option A: Resend (Recommended - Simple)

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Verify your domain (or use resend.dev for testing)
4. Add to `.env.local`: `RESEND_API_KEY=re_...`

### Option B: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create API key
3. Verify sender email
4. Add to `.env.local`: `SENDGRID_API_KEY=SG...`

---

## Step 11: Test Newsletter Signup

1. Run dev server: `npm run dev`
2. Open `http://localhost:3000`
3. Scroll to newsletter section
4. Enter test email
5. Check Supabase → **Table Editor** → `newsletter_subscribers`
6. Your test email should appear!

---

## Step 12: Set Up Stripe (for Report Purchases)

1. Go to [stripe.com](https://stripe.com) → Sign up
2. Get test API keys from Dashboard
3. Add to `.env.local`
4. Create products in Stripe:
   - **Product:** "Automation Implementation Report"
   - **Price:** £99.00 GBP
   - Copy Price ID: `price_xxxxx`

We'll integrate Stripe checkout in next phase.

---

## Step 13: Create Edge Functions (Optional - Advanced)

For sending emails and generating reports, create Supabase Edge Functions:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref xxxxxxxxxxxxx

# Create edge function for email
supabase functions new send-email-notification

# Deploy
supabase functions deploy send-email-notification
```

---

## ✅ Setup Complete Checklist

- [ ] Supabase project created
- [ ] Database schema deployed (all tables created)
- [ ] API keys copied to `.env.local`
- [ ] Authentication enabled (Email + OAuth)
- [ ] RLS policies verified
- [ ] Existing MDX data migrated
- [ ] Storage bucket created
- [ ] Email provider configured
- [ ] Stripe account created
- [ ] Newsletter signup tested

---

## 🚀 Next Steps

1. **Build Dashboard UI** - Show user's favorites, purchases
2. **Implement Stripe Checkout** - Buy report flow
3. **Report Generation** - PDF/Excel report builder
4. **Email Notifications** - Welcome emails, new idea alerts
5. **Analytics Dashboard** - Track views, conversions

---

## 📚 Useful Supabase Resources

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Stripe Integration](https://stripe.com/docs)
- [Edge Functions](https://supabase.com/docs/guides/functions)

---

## 🆘 Troubleshooting

### Error: "relation does not exist"
- Run the SQL schema again
- Check you're in the right project

### Newsletter signup failing
- Check browser console for errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` is set
- Check RLS policies on `newsletter_subscribers`

### Migration script failing
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set (not anon key)
- Check file paths are correct

### Authentication not working
- Verify email provider is configured in Supabase
- Check redirect URLs match

---

## 💾 Backup & Recovery

**Backup database:**
```bash
supabase db dump -f backup.sql
```

**Restore:**
```bash
psql -h db.xxxxxxxxxxxxx.supabase.co -U postgres -d postgres -f backup.sql
```

---

**Need help?** Check [SUPABASE_TROUBLESHOOTING.md](./SUPABASE_TROUBLESHOOTING.md)
