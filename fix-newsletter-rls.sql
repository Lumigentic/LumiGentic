-- Fix Newsletter Subscribers RLS Policy
-- Run this in Supabase SQL Editor

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe" ON newsletter_subscribers;

-- Recreate the correct policy for anonymous users
CREATE POLICY "Allow anonymous newsletter subscriptions"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, public
  WITH CHECK (true);

-- Verify the policy
SELECT schemaname, tablename, policyname, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'newsletter_subscribers';
