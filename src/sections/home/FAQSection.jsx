import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const questions = [
  {
    id: 'faq-1',
    title: 'What exactly does Leviathan build?',
    content:
      'We build automated systems that handle your inbound demand end-to-end. That means instant lead response, automatic qualification, intelligent routing, and appointment booking — all running without human intervention. Think of it as operational infrastructure, not software.',
  },
  {
    id: 'faq-2',
    title: 'How is this different from hiring a marketing agency?',
    content:
      "Agencies generate leads. We make sure those leads don't get lost. If your team takes two hours to respond to an inbound inquiry, no amount of ad spend fixes that. We build the systems that respond in seconds, qualify automatically, and route to the right person — every time.",
  },
  {
    id: 'faq-3',
    title: 'What does the free audit include?',
    content:
      "We map your current response workflow, identify where time and revenue are leaking, and show you exactly what an automated system would look like for your business. No pitch deck — just a clear breakdown of what's costing you money and how to fix it.",
  },
  {
    id: 'faq-4',
    title: 'How long does it take to get a system running?',
    content:
      'Most systems are live within 2-4 weeks depending on complexity. We handle the full build — design, integration, testing, and deployment. You stay focused on running your business while we wire everything together.',
  },
  {
    id: 'faq-5',
    title: 'Do I need to replace my existing tools?',
    content:
      'No. We integrate with what you already use — your CRM, calendar, phone system, email. Our systems sit on top of your existing stack and connect everything together. Nothing gets ripped out.',
  },
  {
    id: 'faq-6',
    title: 'What if something goes wrong with the automation?',
    content:
      'Every system we build includes human override and real-time monitoring. You get alerts when something needs attention, and you can step in at any point. The automation runs independently, but you always have full control.',
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
          <a
            href="/audit"
            className="text-[var(--accent)] hover:underline"
          >
            Book a free audit
          </a>{' '}
          and we'll walk you through everything.
        </p>
      </div>
    </section>
  )
}
