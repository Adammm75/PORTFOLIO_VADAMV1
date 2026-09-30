import type { ProjectCard } from '@/components/react/projects-grid'
import { getImage } from 'astro:assets'
import { getCollection, type CollectionEntry } from 'astro:content'

export type Project = CollectionEntry<'projects'>

/** All projects, most recent first. */
export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection('projects')
  return projects.sort(
    (a, b) =>
      (b.data.startDate?.valueOf() ?? 0) - (a.data.startDate?.valueOf() ?? 0),
  )
}

/** Every tag used across the collection, in order of first appearance. */
export async function getProjectTags(): Promise<string[]> {
  const projects = await getAllProjects()
  return [...new Set(projects.flatMap((project) => project.data.tags ?? []))]
}

function projectYear(project: Project): string {
  const date = project.data.endDate ?? project.data.startDate
  return date ? String(date.getFullYear()) : 'En cours'
}

/**
 * Serialisable card data for the React grid, with the cover image resized and
 * converted to WebP at build time — the raw sources are multi-megabyte PNGs.
 */
export async function getProjectCards(
  projects: Project[],
): Promise<ProjectCard[]> {
  return Promise.all(
    projects.map(async (project) => {
      const source = project.data.image
      const width = 900
      const height = Math.round((width * source.height) / source.width)

      const optimized = await getImage({
        src: source,
        width,
        format: 'webp',
        quality: 78,
      })

      return {
        id: project.id,
        name: project.data.name,
        description: project.data.description,
        tags: project.data.tags ?? [],
        image: { src: optimized.src, width, height },
        year: projectYear(project),
      }
    }),
  )
}
