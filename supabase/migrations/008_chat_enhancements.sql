ALTER TABLE conversations ADD COLUMN IF NOT EXISTS is_archived boolean DEFAULT false;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS content_blocks jsonb;
CREATE INDEX IF NOT EXISTS idx_conversations_tenant_last_msg ON conversations(tenant_id, last_message_at DESC) WHERE is_archived = false;

-- Update last_message_at on new message
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS trigger AS $$
BEGIN
  UPDATE conversations SET last_message_at = NOW() WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_conversation_last_message ON messages;
CREATE TRIGGER trg_update_conversation_last_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_last_message();
