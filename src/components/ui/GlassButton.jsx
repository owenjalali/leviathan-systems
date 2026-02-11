import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const sizeMap = {
  sm: 'px-5 py-2.5 text-sm',
  default: 'px-8 py-3.5 text-[0.9375rem]',
  lg: 'px-10 py-4 text-base',
}

const GlassButton = forwardRef(
  ({ className, size = 'default', children, to, href, ...props }, ref) => {
    const classes = cn(
      'group relative inline-flex items-center justify-center gap-2 rounded-xl font-medium',
      'bg-white/[0.05] backdrop-blur-md',
      'border border-white/[0.08]',
      'text-white',
      'shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]',
      'transition-all duration-300 ease-out',
      'hover:bg-white/[0.08] hover:border-white/[0.14] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]',
      'active:scale-[0.98] active:bg-white/[0.03]',
      sizeMap[size] || sizeMap.default,
      className,
    )

    if (to) {
      return (
        <Link to={to} className={classes} ref={ref} {...props}>
          {children}
        </Link>
      )
    }

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref}
          {...props}
        >
          {children}
        </a>
      )
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)

GlassButton.displayName = 'GlassButton'
export { GlassButton }
export default GlassButton
