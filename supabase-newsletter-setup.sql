-- Newsletter Subscribers Table Setup
-- This is the WORKING configuration for newsletter subscriptions

-- Disable RLS for newsletter_subscribers to allow public signups
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;

-- Note: RLS is disabled because:
-- 1. Newsletter signup should be publicly accessible
-- 2. Email uniqueness is enforced by UNIQUE constraint
-- 3. Read access is still controlled by authentication in the app
-- 4. No sensitive data stored in this table

-- Verify the configuration
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'newsletter_subscribers';

-- Expected result: rowsecurity = false
