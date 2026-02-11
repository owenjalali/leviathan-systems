import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/**
 * BackgroundPaths — Dense animated SVG paths for hero background.
 * 36 algorithmically generated curves in two mirrored groups.
 * Rebuilt from 21st.dev Background Paths reference using GSAP.
 */

function generatePaths(position) {
    return Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
        opacity: Math.min(0.1 + i * 0.015, 0.4),
    }))
}

function FloatingPaths({ position, groupRef }) {
    const paths = generatePaths(position)

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                ref={groupRef}
                className="w-full h-full text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <path
                        key={path.id}
                        className="floating-path"
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={path.opacity}
                        fill="none"
                    />
                ))}
            </svg>
        </div>
    )
}

export default function BackgroundPaths({ className = '' }) {
    const containerRef = useRef(null)
    const group1Ref = useRef(null)
    const group2Ref = useRef(null)

    useGSAP(() => {
        const animateGroup = (svgEl) => {
            if (!svgEl) return
            const paths = svgEl.querySelectorAll('.floating-path')

            paths.forEach((path, i) => {
                const length = path.getTotalLength()

                // Start partially drawn, subtle
                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length * 0.7,
                    opacity: 0,
                })

                // Fade in gently
                gsap.to(path, {
                    opacity: 0.6,
                    duration: 2 + i * 0.1,
                    delay: i * 0.05,
                    ease: 'power2.out',
                })

                // Flowing animation — path draws and redraws continuously
                gsap.to(path, {
                    strokeDashoffset: -length,
                    duration: 20 + Math.random() * 10,
                    repeat: -1,
                    ease: 'linear',
                    delay: Math.random() * 5,
                })

                // Subtle opacity pulse matching reference range
                gsap.to(path, {
                    opacity: 0.3,
                    duration: 8 + Math.random() * 4,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: Math.random() * 3,
                })
            })
        }

        animateGroup(group1Ref.current)
        animateGroup(group2Ref.current)
    }, { scope: containerRef })

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        >
            <FloatingPaths position={1} groupRef={group1Ref} />
            <FloatingPaths position={-1} groupRef={group2Ref} />
        </div>
    )
}
