import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
