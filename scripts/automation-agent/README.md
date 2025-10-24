# LumiGentic Automation Idea Discovery Agent

**Autonomous AI agent that discovers, validates, and publishes automation opportunities to the LumiGentic website.**

## 🎯 What It Does

This agent runs daily in the background and:

1. **Discovers** automation case studies from trusted sources (McKinsey, UiPath, Microsoft, etc.)
2. **Extracts** structured opportunities with ROI metrics using Claude
3. **Validates** quality, prevents duplicates, checks credibility
4. **Generates** polished MDX content with LumiGentic brand voice
5. **Publishes** directly to `/automation-ideas` on the website
6. **Notifies** you via Slack/email with daily summary

## 📁 Architecture

```
scripts/automation-agent/
├── index.ts       # Main orchestrator
├── config.ts      # Trusted sources, thresholds, settings
├── types.ts       # TypeScript interfaces
├── discover.ts    # Web search with Perplexity API
├── extract.ts     # Claude extracts opportunities
├── validate.ts    # Quality checks & duplicate prevention
├── generate.ts    # Content generation with brand voice
├── publish.ts     # MDX file creation + Git commit
└── notify.ts      # Slack/email notifications
```

## 🔐 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in your API keys:

- **ANTHROPIC_API_KEY**: Get from [Anthropic Console](https://console.anthropic.com/)
- **PERPLEXITY_API_KEY**: Get from [Perplexity Settings](https://www.perplexity.ai/settings/api)
- **SLACK_WEBHOOK_URL** (optional): Create at [Slack API](https://api.slack.com/messaging/webhooks)

### 3. Configure GitHub Secrets

For GitHub Actions to run automatically, add these secrets to your repository:

**Settings → Secrets and variables → Actions → New repository secret**

- `ANTHROPIC_API_KEY`
- `PERPLEXITY_API_KEY`
- `SLACK_WEBHOOK_URL` (optional)

## 🚀 Usage

### Run Manually (Local Testing)

```bash
npm run discover-ideas
```

This will:
- Search for automation opportunities
- Extract and validate them
- Generate MDX content
- Commit and push to Git (if valid ideas found)

### Automated Daily Runs

The agent runs automatically every day at 2am UTC via GitHub Actions.

See: `.github/workflows/automation-ideas.yml`

### Manual Trigger in GitHub

1. Go to **Actions** tab in your repository
2. Select **Discover & Publish Automation Ideas**
3. Click **Run workflow**

## ⚙️ Configuration

Edit `scripts/automation-agent/config.ts` to customize:

### Trusted Sources

Only scrapes from whitelisted domains:

- **Tier 1**: McKinsey, BCG, Deloitte, Accenture, Gartner
- **Tier 2**: Microsoft, Salesforce, UiPath, ServiceNow
- **Tier 3**: HBR, Forbes, TechCrunch
- **Tier 4**: Industry publications (Healthcare IT News, etc.)
- **Tier 5**: Academic (arXiv, IEEE)
- **Tier 6**: Government (NHS, Gov.uk)

### Quality Thresholds

```typescript
QUALITY_THRESHOLDS = {
  minROIScore: 7,              // Must score 7/10 or higher
  minTrustScore: 7,            // Source must be tier 3 or better
  maxPublishedAgeDays: 365,    // Content must be <1 year old
  requireNumbers: true,        // Must have quantitative ROI
  requireCompanyName: true,    // Must name implementing company
}
```

### Publishing Settings

```typescript
PUBLISHING_CONFIG = {
  maxIdeasPerDay: 3,           // Max 3 new ideas per day
  autoPublishThreshold: 9,     // Auto-publish if ROI ≥ 9/10
  requireReviewThreshold: 7,   // Queue for review if 7-8/10
}
```

## 📊 Output

### Published Ideas

MDX files are created in `content/automation-ideas/`:

```
content/automation-ideas/
├── auto-clinical-notes-from-audio.mdx
├── invoice-ocr-automation-sme.mdx
└── email-auto-response-support.mdx
```

Each file contains:
- Frontmatter (metadata for Next.js)
- Structured content (problem, solution, ROI, tools)
- SEO-optimized headings
- Call-to-actions to LumiGentic services

### Notifications

Daily Slack message with:
- ✅ Published ideas (titles)
- ❌ Rejected ideas (reasons)
- ⏱️ Pipeline duration
- 💰 Estimated API costs

## 💰 Operating Costs

Estimated monthly costs (publishing 3 ideas/day):

| Component | Cost/Month |
|---|---|
| Perplexity API (searches) | £20-30 |
| Claude API (extraction + generation) | £150-250 |
| **TOTAL** | **£170-280** |

**Per idea**: £2-4 (vs. 2-4 hours manual research @ £50-100/hr)

## 🛡️ Safety Features

### Quality Control

- ✅ Only trusted sources (whitelisted domains)
- ✅ ROI score threshold (minimum 7/10)
- ✅ Duplicate prevention (semantic similarity check)
- ✅ AI credibility validation (for high-ROI claims)
- ✅ Source trust scoring (tier-based)
- ✅ Content length requirements

### Rate Limiting

- 2 seconds between searches
- 3 seconds between extractions
- Max 10 searches per run
- Max 3 publishes per day

### Git Safety

- Commits are signed by "Automation Agent"
- Pushes only to main branch
- No force pushes or destructive operations

## 🐛 Troubleshooting

### "No sources found"

- Check `PERPLEXITY_API_KEY` is set correctly
- Verify API quota hasn't been exceeded
- Check network connectivity

### "Extraction failed"

- Check `ANTHROPIC_API_KEY` is valid
- Verify Claude API quota
- Review rate limits

### "Git push failed"

- In GitHub Actions: Check `GITHUB_TOKEN` permissions
- Locally: Ensure Git credentials are configured
- Verify branch protection rules allow commits

### "No ideas published"

- Check quality thresholds in `config.ts`
- Review rejection reasons in console output
- Lower `autoPublishThreshold` if needed

## 📚 Adding New Search Queries

Edit `SEARCH_QUERIES` in `config.ts`:

```typescript
export const SEARCH_QUERIES = [
  "automation case study 2025 ROI results",
  "YOUR NEW QUERY HERE",
];
```

## 🔒 Security

- **Never commit `.env.local`** (gitignored by default)
- Store API keys in GitHub Secrets only
- Trusted sources prevent malicious content
- AI validation catches unrealistic claims

## 📄 License

Proprietary - LumiGentic Ltd.

## 🤝 Support

For issues or questions:
- Check console output for detailed errors
- Review `config.ts` settings
- Contact: info@lumigentic.com
