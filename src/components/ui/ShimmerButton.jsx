import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const sizeMap = {
  sm: 'px-4 py-2 text-sm',
  default: 'px-6 py-3 text-[0.9375rem]',
  lg: 'px-8 py-3.5 text-base',
}

const ShimmerButton = forwardRef(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '12px',
      background = 'rgba(10, 10, 15, 1)',
      size = 'default',
      className,
      children,
      to,
      href,
      ...props
    },
    ref,
  ) => {
    const style = {
      '--spread': '90deg',
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': background,
    }

    const classes = cn(
      'group relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 font-medium text-white [background:var(--bg)] [border-radius:var(--radius)]',
      'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
      sizeMap[size] || sizeMap.default,
      className,
    )

    const inner = (
      <>
        {/* Spark container */}
        <div
          className={cn(
            '-z-30 blur-[2px]',
            'absolute inset-0 overflow-visible [container-type:size]',
          )}
        >
          {/* Spark */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {children}

        {/* Highlight */}
        <div
          className={cn(
            'insert-0 absolute size-full',
            'rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]',
            'transform-gpu transition-all duration-300 ease-in-out',
            'group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]',
            'group-active:shadow-[inset_0_-10px_10px_#ffffff3f]',
          )}
        />

        {/* Backdrop */}
        <div
          className={cn(
            'absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]',
          )}
        />
      </>
    )

    if (to) {
      return (
        <Link to={to} className={classes} style={style} ref={ref} {...props}>
          {inner}
        </Link>
      )
    }

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          style={style}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref}
          {...props}
        >
          {inner}
        </a>
      )
    }

    return (
      <button className={classes} style={style} ref={ref} {...props}>
        {inner}
      </button>
    )
  },
)

ShimmerButton.displayName = 'ShimmerButton'
export { ShimmerButton }
export default ShimmerButton
