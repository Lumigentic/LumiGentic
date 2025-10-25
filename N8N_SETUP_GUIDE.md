# 🚀 n8n Automation Setup Guide

## Perfect Solution: n8n + Claude API = £0/month!

Since Iza already has n8n running, this is the **best solution** for you:

✅ **£0 monthly cost** (using n8n self-hosted + Claude free credits)
✅ **Fully automated** - runs every day at 3am
✅ **No manual work** - wake up to new ideas
✅ **Self-hosted** - complete control

---

## 📋 What You Need

1. ✅ **n8n instance** (Iza already has this!)
2. ⬜ **Claude API key** (Free $5 credit = 2 years of automation)
3. ⬜ **GitHub Personal Access Token**
4. ⬜ (Optional) Slack webhook for notifications

---

## Step 1: Get Claude API Key (5 minutes)

1. Go to: https://console.anthropic.com/
2. Sign up with your email
3. **Get $5 free credit** automatically (= ~650 runs = 2+ years!)
4. Go to: https://console.anthropic.com/settings/keys
5. Click "Create Key"
6. Copy the key (starts with `sk-ant-...`)
7. Save it securely

**Cost**: $5 free credit lasts 2+ years of daily automation!

---

## Step 2: Get GitHub Token (2 minutes)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it: "n8n LumiGentic Automation"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Actions workflows)
5. Click "Generate token"
6. Copy the token (starts with `ghp_...`)
7. Save it securely

---

## Step 3: Import Workflow to n8n (5 minutes)

### A. Import the JSON

1. Open Iza's n8n dashboard
2. Click **"Workflows"** → **"Import from File"**
3. Upload: `n8n-automation-workflow.json`
4. Workflow will appear: **"LumiGentic - Automation Ideas Discovery"**

### B. Configure Credentials

#### 1. Add Claude API Credentials

1. In the workflow, click on **"Claude - Discover Ideas"** node
2. Click "Create New Credential"
3. Select **"HTTP Header Auth"**
4. Configure:
   - **Name**: `Anthropic Claude API`
   - **Header Name**: `x-api-key`
   - **Header Value**: `your-claude-api-key` (paste from Step 1)
5. Click "Save"

#### 2. Add GitHub Credentials

1. Click on **"GitHub - Commit MDX File"** node
2. Click "Create New Credential"
3. Select **"GitHub API"**
4. Configure:
   - **Access Token**: `your-github-token` (paste from Step 2)
   - **Username**: `MissCeptstudios` (or your GitHub username)
5. Test connection
6. Click "Save"

#### 3. (Optional) Add Slack Webhook

1. Click on **"Slack Notification"** node
2. Add your Slack webhook URL
3. Or **disable this node** if you don't want Slack notifications

### C. Activate the Workflow

1. Click the **toggle switch** at the top right
2. Should show: ✅ **Active**
3. The workflow will now run automatically every day at 3am!

---

## Step 4: Test Manual Run (2 minutes)

Before waiting until 3am, test it works:

1. In n8n workflow editor, click **"Execute Workflow"** button
2. Watch the nodes execute:
   - ✅ Claude discovers 3 ideas
   - ✅ Parses JSON response
   - ✅ Generates MDX files
   - ✅ Commits to GitHub
   - ✅ (Optional) Sends Slack notification
3. Check GitHub commits: https://github.com/MissCeptstudios/LumiGentic/commits/main
4. Wait 2 minutes for Vercel to deploy
5. Check: https://lumigentic.com/automation-ideas/

If you see new ideas - **SUCCESS!** 🎉

---

## How It Works

```
┌─────────────────────────────────────────────┐
│  n8n Schedule Trigger                       │
│  Runs: Every day at 3:00 AM                 │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  HTTP Request to Claude API                 │
│  Prompt: "Find 3 automation opportunities"  │
│  Model: claude-sonnet-4                     │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  Parse JSON Response                        │
│  Extract: titles, metrics, ROI, proof       │
└──────────────┬──────────────────────────────┘
               │
               ▼ (loops for each idea)
┌─────────────────────────────────────────────┐
│  Generate MDX Content                       │
│  Format: Frontmatter + Markdown sections    │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  GitHub API - Create/Update File            │
│  Path: content/automation-ideas/{slug}.mdx  │
│  Commit: "Add automation idea: {title}"     │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  Vercel Auto-Deploy (automatic)             │
│  Deploys: https://lumigentic.com            │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  (Optional) Slack Notification              │
│  Message: "✅ Published: {idea-title}"      │
└─────────────────────────────────────────────┘
```

---

## Schedule Options

You can change when the workflow runs by editing the **Schedule Trigger** node:

### Current: Daily at 3am
```
0 3 * * *
```

### Alternative Schedules:

**3x per week (Mon/Wed/Fri at 3am)**:
```
0 3 * * 1,3,5
```

**Once a week (Monday at 3am)**:
```
0 3 * * 1
```

**Twice daily (3am and 3pm)**:
```
0 3,15 * * *
```

**Every 3 days at 3am**:
```
0 3 */3 * *
```

---

## Cost Breakdown

| Component | Monthly Cost | Notes |
|-----------|--------------|-------|
| n8n (self-hosted) | £0 | Already running on Iza's server |
| Claude API | £0 | $5 free credit = 2 years |
| GitHub | £0 | Free tier |
| Vercel | £0 | Free tier |
| **TOTAL** | **£0** | After 2 years: ~£2-3/month |

---

## Troubleshooting

### "Claude API request failed"
- Check your API key is correct
- Verify you have credits: https://console.anthropic.com/settings/billing

### "GitHub commit failed"
- Check GitHub token has `repo` and `workflow` scopes
- Verify token hasn't expired

### "No JSON in response"
- Claude occasionally returns plain text - re-run the workflow
- Check the "Claude - Discover Ideas" output

### "Duplicate ideas"
Before committing, you might want to add a duplicate check:
1. Add a **GitHub** node to fetch existing files
2. Add a **Code** node to filter duplicates
3. Only commit new ideas

(I can create this enhanced version if needed!)

---

## Advanced: Error Handling

To make it more robust, consider adding:

1. **Error Email**: Send email if workflow fails
2. **Retry Logic**: Retry Claude API call if it fails
3. **Duplicate Check**: Don't commit ideas that already exist
4. **Quality Filter**: Only commit ideas with ROI > 7/10

Let me know if you want me to create an enhanced workflow with these features!

---

## Next Steps

1. ✅ Import `n8n-automation-workflow.json` to Iza's n8n
2. ✅ Add Claude API credentials
3. ✅ Add GitHub credentials
4. ✅ Test manual run
5. ✅ Activate workflow
6. ✅ Wait until tomorrow 3am (or whenever you set)
7. ✅ Wake up to new automation ideas! ☕

---

## Questions?

- Need help with n8n setup? Ask Iza!
- Need a different schedule? Edit the Cron expression
- Want to customize the prompt? Edit the "Claude - Discover Ideas" node
- Want more/fewer ideas per run? Change "Find 3" to "Find 5" in the prompt

**You're all set!** The automation will run every day at 3am and publish fresh automation ideas automatically. 🚀
