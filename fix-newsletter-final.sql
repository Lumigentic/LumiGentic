-- Final Fix for Newsletter Subscribers RLS Policy
-- This ensures anonymous users (using anon key) can subscribe

-- First, drop ALL existing policies
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow anonymous newsletter subscriptions" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Public can insert newsletter subscribers" ON newsletter_subscribers;

-- Create a single, comprehensive policy that allows both anon and public
CREATE POLICY "Enable insert for anon and public users"
  ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- This policy allows ANY user (authenticated or not) to insert
-- The WITH CHECK (true) means there are no conditions - all inserts are allowed

-- Verify the policy
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'newsletter_subscribers';
