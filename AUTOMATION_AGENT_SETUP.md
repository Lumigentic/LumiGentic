# 🤖 Automation Agent Setup Guide

Your autonomous AI agent is ready to discover and publish automation opportunities!

## ✅ What's Been Built

### 1. **AI Agent System** (`scripts/automation-agent/`)
- Discovers automation case studies from 60+ trusted sources
- Extracts ROI data using Claude AI
- Validates quality and prevents duplicates
- Generates polished MDX content
- Publishes directly to your website
- Sends daily Slack notifications

### 2. **GitHub Actions Workflow** (`.github/workflows/automation-ideas.yml`)
- Runs daily at 2am UTC automatically
- Can be triggered manually anytime
- Commits and pushes new ideas to main branch

### 3. **Configuration Files**
- `config.ts` - Trusted sources, quality thresholds
- `.env.example` - Environment variable template
- `README.md` - Full documentation

## 🚀 Quick Start (5 Minutes)

### Step 1: Get API Keys

You need two API keys:

#### **Anthropic API Key** (Required)
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create a new key
5. Copy it (starts with `sk-ant-...`)

#### **Perplexity API Key** (Required)
1. Go to https://www.perplexity.ai/settings/api
2. Sign up or log in
3. Generate an API key
4. Copy it (starts with `pplx-...`)

#### **Slack Webhook** (Optional - for notifications)
1. Go to https://api.slack.com/messaging/webhooks
2. Create a new webhook
3. Copy the webhook URL

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- `@anthropic-ai/sdk` - Claude API
- `tsx` - TypeScript execution

### Step 3: Configure Environment Variables

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
PERPLEXITY_API_KEY=pplx-your-key-here
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your-webhook
```

### Step 4: Test Locally

Run the agent manually to test:

```bash
npm run discover-ideas
```

You should see:
```
╔═══════════════════════════════════════════════════╗
║   🤖 LumiGentic Automation Idea Discovery Agent  ║
║   Autonomous Research → Validation → Publishing  ║
╚═══════════════════════════════════════════════════╝

STEP 1: Discovering Sources
🔍 Searching: "automation case study 2025 ROI results"
   ✅ Found 5 sources
...
```

### Step 5: Configure GitHub Secrets (for automatic daily runs)

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these three secrets:

   - Name: `ANTHROPIC_API_KEY`
     Value: `sk-ant-your-key-here`

   - Name: `PERPLEXITY_API_KEY`
     Value: `pplx-your-key-here`

   - Name: `SLACK_WEBHOOK_URL` (optional)
     Value: `https://hooks.slack.com/services/your-webhook`

### Step 6: Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. If prompted, click **I understand my workflows, go ahead and enable them**
3. You should see **Discover & Publish Automation Ideas** workflow

### Step 7: Test Automatic Run

Trigger a manual run:

1. Go to **Actions** tab
2. Click **Discover & Publish Automation Ideas**
3. Click **Run workflow** dropdown
4. Click green **Run workflow** button

Watch it run! It will:
- Search for automation opportunities
- Extract and validate them
- Generate MDX content
- Commit to your repo
- Send Slack notification (if configured)

## 📊 What Happens Daily

Every day at 2am UTC, the agent will:

1. **Search** 10 trusted sources for automation case studies
2. **Extract** opportunities with ROI metrics using Claude
3. **Validate** quality (ROI score ≥ 7/10, trusted sources only)
4. **Publish** up to 3 new ideas to `content/automation-ideas/`
5. **Notify** you via Slack with summary

### Expected Output

**Per day**: 0-3 new automation ideas
**Per month**: 60-90 ideas
**Cost per idea**: £2-4 in API fees

**Monthly total**: £170-280 (vs. 120-180 hours of manual research)

## 🎛️ Customization

### Adjust Quality Standards

Edit `scripts/automation-agent/config.ts`:

