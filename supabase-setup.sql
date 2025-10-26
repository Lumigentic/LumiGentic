-- =====================================================
-- LumiGentic Newsletter Database Schema
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  source VARCHAR(100) DEFAULT 'website',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Create index on subscribed_at for sorting
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy: Anyone can insert (subscribe)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy: Only authenticated users can view all subscribers
CREATE POLICY "Only authenticated users can view subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy: Only authenticated users can update
CREATE POLICY "Only authenticated users can update subscribers"
  ON newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (true);

-- =====================================================
-- Create automation_ideas table (optional - if you want to track in DB)
-- =====================================================

CREATE TABLE IF NOT EXISTS automation_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  industry VARCHAR(100) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  roi_score INTEGER NOT NULL CHECK (roi_score >= 1 AND roi_score <= 10),
  time_saved VARCHAR(255),
  cost_savings VARCHAR(255),
  payback_period VARCHAR(100),
  tools TEXT[],
  source_url TEXT,
  summary TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  views_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_automation_ideas_slug ON automation_ideas(slug);
CREATE INDEX IF NOT EXISTS idx_automation_ideas_industry ON automation_ideas(industry);
CREATE INDEX IF NOT EXISTS idx_automation_ideas_roi_score ON automation_ideas(roi_score DESC);
CREATE INDEX IF NOT EXISTS idx_automation_ideas_published_at ON automation_ideas(published_at DESC);

-- Enable RLS
ALTER TABLE automation_ideas ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read automation ideas
CREATE POLICY "Anyone can view automation ideas"
  ON automation_ideas
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Only authenticated users can insert
CREATE POLICY "Only authenticated users can insert ideas"
  ON automation_ideas
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =====================================================
-- Create function to send email notifications
-- =====================================================

-- This will be called via Supabase Edge Function or webhook
-- For now, just tracking who should receive notifications

CREATE TABLE IF NOT EXISTS notification_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_email VARCHAR(255) NOT NULL,
  notification_type VARCHAR(50) NOT NULL, -- 'new_idea', 'weekly_digest', etc.
  idea_slug VARCHAR(255),
  sent_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_notification_queue_status ON notification_queue(status);
CREATE INDEX IF NOT EXISTS idx_notification_queue_created_at ON notification_queue(created_at DESC);

-- =====================================================
-- Helper functions
-- =====================================================

-- Function to get active subscriber count
CREATE OR REPLACE FUNCTION get_active_subscriber_count()
RETURNS INTEGER
LANGUAGE SQL
STABLE
AS $$
  SELECT COUNT(*)::INTEGER FROM newsletter_subscribers WHERE is_active = TRUE;
$$;

-- Function to unsubscribe
CREATE OR REPLACE FUNCTION unsubscribe_email(subscriber_email VARCHAR)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE newsletter_subscribers
  SET is_active = FALSE, unsubscribed_at = NOW()
  WHERE email = subscriber_email AND is_active = TRUE;

  RETURN FOUND;
END;
$$;

-- =====================================================
-- Sample data (optional - for testing)
-- =====================================================

-- Uncomment to insert sample subscriber
-- INSERT INTO newsletter_subscribers (email, name, source)
-- VALUES ('test@example.com', 'Test User', 'website');

-- =====================================================
-- DONE! Your Supabase database is ready
-- =====================================================

-- Next steps:
-- 1. Copy your Supabase URL and anon key to .env.local
-- 2. Use the newsletter component on your website
-- 3. Set up email notifications (we'll create Edge Function next)
