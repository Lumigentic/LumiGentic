// Email templates for newsletter and automation updates

export interface WelcomeEmailProps {
  name?: string
  email: string
}

export interface NewsletterEmailProps {
  name?: string
  ideas: {
    title: string
    summary: string
    slug: string
    industry: string
    roiScore: number
    timeSaved: string
  }[]
}

export function getWelcomeEmailHtml({ name }: WelcomeEmailProps): string {
  const greeting = name ? `Hi ${name}` : 'Hi there'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to LumiGentic</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700;">LumiGentic</h1>
    <p style="color: #cccccc; margin: 10px 0 0; font-size: 16px;">Smart Automation for Business Growth</p>
  </div>

  <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e5e5; border-top: none;">
    <h2 style="color: #000000; margin: 0 0 20px; font-size: 24px; font-weight: 600;">Welcome! 👋</h2>

    <p style="color: #333333; margin: 0 0 16px; font-size: 16px;">${greeting},</p>

    <p style="color: #333333; margin: 0 0 16px; font-size: 16px;">
      Thanks for subscribing to the LumiGentic newsletter! You're now part of a community focused on leveraging automation to save time, reduce costs, and grow smarter.
    </p>

    <p style="color: #333333; margin: 0 0 24px; font-size: 16px;">
      <strong>Here's what you can expect:</strong>
    </p>

    <div style="background: #f9f9f9; border-left: 4px solid #000000; padding: 20px; margin: 0 0 24px; border-radius: 4px;">
      <ul style="margin: 0; padding-left: 20px; color: #555555;">
        <li style="margin-bottom: 12px;">
          <strong>Weekly Automation Ideas</strong> – Real-world case studies with proven ROI data
        </li>
        <li style="margin-bottom: 12px;">
          <strong>Implementation Guides</strong> – Step-by-step roadmaps to get started
        </li>
        <li style="margin-bottom: 12px;">
          <strong>Tool Recommendations</strong> – The best platforms for each use case
        </li>
        <li style="margin-bottom: 0;">
          <strong>Industry Insights</strong> – Trends in AI, RPA, and intelligent automation
        </li>
      </ul>
    </div>

    <p style="color: #333333; margin: 0 0 24px; font-size: 16px;">
      While you wait for your first newsletter, explore our existing automation ideas:
    </p>

    <div style="text-align: center; margin: 0 0 24px;">
      <a href="https://lumigentic.com/automation-ideas" style="display: inline-block; background: #000000; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Browse Automation Ideas</a>
    </div>

    <p style="color: #666666; margin: 0; font-size: 14px; border-top: 1px solid #e5e5e5; padding-top: 20px;">
      Questions? Just reply to this email – we read every message.
    </p>
  </div>

  <div style="background: #f9f9f9; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e5e5e5; border-top: none;">
    <p style="color: #999999; margin: 0 0 8px; font-size: 12px;">
      You're receiving this because you subscribed to LumiGentic updates
    </p>
    <p style="color: #999999; margin: 0; font-size: 12px;">
      <a href="https://lumigentic.com/unsubscribe?email={{email}}" style="color: #666666; text-decoration: underline;">Unsubscribe</a> |
      <a href="https://lumigentic.com" style="color: #666666; text-decoration: underline;">Visit our website</a>
    </p>
  </div>

</body>
</html>
  `.trim()
}

export function getWelcomeEmailText({ name }: WelcomeEmailProps): string {
  const greeting = name ? `Hi ${name}` : 'Hi there'

  return `
${greeting},

Thanks for subscribing to the LumiGentic newsletter! You're now part of a community focused on leveraging automation to save time, reduce costs, and grow smarter.

Here's what you can expect:

• Weekly Automation Ideas – Real-world case studies with proven ROI data
• Implementation Guides – Step-by-step roadmaps to get started
• Tool Recommendations – The best platforms for each use case
• Industry Insights – Trends in AI, RPA, and intelligent automation

While you wait for your first newsletter, explore our existing automation ideas:
https://lumigentic.com/automation-ideas

Questions? Just reply to this email – we read every message.

---
You're receiving this because you subscribed to LumiGentic updates.
Unsubscribe: https://lumigentic.com/unsubscribe
Website: https://lumigentic.com
  `.trim()
}

export function getNewsletterEmailHtml({ name, ideas }: NewsletterEmailProps): string {
  const greeting = name ? `Hi ${name}` : 'Hi there'

  const ideasHtml = ideas.map(idea => `
    <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <span style="background: #000000; color: #ffffff; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">${idea.industry}</span>
        <span style="color: #666666; font-size: 14px;">ROI Score: ${idea.roiScore}/10</span>
      </div>

      <h3 style="color: #000000; margin: 0 0 12px; font-size: 20px; font-weight: 600;">
        <a href="https://lumigentic.com/automation-ideas/${idea.slug}" style="color: #000000; text-decoration: none;">${idea.title}</a>
      </h3>

      <p style="color: #555555; margin: 0 0 16px; font-size: 15px; line-height: 1.6;">
        ${idea.summary}
      </p>

      <div style="background: #f9f9f9; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px;">
        <strong style="color: #000000; font-size: 14px;">Time Saved:</strong>
        <span style="color: #555555; font-size: 14px;">${idea.timeSaved}</span>
      </div>

      <a href="https://lumigentic.com/automation-ideas/${idea.slug}" style="display: inline-block; background: #000000; color: #ffffff; padding: 10px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Read Full Case Study →</a>
    </div>
  `).join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Automation Ideas - LumiGentic</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">

  <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700;">LumiGentic</h1>
    <p style="color: #cccccc; margin: 10px 0 0; font-size: 16px;">New Automation Ideas This Week</p>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border: 1px solid #e5e5e5; border-top: none;">
    <p style="color: #333333; margin: 0 0 24px; font-size: 16px;">${greeting},</p>

    <p style="color: #333333; margin: 0 0 30px; font-size: 16px;">
      Here are ${ideas.length} new automation ${ideas.length === 1 ? 'idea' : 'ideas'} with proven ROI data from real-world implementations:
    </p>

    ${ideasHtml}

    <div style="text-align: center; margin: 30px 0 20px; padding-top: 20px; border-top: 2px solid #e5e5e5;">
      <a href="https://lumigentic.com/automation-ideas" style="display: inline-block; background: #000000; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">View All Automation Ideas</a>
    </div>

    <p style="color: #666666; margin: 20px 0 0; font-size: 14px; text-align: center;">
      Want help implementing these ideas? <a href="https://lumigentic.com/#contact" style="color: #000000; font-weight: 600;">Book a discovery call</a>
    </p>
  </div>

  <div style="background: #ffffff; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e5e5e5; border-top: none;">
    <p style="color: #999999; margin: 0 0 8px; font-size: 12px;">
      You're receiving this weekly newsletter because you subscribed to LumiGentic updates
    </p>
    <p style="color: #999999; margin: 0; font-size: 12px;">
      <a href="https://lumigentic.com/unsubscribe?email={{email}}" style="color: #666666; text-decoration: underline;">Unsubscribe</a> |
      <a href="https://lumigentic.com" style="color: #666666; text-decoration: underline;">Visit our website</a>
    </p>
  </div>

</body>
</html>
  `.trim()
}

export function getNewsletterEmailText({ name, ideas }: NewsletterEmailProps): string {
  const greeting = name ? `Hi ${name}` : 'Hi there'

  const ideasText = ideas.map((idea, index) => `
${index + 1}. ${idea.title}
   Industry: ${idea.industry} | ROI Score: ${idea.roiScore}/10

   ${idea.summary}

   Time Saved: ${idea.timeSaved}

   Read more: https://lumigentic.com/automation-ideas/${idea.slug}
  `).join('\n')

  return `
${greeting},

Here are ${ideas.length} new automation ${ideas.length === 1 ? 'idea' : 'ideas'} with proven ROI data from real-world implementations:

${ideasText}

---

View all automation ideas: https://lumigentic.com/automation-ideas

Want help implementing these ideas? Book a discovery call: https://lumigentic.com/#contact

---
You're receiving this weekly newsletter because you subscribed to LumiGentic updates.
Unsubscribe: https://lumigentic.com/unsubscribe
Website: https://lumigentic.com
  `.trim()
}
