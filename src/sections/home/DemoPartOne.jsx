import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import PhoneMockup from '../../components/ui/PhoneMockup'
import { formFields, smsConversation } from '../../content/demo-data'
import { demoParts } from '../../content/home'

gsap.registerPlugin(ScrollTrigger)

export default function DemoPartOne() {
    const containerRef = useRef(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const fieldEls = containerRef.current.querySelectorAll('.form-field')
            const valueEls = containerRef.current.querySelectorAll('.form-value')
            const cursorEls = containerRef.current.querySelectorAll('.typing-cursor')
            const submitBtn = containerRef.current.querySelector('.submit-btn')
            const bubbles = containerRef.current.querySelectorAll('.sms-bubble')

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    once: true,
                },
                repeat: -1,
                repeatDelay: 3,
            })

            // Reset everything at start of each loop
            tl.set(fieldEls, { opacity: 0, y: 15 })
            tl.set(submitBtn, { opacity: 0, y: 10, scale: 1, boxShadow: 'none' })
            tl.set(bubbles, { opacity: 0, y: 10 })
            tl.set(cursorEls, { opacity: 0 })
            tl.call(() => {
                valueEls.forEach(el => { el.textContent = '' })
            })

            // 1. Show all form fields (empty)
            tl.to(fieldEls, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out',
            })

            // 2. Type each field value one by one
            formFields.forEach((field, i) => {
                const valueEl = valueEls[i]
                const cursorEl = cursorEls[i]
                if (!valueEl) return

                const text = field.value
                const typeDuration = text.length * 0.07 // 70ms per char

                // Show cursor
                tl.set(cursorEl, { opacity: 1 })

                // Blink cursor before typing
                tl.to(cursorEl, {
                    opacity: 0,
                    duration: 0.3,
                    repeat: 1,
                    yoyo: true,
                })

                // Type character by character
                const obj = { chars: 0 }
                tl.to(obj, {
                    chars: text.length,
                    duration: typeDuration,
                    ease: 'none',
                    onUpdate: () => {
                        valueEl.textContent = text.slice(0, Math.round(obj.chars))
                    },
                    onRepeat: () => { obj.chars = 0 },
                })

                // Hide cursor
                tl.set(cursorEl, { opacity: 0 })

                // Pause between fields
                tl.to({}, { duration: 0.4 })
            })

            // 3. Submit button appears
            tl.to(submitBtn, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
            }, '+=0.4')

            // 4. Submit click with light pulse
            tl.to(submitBtn, {
                scale: 0.96,
                duration: 0.12,
                ease: 'power2.in',
            }, '+=0.8')
            .to(submitBtn, {
                scale: 1,
                duration: 0.12,
                ease: 'power2.out',
            })
            .to(submitBtn, {
                boxShadow: '0 0 20px 6px rgba(212, 175, 55, 0.5), 0 0 40px 12px rgba(212, 175, 55, 0.2)',
                duration: 0.5,
                ease: 'power2.out',
            })
            .to(submitBtn, {
                boxShadow: '0 0 0px 0px rgba(212, 175, 55, 0)',
                duration: 0.7,
                ease: 'power2.in',
            })

            // 5. SMS bubbles — slow (1.5s between each)
            tl.to({}, { duration: 1.0 })
            .to(bubbles, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 1.5,
                ease: 'power2.out',
            })

            // 6. Hold the completed state before looping
            tl.to({}, { duration: 2 })

            // 7. Fade everything out before repeat
            tl.to([fieldEls, submitBtn, bubbles], {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.in',
            })
        })

        mm.add('(prefers-reduced-motion: reduce)', () => {
            gsap.set('.form-field, .submit-btn, .sms-bubble', { opacity: 1, y: 0 })
            const valueEls = containerRef.current.querySelectorAll('.form-value')
            formFields.forEach((field, i) => {
                if (valueEls[i]) valueEls[i].textContent = field.value
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

                {/* Two-column layout */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Web Form */}
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]/30 p-6 md:p-8">
                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                            Request Form
                        </h3>
                        <div className="space-y-5">
                            {formFields.map((field, i) => (
                                <div key={i} className="form-field">
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                                        {field.label}
                                    </label>
                                    <div className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg min-h-[48px] flex items-center">
                                        <span className="form-value text-[var(--text-primary)]">{field.value}</span>
                                        <span className="typing-cursor text-[var(--accent)] font-light ml-[1px]">|</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="submit-btn mt-8 w-full py-3.5 bg-[var(--accent)] text-black font-semibold rounded-lg cursor-default"
                        >
                            Submit Request
                        </button>
                    </div>

                    {/* Phone Mockup */}
                    <div className="flex justify-center">
                        <PhoneMockup>
                            <div className="h-full w-full p-3 overflow-y-auto">
                                <div className="text-center pt-8 pb-4">
                                    <div className="text-xs font-medium text-[var(--text-secondary)]">Messages</div>
                                </div>
                                <div className="space-y-2.5 px-1">
                                    {smsConversation.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`sms-bubble flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                                                msg.sender === 'customer'
                                                    ? 'bg-[var(--accent)] text-black rounded-br-sm'
                                                    : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-bl-sm border border-[var(--border)]'
                                            }`}>
                                                <p className="text-xs leading-relaxed">{msg.text}</p>
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
