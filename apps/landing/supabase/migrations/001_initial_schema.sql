-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  subscription_status TEXT CHECK (subscription_status IN ('active', 'canceled', 'past_due')),
  subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer_id ON users(stripe_customer_id);

-- Waitlist table
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  variant_seen TEXT CHECK (variant_seen IN ('neo_brutalist', 'modern', 'production_studio')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for waitlist
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Analytics events table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  variant TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for analytics
CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_variant ON analytics_events(variant);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Public read access for analytics (for internal dashboards)
CREATE POLICY "Allow public read access to analytics"
  ON analytics_events
  FOR SELECT
  USING (true);

-- Allow public insert for analytics and waitlist
CREATE POLICY "Allow public insert to analytics"
  ON analytics_events
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert to waitlist"
  ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Users table policies (only service role can access)
CREATE POLICY "Service role can do everything on users"
  ON users
  FOR ALL
  USING (auth.role() = 'service_role');

-- Comments for documentation
COMMENT ON TABLE users IS 'Stores user subscription and account information';
COMMENT ON TABLE waitlist IS 'Stores email signups before conversion';
COMMENT ON TABLE analytics_events IS 'Tracks user interactions and page events';
