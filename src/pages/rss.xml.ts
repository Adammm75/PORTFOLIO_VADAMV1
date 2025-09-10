import { SITE } from '@/consts'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getAllProjects } from '@/lib/data-utils'

export async function GET(context: APIContext) {
  try {
    const projects = await getAllProjects()

    return rss({
      title: SITE.title,
      description: SITE.description,
      site: context.site ?? SITE.href,
      items: projects.map((project) => ({
        title: project.data.name,
        description: project.data.description,
        pubDate: project.data.startDate ?? new Date(),
        link: `/projects/${project.id}/`,
      })),
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
