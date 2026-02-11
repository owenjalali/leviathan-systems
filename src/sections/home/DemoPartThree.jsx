import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Check, Clock } from 'lucide-react'
import WindowFrame from '../../components/ui/WindowFrame'
import { demoParts } from '../../content/home'
import { approvalAction } from '../../content/demo-data'

gsap.registerPlugin(ScrollTrigger)

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
        description: 'Saturday at 2pm confirmed',
        timestamp: 'Just now',
    },
]

export default function DemoPartThree() {
    const containerRef = useRef(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const windowFrame = containerRef.current.querySelector('.window-frame')
            const feedItems = containerRef.current.querySelectorAll('.activity-item')
            const approvalCard = containerRef.current.querySelector('.approval-card')
            const approveBtn = containerRef.current.querySelector('.approve-button')
            const approveBtnText = containerRef.current.querySelector('.approve-button-text')

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    once: true,
                },
                repeat: -1,
                repeatDelay: 3,
            })

            // Reset at start of each loop
            tl.set(windowFrame, { opacity: 0, y: 20 })
            tl.set(feedItems, { opacity: 0, x: -20 })
            tl.set(approvalCard, { opacity: 0, y: 20, scale: 0.97 })
            tl.set(approveBtn, { backgroundColor: '#0d9488', scale: 1, boxShadow: 'none' })
            tl.call(() => {
                if (approveBtnText) approveBtnText.textContent = 'Approve'
            })

            // 1. Window frame fades in
            tl.to(windowFrame, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
            })

            // 2. Feed items one by one (real-time feel)
            .to(feedItems, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.7,
                ease: 'power2.out',
            }, '-=0.2')

            // 3. Approval card slides in
            .to(approvalCard, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.2)',
            }, '+=0.4')

            // 4. Approve button pulse
            .to(approveBtn, {
                boxShadow: '0 0 0 4px rgba(20, 184, 166, 0.3), 0 0 0 8px rgba(20, 184, 166, 0.1)',
                duration: 0.6,
                ease: 'power2.out',
                repeat: 1,
                yoyo: true,
            })

            // 5. Auto-click
            .to(approveBtn, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power2.in',
            }, '+=0.5')
            .to(approveBtn, {
                scale: 1,
                duration: 0.1,
                ease: 'power2.out',
            })

            // 6. Change to "Approved"
            .to(approveBtn, {
                backgroundColor: '#059669',
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    if (approveBtnText) approveBtnText.textContent = 'Approved'
                },
            })
            .to(approveBtn, {
                boxShadow: '0 0 12px 4px rgba(5, 150, 105, 0.3)',
                duration: 0.4,
                ease: 'power2.out',
            })
            .to(approveBtn, {
                boxShadow: '0 0 0px 0px rgba(5, 150, 105, 0)',
                duration: 0.6,
                ease: 'power2.in',
            })

            // 7. Hold completed state
            tl.to({}, { duration: 2.5 })

            // 8. Fade out before repeat
            tl.to([windowFrame], {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.in',
            })
        })

        mm.add('(prefers-reduced-motion: reduce)', () => {
            gsap.set('.window-frame, .activity-item, .approval-card', { opacity: 1, x: 0, y: 0 })
            const approveBtnText = containerRef.current.querySelector('.approve-button-text')
            const approveBtn = containerRef.current.querySelector('.approve-button')
            if (approveBtnText) approveBtnText.textContent = 'Approved'
            if (approveBtn) approveBtn.style.backgroundColor = '#059669'
        })
    }, { scope: containerRef })

    const part = demoParts[2]

    return (
        <section
            ref={containerRef}
            className="relative py-20 bg-[var(--bg-primary)]"
        >
            <div className="container mx-auto px-4">
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

                <div className="max-w-2xl mx-auto">
                    <WindowFrame title="Owner Dashboard" className="window-frame">
                        <div className="space-y-4 mb-6">
                            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-4">
                                Recent Activity
                            </h3>
                            {activityItems.map((item, i) => (
                                <div
                                    key={i}
                                    className="activity-item flex items-start gap-3 pb-4 border-b border-[var(--border)] last:border-0"
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20">
                                            <Check className="w-3 h-3 text-green-500" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                                            {item.action}
                                        </p>
                                        <p className="text-xs text-[var(--text-secondary)]">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                                        <Clock className="w-3 h-3" />
                                        <span>{item.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="approval-card mt-8 p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                            <p className="text-sm font-medium text-[var(--text-primary)] mb-4">
                                {approvalAction.text}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    className="approve-button flex-1 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg"
                                    type="button"
                                >
                                    <span className="approve-button-text">Approve</span>
                                </button>
                                <button
                                    className="override-button flex-1 px-4 py-2 text-sm font-medium text-[var(--text-primary)] border border-[var(--border)] rounded-lg"
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
