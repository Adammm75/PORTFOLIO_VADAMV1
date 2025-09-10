import { useEffect } from 'react'
import { technologies, type Technologies, type Category } from '../../consts'
import { InfiniteScroll } from '../ui/infinite-scroll'
import { type IconType } from 'react-icons'
import { FaQuestionCircle } from 'react-icons/fa'
import {
  SiHtml5,
  SiJavascript,
  SiCss3,
  SiPhp,
  SiAstro,
  SiTailwindcss,
  SiGit,
  SiDigitalocean,
  SiCloudflare,
  SiNetlify,
  SiUbuntu,
  SiLua,
  SiGo,
  SiNodedotjs,
  SiApache,
  SiNginx,
  SiMysql,
  SiMongodb,
  SiDiscord,
  SiSpotify,
  SiBrave,
} from 'react-icons/si'
import { FileCode, LucideAppWindow, Code } from 'lucide-react'

const iconMap: { [key: string]: IconType } = {
  'mdi:language-html5': SiHtml5,
  'mdi:language-javascript': SiJavascript,
  'mdi:language-css3': SiCss3,
  'mdi:language-php': SiPhp,
  'simple-icons:astro': SiAstro,
  'mdi:tailwind': SiTailwindcss,
  'mdi:git': SiGit,
  'mdi:digital-ocean': SiDigitalocean,
  'cib:cloudflare': SiCloudflare,
  'cib:netlify': SiNetlify,
  'mdi:ubuntu': SiUbuntu,
  'mdi:language-lua': SiLua,
  'mdi:language-go': SiGo,
  'mdi:nodejs': SiNodedotjs,
  'cib:apache': SiApache,
  'cib:nginx': SiNginx,
  'cib:mysql': SiMysql,
  'cib:mongodb': SiMongodb,
  'mdi:discord': SiDiscord,
  'mdi:spotify': SiSpotify,
  'cib:brave': SiBrave,
  'mdi:visual-studio-code': FileCode,
  'mdi:windows': LucideAppWindow,
  'mdi:visual-studio': Code,
}

const iconColors: { [key: string]: string } = {
  'mdi:language-html5': 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]',
  'mdi:language-javascript': 'text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.4)]',
  'mdi:language-css3': 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]',
  'mdi:language-php': 'text-purple-400 drop-shadow-[0_0_8px_rgba(196,181,253,0.4)]',
  'simple-icons:astro': 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]',
  'mdi:tailwind': 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]',
  'mdi:git': 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]',
  'mdi:digital-ocean': 'text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]',
  'cib:cloudflare': 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]',
  'cib:netlify': 'text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]',
  'mdi:ubuntu': 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]',
  'mdi:language-lua': 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]',
  'mdi:language-go': 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]',
  'mdi:nodejs': 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]',
  'cib:apache': 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]',
  'cib:nginx': 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]',
  'cib:mysql': 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]',
  'cib:mongodb': 'text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]',
  'mdi:discord': 'text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]',
  'mdi:spotify': 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]',
  'cib:brave': 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]',
  'mdi:visual-studio-code': 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]',
  'mdi:windows': 'text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]',
  'mdi:visual-studio': 'text-purple-400 drop-shadow-[0_0_8px_rgba(196,181,253,0.4)]',
}

const categories = Object.keys(technologies)
const groupSize = Math.ceil(categories.length / 3)
const categoryGroups = [
  categories.slice(0, groupSize),
  categories.slice(groupSize, groupSize * 2),
  categories.slice(groupSize * 2),
]

const Skills: React.FC = () => {
  useEffect(() => {
    document.querySelectorAll('.tech-badge').forEach((badge) => {
      badge.classList.add('tech-badge-visible')
    })
  }, [])

  return (
    <div className="z-30 mt-16 flex w-full flex-col max-w-[calc(100vw-3rem)] mx-auto lg:max-w-full">
      <div className="space-y-12">
        {categoryGroups.map((group, groupIndex) => (
          <InfiniteScroll
            key={groupIndex}
            duration={60000}
            direction={groupIndex % 2 === 0 ? 'normal' : 'reverse'}
            showFade={true}
            className="flex flex-row justify-center py-4"
          >
            {group.flatMap((category) =>
              technologies[category as keyof Technologies].map(
                (tech: Category, techIndex: number) => {
                  const IconComponent = iconMap[tech.logo] || FaQuestionCircle
                  const iconColor = iconColors[tech.logo] || 'text-primary'
                  return (
                    <div
                      key={`${category}-${techIndex}`}
                                             className="tech-badge repo-card border-gray-700/50 bg-gradient-to-r from-black/95 to-gray-900/95 text-gray-100 mx-4 flex items-center gap-6 rounded-full border-2 p-6 shadow-[0_8px_25px_rgba(0,0,0,0.3),0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_12px_35px_rgba(0,0,0,0.4),0_0_25px_rgba(255,255,255,0.1)] hover:border-yellow-400/60 hover:bg-gradient-to-r hover:from-gray-900/95 hover:to-black/95 hover:scale-110 hover:-translate-y-2"
                      data-tech-name={`${category}-${techIndex}`}
                    >
                                             <span className="bg-gradient-to-br from-gray-800/90 to-black/90 flex h-20 w-20 items-center justify-center rounded-full p-4 text-3xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)] border-2 border-gray-600/50 transition-all duration-500 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90 hover:border-yellow-400/60 hover:shadow-[inset_0_2px_12px_rgba(255,255,255,0.2),0_6px_18px_rgba(0,0,0,0.4)] hover:scale-110">
                        <IconComponent className={`tech-icon ${iconColor}`} />
                      </span>
                                             <span className="text-white font-bold text-xl tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:text-yellow-100 transition-all duration-300">
                         {tech.text}
                       </span>
                    </div>
                  )
                },
              ),
            )}
          </InfiniteScroll>
        ))}
      </div>
    </div>
  )
}

export default Skills
