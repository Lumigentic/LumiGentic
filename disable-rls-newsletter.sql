-- Option 1: Temporarily disable RLS to test
-- (This will allow all inserts without any restrictions)

ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'newsletter_subscribers';

-- After testing, if this works, we can re-enable RLS with proper policies
