import { cn } from '@/lib/utils'

/**
 * FeatureCard — Card with grid-pattern overlay on hover.
 * Dark theme, teal accent, grid-dot pattern background.
 */
export default function FeatureCard({
  title,
  description,
  icon,
  className,
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]',
        className
      )}
    >
      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(20,184,166,0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Accent glow on hover */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[var(--accent)] opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-[0.07]" />

      <div className="relative z-10">
        {icon && (
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-glow)] text-[var(--accent)]">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
          {title}
        </h3>
        <p className="text-[var(--text-secondary)] leading-relaxed text-[0.9375rem]">
          {description}
        </p>
      </div>
    </div>
  )
}
