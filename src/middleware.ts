import { NextRequest, NextResponse } from 'next/server';

// Analytics logging prefixes for Vercel logs
const LOG_PREFIXES = {
  ENDPOINT_HIT: '[ANALYTICS_ENDPOINT]',
  SEARCH_QUERY: '[ANALYTICS_SEARCH]',
  USER_AGENT: '[ANALYTICS_AGENT]',
  REFERRER: '[ANALYTICS_REFERRER]',
  PERFORMANCE: '[ANALYTICS_PERF]',
  ERROR: '[ANALYTICS_ERROR]',
  INFO: '[ANALYTICS_INFO]'
} as const;

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

// Helper function to categorize user agents
function categorizeUserAgent(userAgent: string): string {
  if (!userAgent) return 'Unknown';
  
  const ua = userAgent.toLowerCase();
  
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) {
    if (ua.includes('google')) return 'Google Bot';
    if (ua.includes('linkedin')) return 'LinkedIn Career Bot';
    if (ua.includes('recruitment') || ua.includes('talent')) return 'Recruitment Bot';
    return 'AI Agent (Bot)';
  }
  
  if (ua.includes('postman') || ua.includes('curl') || ua.includes('httpie') || ua.includes('insomnia')) {
    return 'API Client';
  }
  
  if (ua.includes('chrome') || ua.includes('firefox') || ua.includes('safari') || ua.includes('edge')) {
    return 'Browser';
  }
  
  return 'Other';
}

export function middleware(request: NextRequest) {
  const startTime = performance.now();
  const { pathname, search } = request.nextUrl;
  
  // Only log API routes (not static assets, images, etc.)
  if (pathname.startsWith('/api/')) {
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || 'direct';
    const agentCategory = categorizeUserAgent(userAgent);
    const method = request.method;
    const fullPath = pathname + search;
    
    // Log the API request
    console.log(`${LOG_PREFIXES.ENDPOINT_HIT} ${method} ${fullPath} | IP: ${clientIP} | Agent: ${agentCategory} | Referer: ${referer}`);
    console.log(`${LOG_PREFIXES.USER_AGENT} ${userAgent}`);
    console.log(`${LOG_PREFIXES.REFERRER} ${referer}`);
    
    // Special logging for search queries
    if (pathname === '/api/search' && search.includes('q=')) {
      const queryParam = new URLSearchParams(search).get('q');
      const category = new URLSearchParams(search).get('category') || 'all';
      if (queryParam) {
        console.log(`${LOG_PREFIXES.SEARCH_QUERY} "${decodeURIComponent(queryParam)}" | Category: ${category} | IP: ${clientIP} | Agent: ${agentCategory}`);
      }
    }
    
    // Create response and log performance
    const response = NextResponse.next();
    
    // Log performance after response (using a promise to not block)
    Promise.resolve().then(() => {
      const endTime = performance.now();
      const responseTime = Math.round((endTime - startTime) * 100) / 100;
      console.log(`${LOG_PREFIXES.PERFORMANCE} ${method} ${pathname} | ${responseTime}ms | Agent: ${agentCategory}`);
    });
    
    return response;
  }
  
  // For non-API routes, just continue without logging
  return NextResponse.next();
}

export const config = {
  // Match all API routes but exclude static files
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};