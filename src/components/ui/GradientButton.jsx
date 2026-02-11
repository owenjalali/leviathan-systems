import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

const gradientButtonVariants = cva(
  'gradient-button inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
  {
    variants: {
      variant: {
        default: '',
        secondary:
          'bg-transparent text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--border-hover)]',
      },
      size: {
        default: 'px-8 py-3.5 text-[0.9375rem] rounded-xl',
        sm: 'px-5 py-2.5 text-sm rounded-lg',
        lg: 'px-10 py-4 text-base rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const GradientButton = forwardRef(
  ({ className, variant, size, asChild = false, to, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(gradientButtonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    if (to) {
      return (
        <Link
          to={to}
          className={cn(gradientButtonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          <span className="gradient-button-text">{children}</span>
        </Link>
      )
    }

    return (
      <button
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="gradient-button-text">{children}</span>
      </button>
    )
  }
)

GradientButton.displayName = 'GradientButton'
export { GradientButton, gradientButtonVariants }
export default GradientButton
