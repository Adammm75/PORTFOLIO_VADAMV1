export type Site = {
  title: string
  shortTitle: string
  role: string
  description: string
  /** Plain-text version of `description`, safe for meta tags. */
  descriptionPlain: string
  href: string
  author: string
  locale: string
  lang: string
  location: string
  email: string
}

export type NavLink = {
  href: string
  label: string
  /** Id of the homepage section this link scrolls to, when it has one. */
  sectionId?: string
}

export type SocialLink = {
  href: string
  label: string
  handle?: string
}

export type Technology = {
  text: string
  logo: string
}

export type TechnologyGroups = Record<string, Technology[]>
