import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex' }];
    const agentLinks = [
      { key: 'Vary', value: 'Accept' },
      {
        key: 'Link',
        value: [
          '</llms.txt>; rel="describedby"; type="text/plain"',
          '</llms-full.txt>; rel="alternate"; type="text/markdown"',
          '</api/openapi>; rel="service-desc"; type="application/json"',
          '</api/docs>; rel="service-doc"; type="application/json"',
          '</.well-known/api-catalog>; rel="api-catalog"',
        ].join(', '),
      },
    ];
    return [
      { source: '/api/:path*', headers: noindex },
      { source: '/well-known/:path*', headers: noindex },
      { source: '/.well-known/:path*', headers: noindex },
      { source: '/', headers: agentLinks },
      { source: '/pt', headers: agentLinks },
    ];
  },
  images: {
    domains: ['www.inesctec.pt', 'artefacto.artech-international.org'],
    // Allow loading images over http/https from external hosts used in recommendations
    remotePatterns: [
      { protocol: 'https', hostname: 'artefacto.artech-international.org', pathname: '/**' },
      { protocol: 'http', hostname: 'artefacto.artech-international.org', pathname: '/**' },
      { protocol: 'https', hostname: 'www.inesctec.pt', pathname: '/**' },
      { protocol: 'http', hostname: 'www.inesctec.pt', pathname: '/**' },
    ],
  }

  /* config options here */
};

export default nextConfig;
