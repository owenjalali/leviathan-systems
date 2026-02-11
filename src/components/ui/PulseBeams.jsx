import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const defaultBeams = [
  // From top-left
  {
    path: 'M0 50 C120 80 280 160 429 217',
    gradientConfig: {
      initial: { x1: '0%', x2: '5%', y1: '0%', y2: '5%' },
      animate: {
        x1: ['0%', '100%', '100%'],
        x2: ['5%', '100%', '100%'],
        y1: ['0%', '100%', '100%'],
        y2: ['5%', '100%', '100%'],
      },
      transition: { duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 0 },
    },
    connectionPoints: [{ cx: 0, cy: 50, r: 3 }],
  },
  // From left
  {
    path: 'M0 280 C140 270 300 240 429 217',
    gradientConfig: {
      initial: { x1: '0%', x2: '5%', y1: '60%', y2: '65%' },
      animate: {
        x1: ['0%', '100%', '100%'],
        x2: ['5%', '100%', '100%'],
        y1: ['60%', '50%', '50%'],
        y2: ['65%', '50%', '50%'],
      },
      transition: { duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 1, delay: 1 },
    },
    connectionPoints: [{ cx: 0, cy: 280, r: 3 }],
  },
  // From top
  {
    path: 'M350 0 C360 60 400 150 429 217',
    gradientConfig: {
      initial: { x1: '40%', x2: '42%', y1: '0%', y2: '5%' },
      animate: {
        x1: ['40%', '50%', '50%'],
        x2: ['42%', '50%', '50%'],
        y1: ['0%', '100%', '100%'],
        y2: ['5%', '100%', '100%'],
      },
      transition: { duration: 3.5, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 1.5, delay: 0.5 },
    },
    connectionPoints: [{ cx: 350, cy: 0, r: 3 }],
  },
  // From top-right
  {
    path: 'M858 30 C700 60 560 150 429 217',
    gradientConfig: {
      initial: { x1: '100%', x2: '95%', y1: '0%', y2: '5%' },
      animate: {
        x1: ['100%', '0%', '0%'],
        x2: ['95%', '0%', '0%'],
        y1: ['0%', '100%', '100%'],
        y2: ['5%', '100%', '100%'],
      },
      transition: { duration: 4.2, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 0.8 },
    },
    connectionPoints: [{ cx: 858, cy: 30, r: 3 }],
  },
  // From right
  {
    path: 'M858 300 C720 290 560 250 429 217',
    gradientConfig: {
      initial: { x1: '100%', x2: '95%', y1: '70%', y2: '68%' },
      animate: {
        x1: ['100%', '0%', '0%'],
        x2: ['95%', '0%', '0%'],
        y1: ['70%', '50%', '50%'],
        y2: ['68%', '50%', '50%'],
      },
      transition: { duration: 3.8, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 1.8, delay: 1.5 },
    },
    connectionPoints: [{ cx: 858, cy: 300, r: 3 }],
  },
  // From bottom-left
  {
    path: 'M100 434 C180 370 320 280 429 217',
    gradientConfig: {
      initial: { x1: '10%', x2: '15%', y1: '100%', y2: '95%' },
      animate: {
        x1: ['10%', '50%', '50%'],
        x2: ['15%', '50%', '50%'],
        y1: ['100%', '0%', '0%'],
        y2: ['95%', '0%', '0%'],
      },
      transition: { duration: 4.5, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2.5, delay: 2 },
    },
    connectionPoints: [{ cx: 100, cy: 434, r: 3 }],
  },
  // From bottom
  {
    path: 'M500 434 C490 370 460 280 429 217',
    gradientConfig: {
      initial: { x1: '58%', x2: '56%', y1: '100%', y2: '95%' },
      animate: {
        x1: ['58%', '50%', '50%'],
        x2: ['56%', '50%', '50%'],
        y1: ['100%', '0%', '0%'],
        y2: ['95%', '0%', '0%'],
      },
      transition: { duration: 3.2, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 1.2, delay: 0.3 },
    },
    connectionPoints: [{ cx: 500, cy: 434, r: 3 }],
  },
  // From bottom-right
  {
    path: 'M780 434 C700 370 550 270 429 217',
    gradientConfig: {
      initial: { x1: '90%', x2: '85%', y1: '100%', y2: '95%' },
      animate: {
        x1: ['90%', '50%', '50%'],
        x2: ['85%', '50%', '50%'],
        y1: ['100%', '0%', '0%'],
        y2: ['95%', '0%', '0%'],
      },
      transition: { duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 1.5, delay: 1.2 },
    },
    connectionPoints: [{ cx: 780, cy: 434, r: 3 }],
  },
]

function GradientColors({ colors }) {
  const c = colors || {
    start: '#14b8a6',
    middle: '#06b6d4',
    end: '#14b8a6',
  }
  return (
    <>
      <stop offset="0%" stopColor={c.start} stopOpacity="0" />
      <stop offset="20%" stopColor={c.start} stopOpacity="1" />
      <stop offset="50%" stopColor={c.middle} stopOpacity="1" />
      <stop offset="100%" stopColor={c.end} stopOpacity="0" />
    </>
  )
}

function BeamsSVG({ beams, width, height, baseColor, accentColor, gradientColors }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Center convergence node */}
      <circle cx={width / 2} cy={height / 2} r="40" fill="url(#center-glow)" />
      <circle cx={width / 2} cy={height / 2} r="6" fill={accentColor} />
      <circle cx={width / 2} cy={height / 2} r="3" fill="white" opacity="0.6" />

      {beams.map((beam, index) => (
        <g key={index}>
          {/* Static base path */}
          <path d={beam.path} stroke={baseColor} strokeWidth="1" />
          {/* Animated gradient path */}
          <path
            d={beam.path}
            stroke={`url(#pulse-grad-${index})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Connection points at beam origins */}
          {beam.connectionPoints?.map((point, pointIndex) => (
            <circle
              key={pointIndex}
              cx={point.cx}
              cy={point.cy}
              r={point.r}
              fill={baseColor}
              stroke={accentColor}
              strokeWidth="1"
            />
          ))}
        </g>
      ))}

      <defs>
        {beams.map((beam, index) => (
          <motion.linearGradient
            key={index}
            id={`pulse-grad-${index}`}
            gradientUnits="userSpaceOnUse"
            initial={beam.gradientConfig.initial}
            animate={beam.gradientConfig.animate}
            transition={beam.gradientConfig.transition}
          >
            <GradientColors colors={gradientColors} />
          </motion.linearGradient>
        ))}

        <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default function PulseBeams({
  children,
  className,
  beams = defaultBeams,
  width = 858,
  height = 434,
  baseColor = 'rgba(255,255,255,0.06)',
  accentColor = 'rgba(20,184,166,0.4)',
  gradientColors,
}) {
  return (
    <div
      className={cn(
        'relative w-full flex items-center justify-center overflow-hidden',
        className,
      )}
    >
      <div className="absolute inset-0">
        <BeamsSVG
          beams={beams}
          width={width}
          height={height}
          baseColor={baseColor}
          accentColor={accentColor}
          gradientColors={gradientColors}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
