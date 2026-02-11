# Leviathan Systems — Website Content Specification

**Created:** 2026-02-10
**Phase:** 1 (Content & Cleanup)
**Status:** FINALIZED

---

## Site Structure

```
Homepage
├── Hero
├── Problem
├── Reframe
├── Demo Intro
├── Demo Part I — Customer Experience
├── Demo Part II — System Logic (scroll-driven tree)
├── Demo Part III — Owner Dashboard
├── Testimonials
└── Final CTA

Other Pages
├── About (existing, to be updated)
├── Audit (PROTECTED — no logic changes)
├── Begin (redirects to /audit)
└── Book (PROTECTED)
```

---

## Navigation

| Position | Label | Link | Style |
|----------|-------|------|-------|
| Left | Leviathan (logo) | / | Logo/wordmark |
| Center-right | About | /about | Text link |
| Right | Get Your Free Audit | /audit | CTA button |

---

## Footer

- © 2026 Leviathan Systems
- Links: Home | About | Audit

---

## Homepage Sections

### 1. Hero

**Headline:**
> We Build Systems That Eliminate Redundancy.

**Subheadline:**
> Leviathan designs and deploys AI infrastructure that removes the monotonous tasks draining your time and revenue.

**Primary CTA:**
> Get Your Free Audit

**CTA Supporting Copy:**
> We map your bottlenecks, design a custom solution, and deliver measurable results.

**Tone:** Bold and assertive. Confident, direct.

---

### 2. Problem

**Section Headline:**
> You're Working Harder Than You Need To.

**Pain Point 1 — Manual Follow-Up:**
> Manual follow-up is a full-time job nobody signed up for. Chasing quotes, sending reminders, checking in — it never ends, it never scales, and every hour comes straight out of your pocket.

**Pain Point 2 — Speed:**
> The business that responds first wins. If a lead reaches out and you get back to them in two hours, they've already called your competitor. Right now, you're not first.

**Pain Point 3 — Repetition:**
> Your team — and you — do the same thing hundreds of times a week. Answering the same questions, gathering the same information, quoting the same way. Repetitive tasks eat hours you can't bill for — and they never stop.

---

### 3. Reframe

**Section Headline:**
> It's Not You. It's Missing Infrastructure.

**Body:**
> You've tried working longer. You've tried hiring more people. You've tried doing it all yourself.
>
> But the problem was never effort — it was architecture.
>
> The businesses that scale don't work harder. They build systems that handle the work for them. Automated responses. Intelligent routing. Workflows that run whether you're watching or not.
>
> That's what infrastructure does.

**Tone:** Empathetic first, then assertive. Shifts blame from the owner to missing systems.

---

### 4. Demo Intro

**Section Headline:**
> See the System in Action.

**Body:**
> One customer request. Three perspectives. Watch how Leviathan infrastructure handles it end-to-end.

---

### 5. Demo Part I — Customer Experience

**Concept:** A customer submits a form and instantly receives an SMS response. Auto-filling animation shows the form completing, then a phone mockup shows the SMS conversation.

**Business Type:** General service business (not industry-specific).

**Form Fields (auto-fill):**
| Field | Value |
|-------|-------|
| Name | Sarah Mitchell |
| Phone | (416) 555-0172 |
| Service | General service request |
| Preferred Date | Next available |

**SMS Conversation:**
```
SYSTEM: Hi Sarah! Thanks for reaching out. We got your request
        and we're on it. Let me get you booked in.

SARAH:  That was fast! Yes please.

SYSTEM: I have Tuesday at 2pm or Wednesday at 10am available.
        Which works better?

SARAH:  Tuesday at 2pm.

SYSTEM: You're confirmed for Tuesday at 2pm. You'll get a
        reminder the day before. See you then!
```

**Key Principle:** Instant response, qualification, booking — all automated. The customer never waits.

---

### 6. Demo Part II — System Logic

**Concept:** A top-to-bottom tree/flowchart. Lines draw downward as the user scrolls (GSAP ScrollTrigger, scroll-scrubbed). Each node lights up as the line reaches it. On mobile, auto-plays instead of scroll-scrub.

**Node Graph (top to bottom):**
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

**Node Count:** 8 nodes total.

**Key Principle:** Visitor sees the entire automated decision tree unfold as they scroll. Shows all the moving pieces working together. Design to be provided by user.

---

### 7. Demo Part III — Owner Dashboard

**Concept:** A dashboard mockup showing the business running on autopilot. Animated counters, an approval action, and pipeline data. Window-framed mockup.

**Metrics Displayed:**
| Metric | Purpose |
|--------|---------|
| Leads Captured Today | Volume indicator |
| Average Response Time | Speed indicator |
| Conversion Rate | Effectiveness indicator |

**No revenue or money figures.**

**Approval Action:**
> Approve meeting with Sarah Mitchell — Tuesday at 2pm

Ties back to Demo Part I. Owner taps approve — done. Shows manual labor is lifted but owner retains control.

**Key Principle:** So much has been handled automatically, but the owner still has final say. Clean, minimal, powerful. Design to be provided by user.

---

### 8. Testimonials

**Structure per testimonial:**
| Field | Description |
|-------|-------------|
| Quote | Testimonial text |
| Name | First name, last initial |
| Role | Job title |
| Business | Business type or name |

**Number:** 3 testimonials.

**Content:** To be provided by user. Component from 21st.dev to be integrated in Phase 2.

---

### 9. Final CTA

**Headline:**
> Stop Doing Work Your Systems Should Handle.

**Body:**
> We'll map your bottlenecks, design a custom solution, and build infrastructure that delivers results — on autopilot.

**CTA Button:**
> Get Your Free Audit

**Flow:** Button → /audit → form → Calendly booking.

---

## Content File Structure

```
src/content/
├── home.js       ← all homepage section copy
└── demo-data.js  ← demo scripts (form, SMS, nodes, dashboard)
```

---

## Brand Voice Summary

| Attribute | Description |
|-----------|-------------|
| Tone | Bold, assertive, confident |
| Voice | Calm authority — "of course this is how it works" |
| Focus | Outcomes, not features |
| Avoids | Tech jargon, urgency tactics, hype |
| Key phrase | "Infrastructure" (not "AI tool" or "chatbot") |

---

## Conversion Architecture

**One goal:** Get the visitor to /audit.

**Primary CTA:** "Get Your Free Audit" (hero + final CTA)
**Conversion path:** Homepage → /audit → Formspree form → Calendly booking

Every section moves the visitor closer to believing they need this audit.

---

*Finalized: 2026-02-10*
