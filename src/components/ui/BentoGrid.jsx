import { cn } from '@/lib/utils'

/**
 * BentoGrid — Feature grid with tags and status indicators.
 * Adapts kokonutd-style bento grid to Leviathan dark theme.
 */
export function BentoGrid({ children, className }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  title,
  description,
  icon,
  tags = [],
  status,
  className,
  children,
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-[0_0_30px_rgba(20,184,166,0.06)]',
        className
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        {/* Header row: icon + status */}
        <div className="flex items-start justify-between mb-4">
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-glow)] text-[var(--accent)]">
              {icon}
            </div>
          )}
          {status && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-glow)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              {status}
            </span>
          )}
        </div>

        {/* Title + description */}
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          {title}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Optional children for custom content */}
        {children}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--border)] bg-[var(--glass)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
