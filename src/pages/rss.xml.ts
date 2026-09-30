import { SITE } from '@/consts'
import { getAllProjects } from '@/lib/data-utils'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  try {
    const projects = await getAllProjects()

    return rss({
      title: `${SITE.title} — Projets`,
      description: SITE.descriptionPlain,
      site: context.site ?? SITE.href,
      customData: `<language>${SITE.lang}</language>`,
      items: projects.map((project) => ({
        title: project.data.name,
        description: project.data.description,
        pubDate: project.data.startDate ?? new Date(),
        categories: project.data.tags,
        link: `/projects/${project.id}/`,
      })),
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
