/**
 * AES-256-GCM encryption/decryption for sensitive config values (e.g. SMTP passwords).
 *
 * Uses Node.js built-in `crypto` — no external dependencies.
 * Key is derived from AUTH_SECRET via SHA-256 so any string works as a secret.
 *
 * Ciphertext format (all base64url joined by '.'):
 *   <iv>.<authTag>.<ciphertext>
 *
 * Values that are already plaintext (legacy, before encryption was added) are
 * detected by the absence of the '.' separator and returned as-is after a
 * migration encrypt on next save.
 */
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

const ALGO = 'aes-256-gcm';
const SEPARATOR = '.';

function deriveKey(): Buffer {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET env var is required for encryption');
  return createHash('sha256').update(secret).digest();
}

/** Returns a base64url-encoded encrypted string: <iv>.<tag>.<ciphertext> */
export function encrypt(plaintext: string): string {
  if (!plaintext) return plaintext;
  const key = deriveKey();
  const iv = randomBytes(12); // 96-bit IV recommended for GCM
  const cipher = createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv, tag, encrypted].map((b) => b.toString('base64url')).join(SEPARATOR);
}

/** Decrypts a value encrypted by `encrypt()`. Returns plaintext as-is if not encrypted. */
export function decrypt(value: string): string {
  if (!value) return value;
  // Legacy plaintext detection: encrypted values always contain exactly 2 separators
  const parts = value.split(SEPARATOR);
  if (parts.length !== 3) return value; // not encrypted — return as-is
  try {
    const [ivB64, tagB64, ctB64] = parts;
    const key = deriveKey();
    const iv = Buffer.from(ivB64, 'base64url');
    const tag = Buffer.from(tagB64, 'base64url');
    const ct = Buffer.from(ctB64, 'base64url');
    const decipher = createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(tag);
    return decipher.update(ct).toString('utf8') + decipher.final('utf8');
  } catch {
    // Decryption failed (wrong key, tampered data) — return empty string
    return '';
  }
}

/** Checks whether a string looks like an encrypted value */
export function isEncrypted(value: string): boolean {
  return value.split(SEPARATOR).length === 3;
}
