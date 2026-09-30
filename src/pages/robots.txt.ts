import { SITE } from '@/consts'
import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ site }) => {
  // `@astrojs/sitemap` emits sitemap-index.xml at the site root.
  const sitemapURL = new URL('sitemap-index.xml', site ?? SITE.href)

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemapURL.href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  )
}
