import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";
import { rateLimiter } from "@/lib/rate-limiter";

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting (IP-based)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = rateLimiter.check(ip);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimitResult.retryAfter),
            "X-RateLimit-Limit": String(process.env.RATE_LIMIT_MAX_REQUESTS || "3"),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // 3. Additional security: Basic spam detection
    const suspiciousPatterns = [
      /\b(viagra|cialis|casino|lottery)\b/i,
      /<script>/i,
      /\[url=/i,
    ];

    const allText = `${validatedData.name} ${validatedData.email} ${validatedData.subject} ${validatedData.message}`;
    if (suspiciousPatterns.some((pattern) => pattern.test(allText))) {
      console.warn("Suspicious content detected from IP:", ip);
      return NextResponse.json(
        { error: "Message content flagged as suspicious." },
        { status: 400 }
      );
    }

    // 4. Send email
    await sendContactEmail(validatedData);

    // 5. Success response
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Handle Zod validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data. Please check your inputs." },
        { status: 400 }
      );
    }

    // Generic error response (don't expose internal errors)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// Explicitly disable other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
