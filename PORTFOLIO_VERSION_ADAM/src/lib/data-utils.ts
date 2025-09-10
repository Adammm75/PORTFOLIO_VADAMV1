import { getCollection, type CollectionEntry } from 'astro:content'

export async function getAllProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects')
  return projects
    .sort((a, b) => (b.data.startDate?.valueOf() ?? 0) - (a.data.startDate?.valueOf() ?? 0))
} 

export async function getProjectsFeaturedTags(maxCount: number): Promise<string[]> {
  const projects = await getAllProjects()
  const tags = new Set<string>()

  for (const project of projects) {
    if (project.data.tags) {
      for (const tag of project.data.tags) {
        tags.add(tag)
      }
    }
    if (tags.size >= maxCount) {
      break
    }
  }

  return Array.from(tags).slice(0, maxCount)
}