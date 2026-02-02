import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/raw/'],
    },
    sitemap: 'https://web-malain-et-possible.vercel.app/sitemap.xml',
  }
}
