import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const questions = [
  {
    id: 'faq-1',
    title: 'What exactly does Leviathan build?',
    content:
      "Leviathan builds custom AI systems tailored to your business. Whether it's a website that functions as an intake system, quoting automation, inbound lead handling, follow-up sequences, or operational dashboards, we design and integrate solutions that remove bottlenecks and make execution predictable. We don't sell tools. We deliver outcomes: speed, reliability, consistency, and captured revenue.",
  },
  {
    id: 'faq-2',
    title: 'What kind of solutions can you build?',
    content:
      "It depends on your business. That's the point. Every solution is tailored. It could be a quoting system that gets estimates out faster, a CRM-lite setup that gives you pipeline visibility, or a website built as a functioning intake system instead of a brochure. Follow-up automation, confirmation sequences, scheduling flows, reputation capture. What we build looks different for every business, but the goal is always the same: reduce friction, reduce leakage, increase reliability.",
  },
  {
    id: 'faq-3',
    title: 'What does the free audit include?',
    content:
      'We audit your current operation, your processes, your bottlenecks, and where execution breaks down. You get a bottleneck map and a system recommendation: what to build first, why, and what outcome it targets. No pitch deck, no fluff. Just a clear breakdown of where your business is losing time or money and how the right system fixes it.',
  },
  {
    id: 'faq-4',
    title: 'How long does it take to get a system live?',
    content:
      'Most solutions are live within 2-4 weeks depending on scope. We handle the full build, design, integration, testing, and deployment. We also host and manage everything after launch. You stay focused on running your business while we wire it all together.',
  },
  {
    id: 'faq-5',
    title: 'Do I need to replace my existing tools?',
    content:
      'No. We integrate with what you already use, your CRM, calendar, phone system, email, and quoting tools. Our systems sit on top of your existing stack and connect everything together. Nothing gets ripped out.',
  },
  {
    id: 'faq-6',
    title: 'What happens after the system is built?',
    content:
      'We host and manage everything. Every system includes human override and real-time monitoring. You get alerts when something needs attention and can step in at any point. Ongoing support is available when maintenance or iteration is needed. Your systems run independently, but you always have full control.',
  },
]

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`border-x border-b first:border-t first:rounded-t-lg last:rounded-b-lg transition-colors duration-200 ${
        isOpen
          ? 'border-white/[0.08] bg-white/[0.02]'
          : 'border-white/[0.06] bg-transparent'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-[15px] leading-6 font-medium text-[var(--text-primary)] hover:text-white transition-colors duration-200"
        aria-expanded={isOpen}
      >
        {item.title}
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-[var(--text-muted)] transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
            {item.content}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openId, setOpenId] = useState('faq-1')

  return (
    <section className="bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-3xl px-6 py-[120px]">
        <div className="mb-10">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            Common questions about how Leviathan works, what we build, and what
            to expect.
          </p>
        </div>

        <div className="rounded-lg">
          {questions.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() =>
                setOpenId((prev) => (prev === item.id ? null : item.id))
              }
            />
          ))}
        </div>

        <p className="mt-6 text-sm text-[var(--text-muted)]">
          Still have questions?{' '}
          <a href="/audit" className="text-[var(--accent)] hover:underline">
            Book a free audit
          </a>{' '}
          and we'll walk you through everything.
        </p>
      </div>
    </section>
  )
}
