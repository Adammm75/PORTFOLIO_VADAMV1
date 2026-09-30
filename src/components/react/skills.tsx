import { technologies } from '@/consts'
import type { Technology } from '@/types'
import { cn } from '@/lib/utils'
import { AppWindow, BarChart3, Database, Workflow, Webhook } from 'lucide-react'
import type { IconType } from 'react-icons'
import { FiCode } from 'react-icons/fi'
import {
  SiAstro,
  SiCss3,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiJupyter,
  SiLangchain,
  SiLinux,
  SiMake,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiNodedotjs,
  SiNumpy,
  SiOpenai,
  SiOpenjdk,
  SiPandas,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiSelenium,
  SiSpringboot,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiWordpress,
} from 'react-icons/si'

type IconComponent = IconType | React.ComponentType<{ className?: string }>

/** logo key → icon component. Keys live in `consts.ts`. */
const ICONS: Record<string, IconComponent> = {
  'si:python': SiPython,
  'si:javascript': SiJavascript,
  'si:typescript': SiTypescript,
  'si:openjdk': SiOpenjdk,
  'si:php': SiPhp,
  'si:html5': SiHtml5,
  'si:css3': SiCss3,
  'si:tensorflow': SiTensorflow,
  'si:pytorch': SiPytorch,
  'si:scikitlearn': SiScikitlearn,
  'si:pandas': SiPandas,
  'si:numpy': SiNumpy,
  'si:openai': SiOpenai,
  'si:langchain': SiLangchain,
  'si:jupyter': SiJupyter,
  'si:react': SiReact,
  'si:astro': SiAstro,
  'si:tailwindcss': SiTailwindcss,
  'si:nodejs': SiNodedotjs,
  'si:springboot': SiSpringboot,
  'si:wordpress': SiWordpress,
  'si:n8n': SiN8N,
  'si:make': SiMake,
  'si:selenium': SiSelenium,
  'si:mysql': SiMysql,
  'si:postgresql': SiPostgresql,
  'si:mongodb': SiMongodb,
  'si:git': SiGit,
  'si:github': SiGithub,
  'si:docker': SiDocker,
  'si:postman': SiPostman,
  'si:jira': SiJira,
  'si:linux': SiLinux,
  'lucide:database': Database,
  'lucide:app-window': AppWindow,
  'lucide:workflow': Workflow,
  'lucide:bar-chart-3': BarChart3,
  'lucide:webhook': Webhook,
}

/** Brand tint revealed on hover — the badges are monochrome at rest. */
const TINTS: Record<string, string> = {
  Python: '#3776AB',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Java: '#EA2D2E',
  SQL: '#00758F',
  PHP: '#777BB4',
  HTML: '#E34F26',
  CSS: '#1572B6',
  TensorFlow: '#FF6F00',
  PyTorch: '#EE4C2C',
  'Scikit-learn': '#F7931E',
  Pandas: '#907FBF',
  NumPy: '#4DABCF',
  'OpenAI API': '#10A37F',
  LangChain: '#1C3C3C',
  Jupyter: '#F37626',
  React: '#61DAFB',
  Astro: '#FF5D01',
  'Tailwind CSS': '#38BDF8',
  'Node.js': '#5FA04E',
  'Spring Boot': '#6DB33F',
  JavaFX: '#E76F00',
  WordPress: '#21759B',
  n8n: '#EA4B71',
  Make: '#6D00CC',
  'Power Automate': '#0066FF',
  'Power BI': '#F2C811',
  Selenium: '#43B02A',
  'REST APIs': '#8A63D2',
  MySQL: '#4479A1',
  PostgreSQL: '#4169E1',
  MongoDB: '#47A248',
  Git: '#F05032',
  GitHub: '#8B949E',
  Docker: '#2496ED',
  Postman: '#FF6C37',
  Jira: '#0052CC',
  Linux: '#FCC624',
}

function Badge({ tech }: { tech: Technology }) {
  const Icon = ICONS[tech.logo] ?? FiCode
  const tint = TINTS[tech.text] ?? 'var(--primary)'

  return (
    <li
      style={{ '--tint': tint } as React.CSSProperties}
      className={cn(
        'group border-border bg-card/50 mx-2 flex shrink-0 items-center gap-3 rounded-full border px-5 py-3 backdrop-blur-sm',
        'transition-all duration-500 hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--tint)_55%,transparent)]',
      )}
    >
      <Icon className="text-muted-foreground size-5 transition-colors duration-500 group-hover:text-[var(--tint)]" />
      <span className="text-foreground/80 group-hover:text-foreground text-sm font-medium whitespace-nowrap transition-colors duration-500">
        {tech.text}
      </span>
    </li>
  )
}

function Row({
  items,
  duration,
  reverse,
}: {
  items: Technology[]
  duration: number
  reverse?: boolean
}) {
  // The track is two identical halves and slides by exactly -50%, so the loop
  // is seamless. Short rows are padded first, otherwise a gap appears on wide
  // screens before the second half arrives.
  const half: Technology[] = []
  while (half.length < 14 && items.length > 0) half.push(...items)

  return (
    <div className="marquee-track relative flex overflow-hidden py-2">
      <ul
        className="animate-marquee flex w-max"
        style={
          {
            '--marquee-duration': `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {[...half, ...half].map((tech, index) => (
          <Badge key={`${tech.text}-${index}`} tech={tech} />
        ))}
      </ul>
    </div>
  )
}

/**
 * Three counter-scrolling rows of the stack. Pure CSS animation so it stays
 * smooth, pauses on hover, and stops entirely under reduced motion.
 */
export default function Skills() {
  const groups = Object.values(technologies)
  const rows: Technology[][] = [
    [...(groups[0] ?? []), ...(groups[3] ?? [])],
    [...(groups[1] ?? []), ...(groups[4] ?? [])],
    [...(groups[2] ?? [])],
  ]

  return (
    <div
      className="relative"
      style={{
        maskImage:
          'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <Row items={rows[0]} duration={52} />
      <Row items={rows[1]} duration={64} reverse />
      <Row items={rows[2]} duration={58} />
    </div>
  )
}
