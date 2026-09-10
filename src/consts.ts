import { SITE_URL } from '@/site.config'
import type { NavLink, Site, SocialLink, TechnologyGroups } from '@/types'

export const SITE: Site = {
  title: 'Mekkiou Adam',
  shortTitle: 'Adam',
  role: 'Développeur IA',
  description:
    "Je suis un jeune <em>Développeur Informatique</em> avec une passion pour la conception d'applications innovantes. J'ai de l'expérience dans la <em>Data Science</em>, l'<em>IA</em> et le <em>Machine Learning</em>. Je suis un passionné de la technologie et de la programmation.",
  descriptionPlain:
    "Développeur Informatique passionné par la conception d'applications innovantes, avec de l'expérience en Data Science, en IA et en Machine Learning.",
  href: SITE_URL,
  author: 'Mekkiou Adam',
  locale: 'fr_FR',
  lang: 'fr',
  location: 'Île-de-France, France',
  email: 'adam.mekkiou@outlook.fr',
}

/** Rotating job titles in the hero. */
export const ROLES: string[] = [
  'Développeur IA',
  'Data Scientist',
  'Ingénieur Automatisation',
  'Développeur Full Stack',
]

export const NAV_LINKS: NavLink[] = [
  { href: '/#accueil', label: 'accueil', sectionId: 'accueil' },
  { href: '/#expertise', label: 'expertise', sectionId: 'expertise' },
  { href: '/#parcours', label: 'parcours', sectionId: 'parcours' },
  { href: '/projects', label: 'projets' },
  { href: '/#contact', label: 'contact', sectionId: 'contact' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://www.linkedin.com/in/mekkiou-a-b64021262/',
    label: 'LinkedIn',
    handle: 'mekkiou-adam',
  },
  {
    href: 'https://github.com/Adammm75',
    label: 'GitHub',
    handle: '@Adammm75',
  },
  {
    href: `mailto:${SITE.email}`,
    label: 'Email',
    handle: SITE.email,
  },
  {
    href: '/rss.xml',
    label: 'RSS',
    handle: 'Flux des projets',
  },
]

/** Downloadable documents, served from /public/static. */
export const DOCUMENTS = {
  cv: {
    href: '/static/CV_Mekkiou_Adam_M1.pdf',
    label: 'Télécharger mon CV',
    fileName: 'CV_Mekkiou_Adam_M1.pdf',
  },
  recommendations: {
    href: '/static/Lettres_Recommandation_Mekkiou_Adam.pdf',
    label: 'Lettres de recommandation',
    fileName: 'Lettres_Recommandation_Mekkiou_Adam.pdf',
  },
} as const

/** Headline figures shown under the hero. */
export const FACTS: { value: string; label: string }[] = [
  { value: '2 ans', label: "d'alternance en entreprise" },
  { value: 'Master', label: 'MIAGE — SI & données' },
  { value: 'IA / RPA', label: 'LLM, RAG, automatisation' },
  { value: 'Île-de-France', label: 'disponible sur site & remote' },
]

export const EXPERTISE_AREAS: string[] = [
  "Développement d'applications IA",
  'Systèmes RAG (Retrieval-Augmented Generation)',
  'Fine-tuning de modèles LLM',
  'Chatbots et assistants virtuels',
  'Formation et sensibilisation à l’IA',
]

/**
 * Technologies actually used across the experiences and projects listed on
 * this site — grouped for the marquee.
 */
export const technologies: TechnologyGroups = {
  Langages: [
    { text: 'Python', logo: 'si:python' },
    { text: 'JavaScript', logo: 'si:javascript' },
    { text: 'TypeScript', logo: 'si:typescript' },
    { text: 'Java', logo: 'si:openjdk' },
    { text: 'SQL', logo: 'lucide:database' },
    { text: 'PHP', logo: 'si:php' },
    { text: 'HTML', logo: 'si:html5' },
    { text: 'CSS', logo: 'si:css3' },
  ],
  'IA & Data Science': [
    { text: 'TensorFlow', logo: 'si:tensorflow' },
    { text: 'PyTorch', logo: 'si:pytorch' },
    { text: 'Scikit-learn', logo: 'si:scikitlearn' },
    { text: 'Pandas', logo: 'si:pandas' },
    { text: 'NumPy', logo: 'si:numpy' },
    { text: 'OpenAI API', logo: 'si:openai' },
    { text: 'LangChain', logo: 'si:langchain' },
    { text: 'Jupyter', logo: 'si:jupyter' },
  ],
  'Web & Frameworks': [
    { text: 'React', logo: 'si:react' },
    { text: 'Astro', logo: 'si:astro' },
    { text: 'Tailwind CSS', logo: 'si:tailwindcss' },
    { text: 'Node.js', logo: 'si:nodejs' },
    { text: 'Spring Boot', logo: 'si:springboot' },
    { text: 'JavaFX', logo: 'lucide:app-window' },
    { text: 'WordPress', logo: 'si:wordpress' },
  ],
  'Automatisation & BI': [
    { text: 'n8n', logo: 'si:n8n' },
    { text: 'Make', logo: 'si:make' },
    { text: 'Power Automate', logo: 'lucide:workflow' },
    { text: 'Power BI', logo: 'lucide:bar-chart-3' },
    { text: 'Selenium', logo: 'si:selenium' },
    { text: 'REST APIs', logo: 'lucide:webhook' },
  ],
  'Données & Outils': [
    { text: 'MySQL', logo: 'si:mysql' },
    { text: 'PostgreSQL', logo: 'si:postgresql' },
    { text: 'MongoDB', logo: 'si:mongodb' },
    { text: 'Git', logo: 'si:git' },
    { text: 'GitHub', logo: 'si:github' },
    { text: 'Docker', logo: 'si:docker' },
    { text: 'Postman', logo: 'si:postman' },
    { text: 'Jira', logo: 'si:jira' },
    { text: 'Linux', logo: 'si:linux' },
  ],
}
