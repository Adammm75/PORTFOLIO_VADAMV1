import { cn } from '@/lib/utils'

/**
 * Monogram mark — an "MA" cut out of a signal-coloured tile. Used in the nav,
 * the footer and the favicon-adjacent surfaces.
 */
function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'group/logo relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-[0.7rem]',
        'bg-foreground text-background transition-colors duration-500',
        'group-hover:bg-primary group-hover:text-primary-foreground',
        className,
      )}
      aria-hidden="true"
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, var(--primary), var(--plasma) 120%)',
        }}
      />
      <svg
        viewBox="0 0 32 32"
        className="relative size-full"
        fill="none"
        role="presentation"
      >
        <path
          d="M6 23V9.6L11.7 18.4L17.4 9.6V23"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M19.6 23L23.8 9.6L28 23M20.9 19.1H26.7"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default Logo
