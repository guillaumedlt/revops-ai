import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

// AES-256-GCM encryption for stored secrets (tokens, API keys)
// Key derived from JWT_SECRET env var (first 32 bytes)

function getKey(): Buffer {
  var secret = process.env.JWT_SECRET || process.env.CRON_SECRET || "kairo-default-key-change-me";
  // SHA-256 hash to get exactly 32 bytes
  var crypto = require("crypto");
  return crypto.createHash("sha256").update(secret).digest();
}

export function encrypt(plaintext: string): string {
  var key = getKey();
  var iv = randomBytes(12); // 96-bit IV for GCM
  var cipher = createCipheriv("aes-256-gcm", key, iv);
  var encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  var authTag = cipher.getAuthTag();
  // Format: base64(iv:authTag:encrypted)
  var combined = Buffer.concat([iv, authTag, encrypted]);
  return "enc:" + combined.toString("base64");
}

export function decrypt(ciphertext: string): string {
  if (!ciphertext.startsWith("enc:")) {
    // Not encrypted (legacy plaintext) — return as-is
    return ciphertext;
  }
  try {
    var key = getKey();
    var combined = Buffer.from(ciphertext.slice(4), "base64");
    var iv = combined.subarray(0, 12);
    var authTag = combined.subarray(12, 28);
    var encrypted = combined.subarray(28);
    var decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    var decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString("utf8");
  } catch {
    // Decryption failed — key may have changed. Log and return empty.
    // User will need to reconnect the service to re-encrypt with current key.
    console.error("[crypto] Decryption failed — key mismatch. Reconnection needed.");
    return "";
  }
}
