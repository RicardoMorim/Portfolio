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
    return 'AI Agent (Recruitment Bot)';
  }
  
  if (ua.includes('postman') || ua.includes('curl') || ua.includes('httpie')) {
    return 'API Client';
  }
  
  if (ua.includes('chrome') || ua.includes('firefox') || ua.includes('safari')) {
    return 'Chrome/Browser';
  }
  
  return 'Other';
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const metric = searchParams.get('metric') || 'info';

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, s-maxage=300', // 5 minutes cache
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers });
  }

  const now = new Date().toISOString();
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || 'direct';
  const agentCategory = categorizeUserAgent(userAgent);

  const startTime = performance.now();

  // Log this analytics request
  console.log(`${LOG_PREFIXES.ENDPOINT_HIT} /api/analytics | IP: ${clientIP} | Agent: ${agentCategory} | Metric: ${metric} | Referer: ${referer}`);
  console.log(`${LOG_PREFIXES.USER_AGENT} ${userAgent}`);
  console.log(`${LOG_PREFIXES.REFERRER} ${referer}`);

  let response: any = {};

  switch (metric) {
    case 'info':
    case 'summary':
      response = {
        message: 'Analytics logging active - check Vercel logs for usage patterns',
        info: {
          logging_enabled: true,
          log_prefixes: Object.values(LOG_PREFIXES),
          current_request: {
            timestamp: now,
            ip: clientIP,
            user_agent_category: agentCategory,
            referrer: referer
          }
        },
        instructions: {
          endpoint_hits: `Look for ${LOG_PREFIXES.ENDPOINT_HIT} in logs`,
          search_queries: `Look for ${LOG_PREFIXES.SEARCH_QUERY} in logs`,
          user_agents: `Look for ${LOG_PREFIXES.USER_AGENT} in logs`,
          performance: `Look for ${LOG_PREFIXES.PERFORMANCE} in logs`
        }
      };
      break;

    case 'test':
      // Generate test log entries
      console.log(`${LOG_PREFIXES.INFO} Test log entry - Analytics system working`);
      console.log(`${LOG_PREFIXES.ENDPOINT_HIT} /api/test | IP: ${clientIP} | Agent: ${agentCategory}`);
      console.log(`${LOG_PREFIXES.SEARCH_QUERY} test-query | Category: all | Results: 5`);
      
      response = {
        test_complete: true,
        message: 'Test log entries generated - check Vercel logs',
        timestamp: now
      };
      break;

    default:
      response = {
        error: 'Invalid metric parameter',
        available_metrics: ['info', 'summary', 'test'],
        usage: 'GET /api/analytics?metric=info',
        logging_info: 'This endpoint now logs analytics data to Vercel logs with specific prefixes'
      };
      break;
  }

  const endTime = performance.now();
  const responseTime = Math.round((endTime - startTime) * 100) / 100;

  // Log performance
  console.log(`${LOG_PREFIXES.PERFORMANCE} /api/analytics | Response time: ${responseTime}ms | Metric: ${metric}`);

  response.meta = {
    metric,
    generated_at: now,
    response_time_ms: responseTime,
    logging_enabled: true
  };

  return NextResponse.json(response, { headers });
}

export async function POST(request: NextRequest) {
  // Track custom analytics events via logging
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    const { event_type, endpoint, query, response_time, metadata } = body;

    const now = new Date().toISOString();
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || 'direct';
    const agentCategory = categorizeUserAgent(userAgent);

    // Log different event types with specific prefixes
    if (event_type === 'endpoint_hit' && endpoint) {
      console.log(`${LOG_PREFIXES.ENDPOINT_HIT} ${endpoint} | IP: ${clientIP} | Agent: ${agentCategory} | Response: ${response_time}ms | Referer: ${referer}`);
      
      if (response_time) {
        console.log(`${LOG_PREFIXES.PERFORMANCE} ${endpoint} | ${response_time}ms | Agent: ${agentCategory}`);
      }
    }

    if (event_type === 'search' && query) {
      console.log(`${LOG_PREFIXES.SEARCH_QUERY} "${query}" | Category: ${metadata?.category || 'all'} | IP: ${clientIP} | Agent: ${agentCategory}`);
    }

    // Always log user agent and referrer for pattern analysis
    console.log(`${LOG_PREFIXES.USER_AGENT} ${userAgent}`);
    console.log(`${LOG_PREFIXES.REFERRER} ${referer}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Analytics event logged to Vercel logs',
      event: { event_type, endpoint, query, timestamp: now },
      logged_with_prefix: event_type === 'endpoint_hit' ? LOG_PREFIXES.ENDPOINT_HIT : 
                         event_type === 'search' ? LOG_PREFIXES.SEARCH_QUERY : 
                         LOG_PREFIXES.INFO
    }, { headers });

  } catch (error) {
    console.log(`${LOG_PREFIXES.ERROR} Invalid analytics POST request | IP: ${getClientIP(request)} | Error: ${error}`);
    
    return NextResponse.json(
      { 
        error: 'Invalid request body', 
        expected: { event_type: 'string', endpoint: 'string', query: 'string', response_time: 'number' },
        logged_error: true
      },
      { status: 400, headers }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}