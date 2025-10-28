-- =====================================================
-- LumiGentic SaaS Platform Database Schema
-- =====================================================
-- Complete schema for SaaS product with:
-- - User authentication
-- - Automation ideas catalog
-- - Report purchases & generation
-- - Dashboard analytics
-- =====================================================

-- =====================================================
-- 1. USERS & PROFILES
-- =====================================================

-- Extends Supabase auth.users with additional profile data
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  company_name VARCHAR(255),
  company_size VARCHAR(50), -- 'solo', '2-10', '11-50', '51-200', '201-500', '500+'
  industry VARCHAR(100),
  role VARCHAR(100), -- 'founder', 'cto', 'operations', 'consultant', etc.
  onboarding_completed BOOLEAN DEFAULT FALSE,
  subscription_tier VARCHAR(50) DEFAULT 'free', -- 'free', 'pro', 'enterprise'
  subscription_status VARCHAR(50) DEFAULT 'active',
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_tier ON user_profiles(subscription_tier);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- =====================================================
-- 2. AUTOMATION IDEAS (Enhanced)
-- =====================================================

CREATE TABLE IF NOT EXISTS automation_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  summary TEXT NOT NULL,
  industry VARCHAR(100) NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  roi_score INTEGER NOT NULL CHECK (roi_score >= 1 AND roi_score <= 10),
  time_saved VARCHAR(255),
  cost_savings VARCHAR(255),
  payback_period VARCHAR(100),
  tools TEXT[] DEFAULT '{}',
  source_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE, -- Premium ideas require subscription
  views_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  report_purchases_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb -- stores full MDX content
);

CREATE INDEX IF NOT EXISTS idx_automation_ideas_slug ON automation_ideas(slug);
CREATE INDEX IF NOT EXISTS idx_automation_ideas_industry ON automation_ideas(industry);
CREATE INDEX IF NOT EXISTS idx_automation_ideas_roi_score ON automation_ideas(roi_score DESC);
CREATE INDEX IF NOT EXISTS idx_automation_ideas_published_at ON automation_ideas(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_automation_ideas_is_featured ON automation_ideas(is_featured);

ALTER TABLE automation_ideas ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view non-premium ideas
CREATE POLICY "Anyone can view free automation ideas"
  ON automation_ideas
  FOR SELECT
  TO anon, authenticated
  USING (is_premium = FALSE);

-- Policy: Authenticated users can view premium ideas
CREATE POLICY "Authenticated users can view premium ideas"
  ON automation_ideas
  FOR SELECT
  TO authenticated
  USING (is_premium = TRUE);

-- =====================================================
-- 3. USER FAVORITES
-- =====================================================

CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  idea_id UUID REFERENCES automation_ideas(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, idea_id)
);

CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_idea_id ON user_favorites(idea_id);

ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own favorites"
  ON user_favorites
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 4. AUTOMATION REPORTS (Purchasable Product)
-- =====================================================

CREATE TABLE IF NOT EXISTS automation_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  idea_id UUID REFERENCES automation_ideas(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  price_gbp DECIMAL(10, 2) NOT NULL DEFAULT 99.00,
  price_usd DECIMAL(10, 2) NOT NULL DEFAULT 119.00,
  includes TEXT[], -- Array of what's included
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_automation_reports_idea_id ON automation_reports(idea_id);

ALTER TABLE automation_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available reports"
  ON automation_reports
  FOR SELECT
  TO anon, authenticated
  USING (is_available = TRUE);

-- =====================================================
-- 5. REPORT PURCHASES & ACCESS
-- =====================================================

CREATE TABLE IF NOT EXISTS report_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  report_id UUID REFERENCES automation_reports(id) ON DELETE CASCADE NOT NULL,
  idea_id UUID REFERENCES automation_ideas(id) ON DELETE CASCADE NOT NULL,
  amount_paid DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'GBP',
  stripe_payment_intent_id VARCHAR(255),
  stripe_charge_id VARCHAR(255),
  payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accessed_count INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(user_id, report_id)
);

