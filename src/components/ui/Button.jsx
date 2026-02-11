import { Link } from 'react-router-dom'

/**
 * Button — Two variants: primary (solid accent) and secondary (ghost).
 * Shimmer variant reserved for final CTA crescendo.
 */
export default function Button({
    children,
    to,
    href,
    variant = 'primary',
    shimmer = false,
    className = '',
    ...props
}) {
    const base =
        'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'

    const variants = {
        primary:
            'bg-[var(--accent)] text-[var(--bg-primary)] rounded-[10px] px-6 py-3 text-[0.9375rem] hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]',
        secondary:
            'bg-transparent text-[var(--text-primary)] border border-[var(--border)] rounded-[10px] px-6 py-3 text-[0.9375rem] hover:border-[var(--border-hover)] hover:bg-[var(--glass)] active:scale-[0.98]',
    }

    const shimmerStyles = shimmer
        ? 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700'
        : ''

    const classes = `${base} ${variants[variant]} ${shimmerStyles} ${className}`

    // Route link
    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        )
    }

    // External link
    if (href) {
        return (
            <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
            </a>
        )
    }

    // Button
    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}
