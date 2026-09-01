// Simple in-memory rate limiter. Resets on server restart — fine for a portfolio site.

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private requests = new Map<string, RateLimitEntry>();

  constructor(
    private maxRequests: number,
    private windowMs: number
  ) {
    setInterval(() => this.cleanup(), 600_000).unref?.();
  }

  check(identifier: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry || now > entry.resetTime) {
      this.requests.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return { allowed: true };
    }
    if (entry.count < this.maxRequests) {
      entry.count++;
      return { allowed: true };
    }
    return { allowed: false, retryAfter: Math.ceil((entry.resetTime - now) / 1000) };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.requests) if (now > entry.resetTime) this.requests.delete(key);
  }
}

// Contact form: 3 per hour per IP by default
export const rateLimiter = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "3"),
  parseInt(process.env.RATE_LIMIT_WINDOW_MS || "3600000")
);

// Chat widget: 30 messages per hour per IP
export const chatLimiter = new RateLimiter(30, 3_600_000);
