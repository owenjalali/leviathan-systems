import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Check, Clock } from 'lucide-react'
import WindowFrame from '../../components/ui/WindowFrame'
import { demoParts } from '../../content/home'
import { approvalAction } from '../../content/demo-data'

gsap.registerPlugin(ScrollTrigger)

/**
 * DemoPartThree — Owner Dashboard section
 * Shows an activity feed of what the system just handled (Sarah Mitchell's request flow)
 * with approve/override buttons. Emphasizes human-safe autonomy.
 * Animated on viewport entry using GSAP ScrollTrigger (once: true)
 */

const activityItems = [
    {
        action: 'New lead received',
        description: 'Sarah Mitchell submitted a request',
        timestamp: '2 min ago',
    },
    {
        action: 'Lead qualified',
        description: 'Automatically verified contact info and service type',
        timestamp: '2 min ago',
    },
    {
        action: 'Request routed',
        description: 'Matched to available appointment slot',
        timestamp: '1 min ago',
    },
    {
        action: 'SMS sent',
        description: 'Booking confirmation sent to Sarah Mitchell',
        timestamp: '1 min ago',
    },
    {
        action: 'Appointment booked',
        description: 'Tuesday at 2pm confirmed',
        timestamp: 'Just now',
    },
]

export default function DemoPartThree() {
    const containerRef = useRef(null)
    const tlRef = useRef()

    useGSAP(
        () => {
            const mm = gsap.matchMedia()

            // Full animations for users with no motion preference
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                tlRef.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                })

                // 1. Window frame fades in and slides up
                tlRef.current.from('.window-frame', {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: 'power2.out',
                })

                // 2. Feed items appear one by one with stagger
                tlRef.current.from(
                    '.activity-item',
                    {
                        opacity: 0,
                        x: -20,
                        duration: 0.4,
                        stagger: 0.2,
                        ease: 'power2.out',
                    },
                    '-=0.2'
                )

                // 3. Approval card slides in from bottom with scale
                tlRef.current.from(
                    '.approval-card',
                    {
                        opacity: 0,
                        y: 30,
                        scale: 0.95,
                        duration: 0.6,
                        ease: 'back.out(1.2)',
                    },
                    '-=0.2'
                )

                // 4. Approve button gets a subtle pulse to draw attention
                tlRef.current.to('.approve-button', {
                    boxShadow:
                        '0 0 0 4px rgba(20, 184, 166, 0.2), 0 0 0 8px rgba(20, 184, 166, 0.1)',
                    duration: 0.8,
                    ease: 'power2.out',
                    repeat: 1,
                    yoyo: true,
                })
            })

            // Simplified animations for motion-sensitive users
            mm.add('(prefers-reduced-motion: reduce)', () => {
                tlRef.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                })

                // Simple fade in for all content
                tlRef.current.from(
                    ['.window-frame', '.activity-item', '.approval-card'],
                    {
                        opacity: 0,
                        duration: 0.3,
                    }
                )
            })
        },
        { scope: containerRef }
    )

    const part = demoParts[2] // Part III

    return (
        <section
            ref={containerRef}
            className="relative py-20 bg-[var(--bg-primary)]"
        >
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-medium rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                        Part {part.part}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
                        {part.title}
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        {part.description}
                    </p>
                </div>

                {/* Dashboard in Window Frame */}
                <div className="max-w-2xl mx-auto">
                    <WindowFrame
                        title="Owner Dashboard"
                        className="window-frame"
                    >
                        {/* Activity Feed */}
                        <div className="space-y-4 mb-6">
                            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-4">
                                Recent Activity
                            </h3>
                            {activityItems.map((item, i) => (
                                <div
                                    key={i}
                                    className="activity-item flex items-start gap-3 pb-4 border-b border-[var(--border)] last:border-0"
                                >
                                    {/* Status indicator */}
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20">
                                            <Check className="w-3 h-3 text-green-500" />
                                        </div>
                                    </div>

                                    {/* Action details */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                                            {item.action}
                                        </p>
                                        <p className="text-xs text-[var(--text-secondary)]">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Timestamp */}
                                    <div className="flex-shrink-0 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                                        <Clock className="w-3 h-3" />
                                        <span>{item.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Approval Action Card */}
                        <div className="approval-card mt-8 p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                            <p className="text-sm font-medium text-[var(--text-primary)] mb-4">
                                {approvalAction.text}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    className="approve-button flex-1 px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                                    type="button"
                                >
                                    Approve
                                </button>
                                <button
                                    className="flex-1 px-4 py-2 text-sm font-medium text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
                                    type="button"
                                >
                                    Override
                                </button>
                            </div>
                        </div>
                    </WindowFrame>
                </div>
            </div>
        </section>
    )
}
