# SendGrid Email Setup Guide

This guide will help you set up SendGrid to send welcome emails and weekly newsletters for your LumiGentic subscribers.

## Why SendGrid?

- **Free Tier**: 100 emails/day (3,000/month) at no cost
- **Excellent Deliverability**: Industry-leading email delivery rates
- **Simple API**: Easy to integrate with Next.js
- **Reliable**: Enterprise-grade infrastructure

---

## Step 1: Create SendGrid Account

1. Go to [SendGrid.com](https://sendgrid.com/)
2. Click **"Start for Free"** or **"Sign Up"**
3. Fill in your details:
   - Email address
   - Password
   - Company name (e.g., "LumiGentic")
   - Website URL (e.g., "lumigentic.com")
4. Verify your email address via the confirmation link sent to your inbox

---

## Step 2: Verify Your Sender Email Address

**Important**: SendGrid requires sender verification to prevent spam.

### Option A: Single Sender Verification (Quickest - Recommended for Testing)

1. Log into SendGrid dashboard
2. Go to **Settings** → **Sender Authentication** → **Single Sender Verification**
3. Click **"Create New Sender"**
4. Fill in the form:
   - **From Name**: LumiGentic
   - **From Email Address**: `newsletter@lumigentic.com` (or your preferred email)
   - **Reply To**: Same as From Email
   - **Company Address**: Your business address
5. Click **"Create"**
6. Check your inbox and click the verification link
7. Once verified, you'll see a green checkmark ✅

### Option B: Domain Authentication (Recommended for Production)

For better deliverability and professional sender reputation:

1. Go to **Settings** → **Sender Authentication** → **Domain Authentication**
2. Click **"Authenticate Your Domain"**
3. Select your DNS provider (e.g., Cloudflare, GoDaddy, AWS Route 53)
4. Enter your domain: `lumigentic.com`
5. Follow instructions to add DNS records (CNAME records)
6. Verify DNS propagation (may take 24-48 hours)

---

## Step 3: Create API Key

1. In SendGrid dashboard, go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Configure the key:
   - **API Key Name**: `LumiGentic Newsletter`
   - **API Key Permissions**: Select **"Restricted Access"**
   - Under **Mail Send**, toggle on **"Mail Send"** (this is all you need)
4. Click **"Create & View"**
5. **IMPORTANT**: Copy the API key immediately (it won't be shown again!)
   - Format: `SG.xxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyy`

---

## Step 4: Update Environment Variables

1. Open `.env.local` in your project root
2. Replace the placeholder with your actual API key:

```env
# SendGrid Email Configuration
SENDGRID_API_KEY=SG.your_actual_api_key_here
SENDGRID_FROM_EMAIL=newsletter@lumigentic.com
SENDGRID_FROM_NAME=LumiGentic
```

3. Make sure `SENDGRID_FROM_EMAIL` matches the verified sender email from Step 2

---

## Step 5: Update Production Environment (Vercel)

If you're deploying to Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **LumiGenticSite** project
3. Go to **Settings** → **Environment Variables**
4. Add three new environment variables:
   - `SENDGRID_API_KEY` = Your SendGrid API key
   - `SENDGRID_FROM_EMAIL` = `newsletter@lumigentic.com`
   - `SENDGRID_FROM_NAME` = `LumiGentic`
5. Click **"Save"**
6. Redeploy your application for changes to take effect

---

## Step 6: Test Email Sending

### Test Locally

1. Ensure your `.env.local` has the correct SendGrid credentials
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Go to `http://localhost:3000`
4. Scroll to the newsletter signup section
5. Enter your email and click **"Subscribe to Newsletter"**
6. Check your inbox for the welcome email (check spam folder if not received)

### Test API Endpoint Directly (Optional)

```bash
curl -X POST http://localhost:3000/api/send-welcome-email \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com", "name": "Your Name"}'
```

Expected response:
```json
{"success": true, "message": "Welcome email sent successfully"}
```

---

## Step 7: Monitor Email Activity

1. In SendGrid dashboard, go to **Activity**
2. View email delivery status, opens, clicks, and bounces
3. If emails are not delivered:
   - Check **Suppressions** → **Blocks** (your email might be blocked)
   - Verify sender email is authenticated
   - Check spam folder in recipient inbox

---

## Current Email Implementation

### Welcome Email
- **Trigger**: Immediately after newsletter signup
- **Template**: `lib/email-templates.ts` → `getWelcomeEmailHtml()`
- **Content**: Welcome message, what to expect, link to automation ideas
- **Endpoint**: `/app/api/send-welcome-email/route.ts`

### Weekly Newsletter (To Be Implemented)
- **Planned Trigger**: Weekly cron job to send new automation ideas
- **Template**: `lib/email-templates.ts` → `getNewsletterEmailHtml()`
- **Content**: 3-5 new automation ideas with summaries and links

---

## Troubleshooting

### Error: "Forbidden" (403)
- **Cause**: API key doesn't have "Mail Send" permission
- **Fix**: Create new API key with "Mail Send" enabled

### Error: "The from address does not match a verified Sender Identity"
- **Cause**: `SENDGRID_FROM_EMAIL` hasn't been verified in SendGrid
- **Fix**: Complete Step 2 (Single Sender Verification)

### Emails Going to Spam
- **Solution 1**: Complete Domain Authentication (Step 2, Option B)
- **Solution 2**: Ask recipients to add `newsletter@lumigentic.com` to contacts
- **Solution 3**: Warm up your sender reputation by starting with small volumes

### No Errors But Email Not Received
- **Check 1**: Look in spam/junk folder
- **Check 2**: Go to SendGrid Activity Feed to see delivery status
- **Check 3**: Verify email address isn't on suppression list (Settings → Suppressions)

---

## Cost and Limits

### Free Tier (Always Free)
- **100 emails per day** (3,000 per month)
- Sufficient for early-stage newsletters
- All core features included

### Essentials Plan ($19.95/month)
- **50,000 emails per month**
- 500/day average (you can exceed this within monthly limit)
- Recommended when you have 200+ subscribers

### When to Upgrade
- You'll know when you hit the 100/day limit (SendGrid will block sends)
- Monitor usage in SendGrid dashboard

---

## Next Steps

✅ **Completed**:
- SendGrid integration
- Welcome email sending
- Email templates

🔜 **To Implement**:
- Weekly newsletter automation (cron job)
- Unsubscribe functionality
- Email tracking and analytics dashboard

---

## Questions?

If you encounter issues:
1. Check SendGrid Activity Feed for delivery errors
2. Review your API key permissions
3. Verify sender email authentication status
4. Test with `curl` command to isolate Next.js vs. SendGrid issues
