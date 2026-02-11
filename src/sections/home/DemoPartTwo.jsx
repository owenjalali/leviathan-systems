import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import NodeGraph from '../../components/ui/NodeGraph'
import { systemNodes } from '../../content/demo-data'
import { demoParts } from '../../content/home'

gsap.registerPlugin(ScrollTrigger)

export default function DemoPartTwo() {
    const containerRef = useRef(null)

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

    const part = demoParts[1]

    useGSAP(() => {
        const mm = gsap.matchMedia()

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const nodes = containerRef.current?.querySelectorAll('.node-group')
            const paths = containerRef.current?.querySelectorAll('.connection-path')

            if (!nodes?.length || !paths?.length) return

            // Prepare stroke-dashoffset for each path
            const pathLengths = []
            paths.forEach((path) => {
                if (!path) return
                const length = path.getTotalLength()
                pathLengths.push(length)
                gsap.set(path, { strokeDasharray: length })
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    once: true,
                },
                repeat: -1,
                repeatDelay: 2,
            })

            // Reset at start of each loop
            tl.set(nodes, { opacity: 0 })
            tl.call(() => {
                paths.forEach((path, i) => {
                    if (!path) return
                    gsap.set(path, { strokeDashoffset: pathLengths[i], opacity: 1 })
                })
            })

            // 1. Nodes fade in with stagger
            tl.to(nodes, {
                opacity: 1,
                duration: 0.4,
                stagger: 0.12,
                ease: 'power2.out',
            })

            // 2. Connection paths draw sequentially
            paths.forEach((path, i) => {
                if (!path) return
                tl.to(path, {
                    strokeDashoffset: 0,
                    duration: 0.6,
                    ease: 'power2.inOut',
                }, `-=${i === 0 ? 0 : 0.35}`)

                // Node glow as connection arrives
                tl.to(path, {
                    filter: 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.6))',
                    duration: 0.3,
                    ease: 'power2.out',
                }, '-=0.3')
                tl.to(path, {
                    filter: 'drop-shadow(0 0 0px rgba(212, 175, 55, 0))',
                    duration: 0.5,
                    ease: 'power2.in',
                })
            })

            // 3. Hold completed state
            tl.to({}, { duration: 3 })

            // 4. Fade out before repeat
            tl.to([nodes, paths], {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.in',
            })
        })

        mm.add('(prefers-reduced-motion: reduce)', () => {
            const nodes = containerRef.current?.querySelectorAll('.node-group')
            const paths = containerRef.current?.querySelectorAll('.connection-path')
            gsap.set(nodes, { opacity: 1 })
            if (paths) {
                paths.forEach((path) => {
                    if (!path) return
                    gsap.set(path, { opacity: 1, strokeDashoffset: 0 })
                })
            }
        })
    }, { scope: containerRef })

    return (
        <section
            ref={containerRef}
            className="relative py-20 md:py-28 bg-[var(--bg-primary)]"
        >
            <div className="container mx-auto px-4">
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

                <div className="flex justify-center">
                    <NodeGraph nodes={systemNodes} connections={connections} />
                </div>
            </div>
        </section>
    )
}
