-- Fix newsletter subscription policy to allow both anon and authenticated users
DROP POLICY IF EXISTS "Anyone can subscribe" ON newsletter_subscribers;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