CREATE INDEX IF NOT EXISTS idx_report_purchases_user_id ON report_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_report_purchases_report_id ON report_purchases(report_id);
CREATE INDEX IF NOT EXISTS idx_report_purchases_payment_status ON report_purchases(payment_status);

ALTER TABLE report_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases"
  ON report_purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- 6. NEWSLETTER SUBSCRIBERS
-- =====================================================

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  source VARCHAR(100) DEFAULT 'website',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  last_email_sent_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_is_active ON newsletter_subscribers(is_active);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- =====================================================
-- 7. ANALYTICS & TRACKING
-- =====================================================

CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  idea_slug VARCHAR(255),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id VARCHAR(255),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_page_views_idea_slug ON page_views(idea_slug);
CREATE INDEX IF NOT EXISTS idx_page_views_user_id ON page_views(user_id);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at DESC);

-- =====================================================
-- 8. NOTIFICATION QUEUE
-- =====================================================

CREATE TABLE IF NOT EXISTS notification_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscriber_email VARCHAR(255),
  notification_type VARCHAR(50) NOT NULL, -- 'new_idea', 'report_ready', 'weekly_digest'
  idea_id UUID REFERENCES automation_ideas(id) ON DELETE SET NULL,
  subject VARCHAR(500),
  sent_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_notification_queue_status ON notification_queue(status);
CREATE INDEX IF NOT EXISTS idx_notification_queue_user_id ON notification_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_queue_created_at ON notification_queue(created_at DESC);

-- =====================================================
-- 9. HELPER FUNCTIONS
-- =====================================================

-- Function: Increment idea view count
CREATE OR REPLACE FUNCTION increment_idea_views(idea_slug_param VARCHAR)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE automation_ideas
  SET views_count = views_count + 1
  WHERE slug = idea_slug_param;
END;
$$;

-- Function: Get user's purchased reports
CREATE OR REPLACE FUNCTION get_user_purchased_reports(user_id_param UUID)
RETURNS TABLE (
  report_id UUID,
  idea_id UUID,
  idea_title VARCHAR,
  purchased_at TIMESTAMP WITH TIME ZONE,
  amount_paid DECIMAL
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    rp.report_id,
    rp.idea_id,
    ai.title,
    rp.purchased_at,
    rp.amount_paid
  FROM report_purchases rp
  JOIN automation_ideas ai ON ai.id = rp.idea_id
  WHERE rp.user_id = user_id_param
    AND rp.payment_status = 'completed'
  ORDER BY rp.purchased_at DESC;
END;
$$;

-- Function: Check if user has access to report
CREATE OR REPLACE FUNCTION user_has_report_access(
  user_id_param UUID,
  report_id_param UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM report_purchases
    WHERE user_id = user_id_param
      AND report_id = report_id_param
      AND payment_status = 'completed'
  );
END;
$$;

-- Function: Get dashboard stats for user
CREATE OR REPLACE FUNCTION get_user_dashboard_stats(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'reports_purchased', COUNT(DISTINCT rp.id),
    'favorites_count', COUNT(DISTINCT uf.id),
    'total_spent', COALESCE(SUM(rp.amount_paid), 0),
    'ideas_viewed', COUNT(DISTINCT pv.idea_slug)
  ) INTO result
  FROM user_profiles up
  LEFT JOIN report_purchases rp ON rp.user_id = up.id AND rp.payment_status = 'completed'
  LEFT JOIN user_favorites uf ON uf.user_id = up.id
  LEFT JOIN page_views pv ON pv.user_id = up.id
  WHERE up.id = user_id_param;

  RETURN result;
END;
$$;

-- =====================================================
-- 10. TRIGGERS
-- =====================================================

-- Trigger: Update user_profiles updated_at on change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_automation_ideas_updated_at
  BEFORE UPDATE ON automation_ideas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DONE! SaaS Platform Schema Complete
-- =====================================================

-- Next steps:
-- 1. Set up Stripe integration for payments
-- 2. Create dashboard UI components
-- 3. Build report generation system
-- 4. Set up email notifications (Resend/SendGrid)
-- 5. Add authentication flow (Supabase Auth)
