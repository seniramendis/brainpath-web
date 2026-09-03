import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

let warned = false;
function warnIfUnconfigured() {
  if (!redis && !warned) {
    warned = true;
    console.warn(
      "[rate-limit] UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN are not set — " +
        "auth endpoints are running WITHOUT rate limiting. See .env.example."
    );
  }
}

// 5 login attempts per minute per IP.
export const loginLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "1 m"), prefix: "rl:login:ip" })
  : null;

// 10 login attempts per 15 minutes per email — stops a botnet from
// distributing a brute-force attack on one account across many IPs.
export const loginEmailLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "15 m"), prefix: "rl:login:email" })
  : null;

// 3 signups per hour per IP — signups are rarer for real users and costlier to abuse (spam accounts).
export const signupLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, "1 h"), prefix: "rl:signup" })
  : null;

// Google OAuth start/callback — generous, just to stop scripted abuse.
export const oauthLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "1 m"), prefix: "rl:oauth" })
  : null;

/**
 * Checks a rate limiter. Fails OPEN (allows the request) if Upstash isn't
 * configured, so auth doesn't break for people who haven't set it up yet —
 * it just runs unprotected until they do.
 */
export async function checkRateLimit(limiter: Ratelimit | null, identifier: string) {
  warnIfUnconfigured();
  if (!limiter) return { success: true } as const;
  const result = await limiter.limit(identifier);
  return { success: result.success } as const;
}

/** Best-effort client IP, for use inside Server Actions (no NextRequest available there). */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

/** Same, but for Route Handlers where a NextRequest is available directly. */
export function getRequestIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
