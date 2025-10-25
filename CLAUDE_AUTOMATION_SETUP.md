# 🤖 Claude Automation Agent - Setup Guide

## Overview

This is a **simplified, cost-effective** automation agent that uses **only Claude API** (no Perplexity required).

**Cost**: ~£2-5 per run (vs £50-70/month for full agent stack)

## How It Works

```
🤖 Claude discovers automation opportunities
    ↓
📝 Claude generates MDX content
    ↓
💾 Script saves files to /content/automation-ideas/
    ↓
📤 Git commits and pushes to GitHub
    ↓
🚀 Vercel auto-deploys (2 mins)
    ↓
✅ Live on lumigentic.com/automation-ideas
```

## Schedule

**Automatic runs**: Every Monday, Wednesday, Friday at 6am UTC (7am UK)

**Manual runs**: Anytime through GitHub Actions

## Setup Instructions

### 1. Get Your Anthropic API Key

You already have this! It's the same key you use for Claude Code.

1. Go to: https://console.anthropic.com/settings/keys
2. Copy your API key
3. Go to GitHub: https://github.com/MissCeptstudios/LumiGentic/settings/secrets/actions
4. Click "New repository secret"
5. Name: `ANTHROPIC_API_KEY`
6. Value: Paste your API key
7. Click "Add secret"

### 2. Test Manual Run

1. Go to: https://github.com/MissCeptstudios/LumiGentic/actions
2. Click "Auto-Discover Ideas with Claude" workflow
3. Click "Run workflow" → "Run workflow"
4. Wait ~2-3 minutes
5. Check for new commits in: https://github.com/MissCeptstudios/LumiGentic/commits/main

### 3. Verify Deployment

After the workflow completes:

1. Wait 2 more minutes for Vercel to deploy
2. Visit: https://lumigentic.com/automation-ideas/
3. New ideas should appear!

## Manual Local Testing

You can also run this locally to test:

```bash
# Set your API key
export ANTHROPIC_API_KEY="your-key-here"

# Run discovery
npm run discover-with-claude

# Check what was created
ls content/automation-ideas/
```

## What Claude Does

1. **Discovery**: Claude searches its knowledge for recent automation case studies with proven ROI
2. **Extraction**: Extracts key metrics (time saved, cost reduction, tools used)
3. **Validation**: Checks for duplicates, verifies data quality
4. **Generation**: Creates beautiful MDX content for each idea
5. **Publishing**: Commits and pushes to GitHub

## Trusted Sources

Claude focuses on authoritative sources:
- McKinsey, BCG, Bain
- Gartner, Forrester
- UiPath, Microsoft, AWS
- NHS Digital
- Harvard Business Review
- Industry publications

## Cost Comparison

| Solution | Monthly Cost | What You Get |
|----------|--------------|--------------|
| **Manual (You + Claude Code)** | £0 | On-demand, unlimited |
| **Claude Automation** | £6-15 | 3x/week automatic |
| **Full Agent Stack** | £50-70 | Daily automatic |

## Frequency Options

Edit `.github/workflows/claude-automation.yml` to change frequency:

```yaml
# Daily at 6am
schedule:
  - cron: '0 6 * * *'

# Every Monday at 6am
schedule:
  - cron: '0 6 * * 1'

# Twice daily (6am and 6pm)
schedule:
  - cron: '0 6,18 * * *'
```

## Monitoring

Check workflow runs:
https://github.com/MissCeptstudios/LumiGentic/actions

Each run shows:
- How many ideas were discovered
- Which ideas were new vs duplicates
- Git commit details
- Any errors

## Troubleshooting

### "No ideas discovered"
- This is normal - sometimes Claude doesn't find new high-quality ideas
- Try running again or increasing frequency

### "API key not found"
- Make sure you added `ANTHROPIC_API_KEY` to GitHub Secrets
- Check the secret name is exactly `ANTHROPIC_API_KEY` (case-sensitive)

### "Git push failed"
- Check workflow has `contents: write` permission (already configured)
- Verify GitHub token has correct permissions

## Next Steps

1. ✅ Add `ANTHROPIC_API_KEY` to GitHub Secrets
2. ✅ Run manual test workflow
3. ✅ Verify new ideas appear on site
4. ✅ Let it run automatically 3x/week

---

**Questions?** The workflow will start automatically on the next scheduled run (Monday/Wednesday/Friday at 6am UTC).
