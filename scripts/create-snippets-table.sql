-- Create snippets table for the notepad app
CREATE TABLE IF NOT EXISTS snippets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  file_type VARCHAR(50) NOT NULL DEFAULT 'txt',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on created_at for efficient queries
CREATE INDEX IF NOT EXISTS snippets_created_at_idx ON snippets(created_at DESC);
