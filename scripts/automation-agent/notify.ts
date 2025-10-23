/**
 * Notification Agent: Sends Slack/email summaries
 */

import { NotificationPayload } from './types';

/**
 * Send notification about pipeline results
 */
export async function sendNotification(payload: NotificationPayload): Promise<void> {
  console.log('\n📬 Sending notifications...\n');

  // Send to Slack
  if (process.env.SLACK_WEBHOOK_URL) {
    await sendSlackNotification(payload);
  }

  // Send email (placeholder - implement with SendGrid/Resend)
  if (process.env.SENDGRID_API_KEY || process.env.RESEND_API_KEY) {
    await sendEmailNotification(payload);
  }

  if (!process.env.SLACK_WEBHOOK_URL && !process.env.SENDGRID_API_KEY && !process.env.RESEND_API_KEY) {
    console.log('   ℹ️  No notification channels configured');
    console.log('   💡 Set SLACK_WEBHOOK_URL or SENDGRID_API_KEY to enable notifications\n');
  }
}

/**
 * Send Slack notification
 */
async function sendSlackNotification(payload: NotificationPayload): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const message = formatSlackMessage(payload);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (response.ok) {
      console.log('   ✅ Slack notification sent');
    } else {
      console.error('   ❌ Slack notification failed:', await response.text());
    }
  } catch (error) {
    console.error('   ❌ Slack notification error:', error);
  }
}

/**
 * Format Slack message
 */
function formatSlackMessage(payload: NotificationPayload) {
  if (payload.error) {
    return {
      text: '❌ Automation Idea Pipeline Failed',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '❌ Automation Idea Pipeline Failed',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Error:* ${payload.error}`,
          },
        },
      ],
    };
  }

  const { published = 0, rejected = 0, duration = '0', publishedTitles = [], rejectedDetails = [] } = payload;

  const blocks: any[] = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '🤖 Automation Idea Pipeline Summary',
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Published:*\n${published} new ideas`,
        },
        {
          type: 'mrkdwn',
          text: `*Rejected:*\n${rejected} ideas`,
        },
        {
          type: 'mrkdwn',
          text: `*Duration:*\n${duration} min`,
        },
        {
          type: 'mrkdwn',
          text: `*Date:*\n${new Date().toLocaleDateString('en-GB')}`,
        },
      ],
    },
  ];

  // Add published ideas
  if (publishedTitles.length > 0) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*✅ Published Ideas:*\n${publishedTitles.map((t, i) => `${i + 1}. ${t}`).join('\n')}`,
      },
    });
  }

  // Add rejected summary
  if (rejectedDetails.length > 0) {
    const rejectionSummary = rejectedDetails.slice(0, 5).map(r => `• ${r.reason}`).join('\n');
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*❌ Top Rejection Reasons:*\n${rejectionSummary}${rejectedDetails.length > 5 ? `\n_...and ${rejectedDetails.length - 5} more_` : ''}`,
      },
    });
  }

  // Add action buttons
  blocks.push({
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'View Automation Ideas',
        },
        url: 'https://lumigentic.com/automation-ideas',
      },
    ],
  });

  return { blocks };
}

/**
 * Send email notification (placeholder)
 */
async function sendEmailNotification(payload: NotificationPayload): Promise<void> {
  // TODO: Implement with SendGrid or Resend
  console.log('   ℹ️  Email notification not yet implemented');
}

export { sendSlackNotification, formatSlackMessage };
