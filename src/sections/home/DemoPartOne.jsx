import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import PhoneMockup from '../../components/ui/PhoneMockup'
import { formFields, smsConversation } from '../../content/demo-data'
import { demoParts } from '../../content/home'

gsap.registerPlugin(ScrollTrigger)

/**
 * DemoPartOne - Customer Experience demonstration
 * Shows an auto-filling web form on the left and an iPhone SMS conversation on the right.
 * Animations trigger on viewport entry via GSAP ScrollTrigger.
 */
export default function DemoPartOne() {
    const containerRef = useRef(null)
    const tlRef = useRef()

    useGSAP(() => {
        const mm = gsap.matchMedia()

        // Full animations for users with no motion preference
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            tlRef.current = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    once: true,
                },
            })

            // Animate form fields in with stagger
            tlRef.current
                .from('.form-field', {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power2.out',
                })
                // Animate SMS bubbles after form fields, with slight overlap
                .from(
                    '.sms-bubble',
                    {
                        opacity: 0,
                        y: 10,
                        duration: 0.5,
                        stagger: 0.3,
                        ease: 'power2.out',
                    },
                    '-=0.3'
                )
        })

        // Simplified animations for motion-sensitive users
        mm.add('(prefers-reduced-motion: reduce)', () => {
            tlRef.current = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    once: true,
                },
            })

            // Just fade in, no movement
            tlRef.current.from(['.form-field', '.sms-bubble'], {
                opacity: 0,
                duration: 0.3,
            })
        })
    }, { scope: containerRef })

    const partData = demoParts[0]

    return (
        <section
            ref={containerRef}
            className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border)]"
        >
            <div className="mx-auto w-full max-w-[1200px] px-6">
                {/* Section header */}
                <div className="mb-12">
                    <div className="text-[var(--accent)] text-sm font-medium uppercase tracking-wider mb-2">
                        Part {partData.part}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
                        {partData.title}
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
                        {partData.description}
                    </p>
                </div>

                {/* Two-column layout: Form on left, Phone on right */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Web Form Column */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                            Request Form
                        </h3>
                        {formFields.map((field, i) => (
                            <div key={i} className="form-field" style={{ opacity: 0 }}>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    value={field.value}
                                    readOnly
                                    className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Phone Mockup Column */}
                    <div className="flex justify-center">
                        <PhoneMockup className="max-h-[600px] md:max-h-[650px]">
                            {/* SMS Screen */}
                            <div className="h-full w-full p-4 overflow-y-auto">
                                {/* Screen header */}
                                <div className="text-center mb-6 pt-8">
                                    <div className="text-xs text-[var(--text-secondary)]">
                                        Messages
                                    </div>
                                </div>

                                {/* SMS Conversation */}
                                <div className="space-y-3">
                                    {smsConversation.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`sms-bubble flex ${
                                                msg.sender === 'customer'
                                                    ? 'justify-end'
                                                    : 'justify-start'
                                            }`}
                                            style={{ opacity: 0 }}
                                        >
                                            <div
                                                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                                                    msg.sender === 'customer'
                                                        ? 'bg-[var(--accent)] text-black rounded-br-sm'
                                                        : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-bl-sm border border-[var(--border)]'
                                                }`}
                                            >
                                                <p className="text-sm leading-relaxed">
                                                    {msg.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </PhoneMockup>
                    </div>
                </div>
            </div>
        </section>
    )
}
