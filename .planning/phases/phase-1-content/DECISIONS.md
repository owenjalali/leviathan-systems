# Phase 1 Decisions

**Date:** 2026-02-10

## 1. Hero (COPY-01) ✓

### Headline
We Build Systems That Eliminate Redundancy.

### Subheadline
Leviathan designs and deploys AI infrastructure that removes the monotonous tasks draining your time and revenue.

### Primary CTA
Get Your Free Audit

### CTA Supporting Copy
We map your bottlenecks, design a custom solution, and deliver measurable results.

### Tone
Bold and assertive. Confident, direct — "we build X" energy.

---

## 2. Problem Section (COPY-02) ✓

### Section Headline
You're Working Harder Than You Need To.

### Pain Point 1 — Manual Follow-Up
Manual follow-up is a full-time job nobody signed up for. Chasing quotes, sending reminders, checking in — it never ends, it never scales, and every hour comes straight out of your pocket.

### Pain Point 2 — Speed
The business that responds first wins. If a lead reaches out and you get back to them in two hours, they've already called your competitor. Right now, you're not first.

### Pain Point 3 — Repetition
Your team — and you — do the same thing hundreds of times a week. Answering the same questions, gathering the same information, quoting the same way. Repetitive tasks eat hours you can't bill for — and they never stop.

### Structure
3 pain points covering: wasted time (money), lost speed (urgency), repetitive grind (structural). Pain Point 3 feeds directly into the Reframe section.

---

## 3. Reframe Section (COPY-03) ✓

### Section Headline
It's Not You. It's Missing Infrastructure.

### Body Copy
You've tried working longer. You've tried hiring more people. You've tried doing it all yourself.

But the problem was never effort — it was architecture.

The businesses that scale don't work harder. They build systems that handle the work for them. Automated responses. Intelligent routing. Workflows that run whether you're watching or not.

That's what infrastructure does.

### Tone
Empathetic first ("it's not you"), then assertive ("it was architecture"). Shifts blame from the business owner to the absence of systems. Makes Leviathan feel inevitable, not optional.

---

## 4. Demo Intro (COPY-04) ✓

### Section Headline
See the System in Action.

### Body
One customer request. Three perspectives. Watch how Leviathan infrastructure handles it end-to-end.

---

## 5. Demo Part I — Customer Experience (COPY-05) ✓

### Business Type
General service business — not specific to one industry. Leviathan serves all service-based businesses.

### Form Auto-Fill
- Name: Sarah Mitchell
- Phone: (416) 555-0172
- Service: General service request
- Preferred Date: Next available

### SMS Conversation
```
SYSTEM: "Hi Sarah! Thanks for reaching out. We got your request
         and we're on it. Let me get you booked in."

SARAH:  "That was fast! Yes please."

SYSTEM: "I have Tuesday at 2pm or Wednesday at 10am available.
         Which works better?"

SARAH:  "Tuesday at 2pm."

SYSTEM: "You're confirmed for Tuesday at 2pm. You'll get a
         reminder the day before. See you then!"
```

### Key Principle
Instant response, qualification, booking — all automated. The customer never waits.

---

## 6. Demo Part II — System Logic (COPY-06) ✓

### Structure
Top-to-bottom tree/flowchart. Lines draw downward as user scrolls, connecting nodes. Each node lights up as the scroll-driven line reaches it.

### Node Flow (top to bottom)
```
        New Lead
            │
         Qualify
            │
          Route
         /     \
  Book Apt   Send Quote
      |          |
  Follow Up  Follow Up
       \      /
       Confirm
          |
        Review
```

### Key Principle
Visitor sees the entire automated decision tree unfold as they scroll. Shows all moving pieces. Design to be provided by user in later phase.

---

## 7. Demo Part III — Owner Dashboard (COPY-07) ✓

### Metrics Displayed
- Leads Captured Today
- Average Response Time
- Conversion Rate
- **NO revenue or money figures**

### Approval Action
Dashboard shows an approval prompt: "Approve meeting with Sarah Mitchell — Tuesday at 2pm" (ties back to Demo Part I). Owner taps approve — done. Shows that manual labor is lifted but owner retains control.

### Key Principle
The dashboard demonstrates: so much has been handled automatically, but the owner still has final say. Clean, minimal, powerful. Design to be provided by user in later phase.

---

## 8. Testimonials (COPY-08) ✓

### Structure
- Name
- Role
- Business

### Notes
Component and content to be provided by user. User has a pre-built component from 21st.dev. Phase 1 only needs to define the data structure in content files — actual testimonial copy, headshots, etc. come later.

---

## 9. CTA Section (COPY-09) ✓

### Headline
Stop Doing Work Your Systems Should Handle.

### Body
We'll map your bottlenecks, design a custom solution, and build infrastructure that delivers results — on autopilot.

### CTA Button
Get Your Free Audit → takes visitor to Audit form → fill out → book a call.

### Notes
Same CTA text as hero for consistency. No secondary link needed — single conversion path (Audit form → Calendly booking). Design details in Phase 2.

---

## 10. Nav & Footer (COPY-10) ✓

### Nav Items
- Leviathan (logo/wordmark → home)
- About (→ /about)
- Get Your Free Audit (CTA button style → /audit)

### Footer
- © 2026 Leviathan Systems
- Links: Home | About | Audit

### Notes
3 nav items, clean and minimal. "Book" is not a separate nav item — booking is part of the Audit journey. Component and visual design to be provided by user in Phase 2.

---

## 11. Cleanup Scope (CLEAN-01 through CLEAN-06) ✓

### Components to Delete
- AnimatedStats.jsx
- DemoSection.jsx
- LiveMonitorTerminal.jsx
- LossCalculator.jsx
- SystemDiagram.jsx
- VapiCallButton.jsx

### Hooks to Delete
- useLiveMonitor.js
- useVapiCall.js

### Pages to Delete
- Infrastructure.jsx
- Home-redesign.jsx
- Contact.jsx
- Services.jsx

### CSS to Delete
- index-redesign.css

### Dependencies
- Remove: @vapi-ai/web
- Install: gsap, @gsap/react

### Keep
- ScrollToTop.jsx
- useScrollAnimation.js
- Home.jsx (will be rewritten)
- About.jsx (will be updated)

### Protected (zero changes)
- Audit.jsx
- Begin.jsx
- Book.jsx

---

## 12. Content File Structure ✓

### Files to Create
- `src/content/home.js` — all homepage section copy (hero, problem, reframe, demo intro, CTA, nav, footer)
- `src/content/demo-data.js` — demo scripts (form data, SMS messages, node labels, dashboard metrics)

### Notes
Phase 2+ imports from these files. Testimonial data structure included but content provided by user later.
