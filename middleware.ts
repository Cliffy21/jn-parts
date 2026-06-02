import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function buildContentSecurityPolicy() {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://api.web3forms.com https://vitals.vercel-insights.com https://*.cloudinary.com https://basemaps.cartocdn.com https://*.cartocdn.com https://tiles.basemaps.cartocdn.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://api.web3forms.com",
    "object-src 'none'",
  ].join("; ");
}

function applySecurityHeaders(response: NextResponse, isProduction: boolean) {
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set("Content-Security-Policy", buildContentSecurityPolicy());

  if (isProduction) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  return response;
}

function isAuthorizedUpload(request: NextRequest) {
  const secret = process.env.UPLOAD_API_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}

export function middleware(request: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";
  const { pathname } = request.nextUrl;

  if (pathname === "/api/upload" && request.method === "POST") {
    if (!isAuthorizedUpload(request)) {
      return applySecurityHeaders(
        NextResponse.json(
          { error: "Unauthorized. Upload requires a valid API secret." },
          { status: 401 }
        ),
        isProduction
      );
    }
  }

  return applySecurityHeaders(NextResponse.next(), isProduction);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
