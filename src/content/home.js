// Homepage content — all copy from CONTENT-SPEC.md
// Single source of truth for text. Components import from here.

export const hero = {
    headline: 'We Build Systems That Eliminate Redundancy.',
    subheadline:
        'Leviathan designs and deploys AI infrastructure that removes the monotonous tasks draining your time and revenue.',
    cta: 'Get Your Free Audit',
    ctaSupporting:
        'We map your bottlenecks, design a custom solution, and deliver measurable results.',
}

export const problem = {
    headline: "You're Working Harder Than You Need To.",
    painPoints: [
        {
            id: 'follow-up',
            title: 'Manual Follow-Up',
            body: "Manual follow-up is a full-time job nobody signed up for. Chasing quotes, sending reminders, checking in — it never ends, it never scales, and every hour comes straight out of your pocket.",
        },
        {
            id: 'speed',
            title: 'Speed',
            body: "The business that responds first wins. If a lead reaches out and you get back to them in two hours, they've already called your competitor. Right now, you're not first.",
        },
        {
            id: 'repetition',
            title: 'Repetition',
            body: "Your team — and you — do the same thing hundreds of times a week. Answering the same questions, gathering the same information, quoting the same way. Repetitive tasks eat hours you can't bill for — and they never stop.",
        },
    ],
}

export const reframe = {
    headline: "It's Not You. It's Missing Infrastructure.",
    paragraphs: [
        "You've tried working longer. You've tried hiring more people. You've tried doing it all yourself.",
        'But the problem was never effort — it was architecture.',
        "The businesses that scale don't work harder. They build systems that handle the work for them. Automated responses. Intelligent routing. Workflows that run whether you're watching or not.",
        "That's what infrastructure does.",
    ],
}

export const demoIntro = {
    headline: 'See the System in Action.',
    body: 'One customer request. Three perspectives. Watch how Leviathan infrastructure handles it end-to-end.',
}

export const demoParts = [
    {
        part: 'I',
        title: 'Customer Experience',
        description:
            'A customer submits a request and gets instantly booked — all automated.',
    },
    {
        part: 'II',
        title: 'System Logic',
        description:
            'The full decision tree that runs behind the scenes, from lead to confirmation.',
    },
    {
        part: 'III',
        title: 'Owner Dashboard',
        description:
            'Everything handled, one approval away. Your business on autopilot.',
    },
]

export const testimonialsSection = {
    headline: 'What They Say',
}

export const cta = {
    headline: 'Stop Doing Work Your Systems Should Handle.',
    body: "We'll map your bottlenecks, design a custom solution, and build infrastructure that delivers results — on autopilot.",
    button: 'Get Your Free Audit',
}

export const nav = {
    logo: 'Leviathan',
    items: [
        { label: 'About', to: '/about' },
        { label: 'Get Your Free Audit', to: '/audit', isCta: true },
    ],
}

export const pillars = [
    {
        id: 'bottleneck-removal',
        title: 'Bottleneck Mapping & Resolution',
        description:
            'We identify where your operation breaks down — slow responses, missed steps, manual handoffs — then build a system that handles it automatically. The bottleneck gets replaced with a process that runs on its own.',
        tags: ['Audit', 'Custom Systems', 'Automation'],
        status: 'Active',
    },
    {
        id: 'operational-control',
        title: 'Operational Control',
        description:
            'Complete visibility into what\'s working and where money is at risk. Know exactly which systems are performing and which need attention.',
        tags: ['Dashboards', 'Alerts', 'Analytics'],
        status: 'Active',
    },
    {
        id: 'human-safe-autonomy',
        title: 'Human-Safe Autonomy',
        description:
            'Systems operate independently while humans stay informed. Decisions are made in real-time, with override always one tap away.',
        tags: ['Auto-Pilot', 'Human Override', 'Audit Trail'],
        status: 'Active',
    },
]

export const footer = {
    copyright: '© 2026 Leviathan Systems',
    links: [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Audit', to: '/audit' },
    ],
}
