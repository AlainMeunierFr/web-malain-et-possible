import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* Optimisations de performance */
  compress: true, // Active la compression gzip/brotli
  
  // Optimisation des images
  images: {
    formats: ['image/avif', 'image/webp'], // Formats modernes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Breakpoints responsive
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Tailles d'icônes
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache 30 jours
  },
  
  // Optimisation du build
  reactStrictMode: true,
  poweredByHeader: false, // Retire header X-Powered-By
  
  // Redirections
  async redirects() {
    return [
      {
        source: '/a-propos',
        destination: '/',
        permanent: true, // 301 redirect
      },
      {
        source: '/site-map',
        destination: '/plan-du-site',
        permanent: true, // 301 redirect
      },
      {
        source: '/pour_aller_plus_loin',
        destination: '/pour-aller-plus-loin',
        permanent: true, // 301 redirect (ancien format avec underscore vers nouveau format avec tirets)
      },
    ];
  },
  
  // Headers de sécurité et cache
  async headers() {
    // CSP : autoriser YouTube (embeds), Matomo (analytics), et les ressources locales
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube-nocookie.com https://*.matomo.cloud https://matomo.m-alain-et-possible.fr",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self'",
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
      "connect-src 'self' https://*.matomo.cloud https://matomo.m-alain-et-possible.fr",
      "media-src 'self' https://www.youtube-nocookie.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: cspDirectives
          },
          // HSTS : forcer HTTPS (1 an, includeSubDomains, preload)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
        ],
      },
      {
        // Cache agressif pour les assets statiques
        source: '/api/images/:type/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
