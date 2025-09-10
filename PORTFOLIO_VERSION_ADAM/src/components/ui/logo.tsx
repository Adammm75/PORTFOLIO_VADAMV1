import { cn } from "@/lib/utils"

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn(
      "relative group aspect-square",
      className
    )}>

      <div className="relative rounded-full overflow-hidden shadow-xl h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-100/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
        <img
          src="/static/profile.jpg"
          alt="Mekkiou Adam"
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
      </div>
    </div>
  )
}

export default Logo
