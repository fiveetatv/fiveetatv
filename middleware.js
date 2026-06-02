import { NextResponse } from "next/server";

const rateLimitMap = new Map();

function getClientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0] || 
         request.headers.get("x-real-ip") || 
         "unknown";
}

export function rateLimit({ limit = 10, window = 60000 }) {
  return function rateLimitMiddleware(request) {
    const clientIp = getClientIp(request);
    const now = Date.now();
    
    if (!rateLimitMap.has(clientIp)) {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + window });
      return NextResponse.next();
    }
    
    const clientData = rateLimitMap.get(clientIp);
    
    if (now > clientData.resetTime) {
      clientData.count = 1;
      clientData.resetTime = now + window;
      return NextResponse.next();
    }
    
    if (clientData.count >= limit) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
    
    clientData.count++;
    return NextResponse.next();
  };
}

export const config = {
  matcher: [
    "/api/:path*",
  ],
};

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  const publicPaths = ["/api/products", "/api/search"];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  return rateLimit({ limit: 30, window: 60000 })(request);
}