/**
 * Simple in-process rate limiter for public form endpoints.
 *
 * Uses an in-memory LRU-like Map. Works correctly within a single serverless
 * function instance. Vercel may spin up multiple instances under load, so this
 * provides a best-effort defence rather than an absolute guarantee — which is
 * sufficient for KMU-scale deployments. For stricter limits, swap to a Redis
 * backed solution (e.g. Upstash) in a future phase.
 *
 * Usage:
 *   const result = checkRateLimit(req, { maxRequests: 10, windowMs: 60_000 });
 *   if (!result.ok) return res.status(429).json({ error: result.error });
 */
import type { VercelRequest } from '@vercel/node';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// One map per process lifetime; keyed by `ip:endpoint`
const store = new Map<string, RateLimitEntry>();

// Evict old entries periodically to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) store.delete(key);
  }
}, 60_000);

export interface RateLimitOptions {
  /** Maximum requests allowed in the window */
  maxRequests?: number;
  /** Window duration in ms (default: 60 000 = 1 minute) */
  windowMs?: number;
  /** Identifier suffix to namespace per-endpoint (e.g. 'reservation') */
  endpoint?: string;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  error?: string;
}

function getClientIp(req: VercelRequest): string {
  // Vercel sets x-forwarded-for; take only the first (client) IP
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const first = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
    return first.trim();
  }
  return req.socket?.remoteAddress ?? 'unknown';
}

export function checkRateLimit(
  req: VercelRequest,
  options: RateLimitOptions = {},
): RateLimitResult {
  const { maxRequests = 10, windowMs = 60_000, endpoint = 'form' } = options;
  const ip = getClientIp(req);
  const key = `${ip}:${endpoint}`;
  const now = Date.now();

  let entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { ok: true, remaining: maxRequests - 1 };
  }

  entry.count += 1;

  if (entry.count > maxRequests) {
    return {
      ok: false,
      remaining: 0,
      error: `Zu viele Anfragen. Bitte warte ${Math.ceil((entry.resetAt - now) / 1000)} Sekunden.`,
    };
  }

  return { ok: true, remaining: maxRequests - entry.count };
}