```typescript
export const QUALITY_THRESHOLDS = {
  minROIScore: 7,              // Increase to be more selective
  minTrustScore: 7,            // Require higher trust sources
  requireNumbers: true,        // Require quantitative ROI
};
```

### Change Publishing Frequency

```typescript
export const PUBLISHING_CONFIG = {
  maxIdeasPerDay: 3,           // Increase to 5 for more content
  autoPublishThreshold: 9,     // Lower to 7 to publish more
};
```

### Add More Search Queries

```typescript
export const SEARCH_QUERIES = [
  "automation case study 2025 ROI results",
  "YOUR NEW QUERY HERE",
  "healthcare automation AI success story",
];
```

### Add Trusted Sources

```typescript
export const TRUSTED_SOURCES = {
  tier1: [
    'mckinsey.com',
    'YOUR-DOMAIN.com',  // Add here
  ],
};
```

## 🔍 Monitoring

### Slack Notifications

You'll receive daily messages like:

```
🤖 Automation Idea Pipeline Summary

Published: 3 new ideas
Rejected: 5 ideas
Duration: 8.3 min
Date: 15 January 2025

✅ Published Ideas:
1. Auto-Generate Clinical Notes from Audio
2. Invoice OCR for SME Garages
3. Email Auto-Response for Support Teams

❌ Top Rejection Reasons:
• ROI score too low (2)
• Duplicate of existing idea (2)
• Missing ROI data (1)

[View Automation Ideas]
```

### Check GitHub Actions

View all runs: **Actions** → **Discover & Publish Automation Ideas**

Each run shows:
- Sources discovered
- Opportunities extracted
- Ideas published
- Rejection reasons
- Duration and cost

## 🐛 Troubleshooting

### Agent finds no ideas

**Cause**: Quality thresholds too strict

**Fix**: Lower `minROIScore` in `config.ts` from 7 to 6

### API quota exceeded

**Cause**: Too many runs or high usage

**Fix**:
- Perplexity: Upgrade plan or reduce `maxSearchesPerRun`
- Anthropic: Add payment method or reduce `maxIdeasPerDay`

### Git push fails in GitHub Actions

**Cause**: Permissions issue

**Fix**:
1. Check workflow has `permissions: contents: write`
2. Verify branch protection rules allow bot commits
3. Check `GITHUB_TOKEN` is available (automatic)

### Ideas aren't appearing on website

**Cause**: Frontend not yet built

**Next**: Build the `/automation-ideas` page (see TODO list)

## 📚 Next Steps

Now that the agent is running, you should:

1. **Build Frontend** - Create `/automation-ideas` browse page
2. **Add Filtering** - Filter by industry, ROI, difficulty
3. **Create Dashboard** - Interactive tool for firms (SaaS product)
4. **Build Reports** - Bespoke automation reports (£2.5k-15k)

See full TODO list for the complete productized funnel.

## 💰 Cost Tracking

Monitor your API usage:

- **Anthropic**: https://console.anthropic.com/settings/billing
- **Perplexity**: https://www.perplexity.ai/settings/api

Typical monthly costs (3 ideas/day):
- Searches: ~£25
- Extractions: ~£90
- Content generation: ~£45
- **Total**: ~£160-200/month

**ROI**: Saves 120+ hours of manual research (worth £6,000-12,000)

## 🔒 Security

✅ **DO**:
- Keep `.env.local` gitignored (already configured)
- Store API keys in GitHub Secrets only
- Review published ideas occasionally
- Monitor API usage and costs

❌ **DON'T**:
- Commit API keys to Git
- Share `.env.local` file
- Give webhook URLs to untrusted parties
- Disable source validation

## 📞 Support

Questions? Issues?

- Check `scripts/automation-agent/README.md` for detailed docs
- Review console output for error messages
- Contact: info@lumigentic.com

---

**🎉 Your automation agent is ready to run!**

Every morning, wake up to 2-3 new automation opportunities published to your site, automatically discovered from the world's most trusted sources.
