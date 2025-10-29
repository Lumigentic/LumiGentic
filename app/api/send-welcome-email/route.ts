import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { getWelcomeEmailHtml, getWelcomeEmailText } from '@/lib/email-templates'

// Initialize SendGrid with API key
const apiKey = process.env.SENDGRID_API_KEY
if (!apiKey) {
  console.error('SENDGRID_API_KEY is not configured')
} else {
  sgMail.setApiKey(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { email, name } = await request.json()

    // Validate inputs
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if SendGrid is configured
    if (!apiKey) {
      console.error('SendGrid API key not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'newsletter@lumigentic.com'
    const fromName = process.env.SENDGRID_FROM_NAME || 'LumiGentic'

    // Prepare email content
    const emailData = { email, name }
    const htmlContent = getWelcomeEmailHtml(emailData)
    const textContent = getWelcomeEmailText(emailData)

    // Send email via SendGrid
    const msg = {
      to: email,
      from: {
        email: fromEmail,
        name: fromName,
      },
      subject: 'Welcome to LumiGentic - Your Automation Journey Starts Here',
      text: textContent,
      html: htmlContent,
    }

    await sgMail.send(msg)

    console.log(`Welcome email sent successfully to ${email}`)

    return NextResponse.json(
      { success: true, message: 'Welcome email sent successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error sending welcome email:', error)

    // SendGrid-specific error handling
    if (error.response) {
      console.error('SendGrid error response:', error.response.body)
    }

    return NextResponse.json(
      {
        error: 'Failed to send welcome email',
        details: error.message
      },
      { status: 500 }
    )
  }
}
