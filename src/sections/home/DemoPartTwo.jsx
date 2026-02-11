import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import NodeGraph from '../../components/ui/NodeGraph'
import { systemNodes } from '../../content/demo-data'
import { demoParts } from '../../content/home'

gsap.registerPlugin(ScrollTrigger)

/**
 * DemoPartTwo — System Logic visualization
 * Shows the node graph with animated connections drawing on viewport entry.
 * Nodes glow as connections reach them.
 */

export default function DemoPartTwo() {
    const containerRef = useRef(null)
    const tlRef = useRef()

    // Define connections based on systemNodes flow
    const connections = [
        { from: 'new-lead', to: 'qualify' },
        { from: 'qualify', to: 'route' },
        { from: 'route', to: 'book-apt' },
        { from: 'route', to: 'send-quote' },
        { from: 'book-apt', to: 'follow-up-left' },
        { from: 'send-quote', to: 'follow-up-right' },
        { from: 'follow-up-left', to: 'confirm' },
        { from: 'follow-up-right', to: 'confirm' },
        { from: 'confirm', to: 'review' },
    ]

    const part = demoParts[1] // Part II

    useGSAP(
        () => {
            const mm = gsap.matchMedia()

            // Full animation for users with no motion preference
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                tlRef.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                })

                const nodes = containerRef.current?.querySelectorAll('.node-group')
                const paths = containerRef.current?.querySelectorAll('.connection-path')

                if (!nodes?.length || !paths?.length) return

                // Step 1: Fade in nodes with stagger based on level order
                tlRef.current.to(
                    nodes,
                    {
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power2.out',
                    },
                    0
                )

                // Step 2: Animate connection paths with stroke-dashoffset
                paths.forEach((path, i) => {
                    // CRITICAL: Null-check before getTotalLength()
                    if (!path) return

                    const length = path.getTotalLength()

                    // Set up: path invisible, fully offset
                    gsap.set(path, {
                        strokeDasharray: length,
                        strokeDashoffset: length,
                        opacity: 1,
                    })

                    // Animate: draw the line
                    tlRef.current.to(
                        path,
                        {
                            strokeDashoffset: 0,
                            duration: 0.8,
                            ease: 'power2.inOut',
                        },
                        0.8 + i * 0.25 // Stagger by 0.25s after nodes appear
                    )

                    // Step 3: Add subtle glow as connection completes
                    tlRef.current.to(
                        path,
                        {
                            filter: 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.6))',
                            duration: 0.3,
                            ease: 'power2.out',
                        },
                        0.8 + i * 0.25 + 0.6 // Near end of draw animation
                    )

                    // Fade glow after 0.5s
                    tlRef.current.to(
                        path,
                        {
                            filter: 'drop-shadow(0 0 0px rgba(212, 175, 55, 0))',
                            duration: 0.4,
                            ease: 'power2.in',
                        },
                        0.8 + i * 0.25 + 0.9
                    )
                })
            })

            // Simplified for reduced motion users
            mm.add('(prefers-reduced-motion: reduce)', () => {
                tlRef.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                })

                const nodes = containerRef.current?.querySelectorAll('.node-group')
                const paths = containerRef.current?.querySelectorAll('.connection-path')

                // Just fade everything in
                tlRef.current.to([nodes, paths], {
                    opacity: 1,
                    duration: 0.3,
                })
            })
        },
        { scope: containerRef }
    )

    return (
        <section
            ref={containerRef}
            className="relative py-20 md:py-28 bg-[var(--bg-primary)]"
        >
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase border border-[var(--border)] rounded-full text-[var(--text-secondary)]">
                        Part {part.part}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
                        {part.title}
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)]">
                        {part.description}
                    </p>
                </div>

                {/* Node graph */}
                <div className="flex justify-center">
                    <NodeGraph nodes={systemNodes} connections={connections} />
                </div>
            </div>
        </section>
    )
}
