// Demo section data — scripts from CONTENT-SPEC.md
// Used by Demo Parts I, II, III (Phase 4) and testimonials

export const formFields = [
    { label: 'Name', value: 'Sarah Mitchell' },
    { label: 'Phone', value: '(416) 555-0172' },
    { label: 'Service', value: 'General service request' },
    { label: 'Preferred Date', value: 'Next available' },
]

export const smsConversation = [
    {
        sender: 'system',
        text: "Hi Sarah! Thanks for reaching out. We got your request and we're on it. Let me get you booked in.",
    },
    {
        sender: 'customer',
        text: 'That was fast! Yes please.',
    },
    {
        sender: 'system',
        text: 'I have Tuesday at 2pm or Wednesday at 10am available. Which works better?',
    },
    {
        sender: 'customer',
        text: 'Tuesday at 2pm.',
    },
    {
        sender: 'system',
        text: "You're confirmed for Tuesday at 2pm. You'll get a reminder the day before. See you then!",
    },
]

export const systemNodes = [
    { id: 'new-lead', label: 'New Lead', level: 0 },
    { id: 'qualify', label: 'Qualify', level: 1 },
    { id: 'route', label: 'Route', level: 2 },
    { id: 'book-apt', label: 'Book Apt', level: 3, branch: 'left' },
    { id: 'send-quote', label: 'Send Quote', level: 3, branch: 'right' },
    { id: 'follow-up-left', label: 'Follow Up', level: 4, branch: 'left' },
    { id: 'follow-up-right', label: 'Follow Up', level: 4, branch: 'right' },
    { id: 'confirm', label: 'Confirm', level: 5 },
    { id: 'review', label: 'Review', level: 6 },
]

export const dashboardMetrics = [
    { label: 'Leads Captured Today', value: 12 },
    { label: 'Average Response Time', value: '< 30s' },
    { label: 'Conversion Rate', value: '34%' },
]

export const approvalAction = {
    text: 'Approve meeting with Sarah Mitchell — Tuesday at 2pm',
    name: 'Sarah Mitchell',
    time: 'Tuesday at 2pm',
}

// Testimonials — structure defined, content provided by user later
export const testimonials = [
    {
        quote: 'The system paid for itself in the first week. We went from missing half our leads to catching every single one.',
        name: 'James R.',
        role: 'Owner',
        business: 'Service Company',
    },
    {
        quote: "I used to spend 3 hours a day on follow-ups. Now it's zero. The system handles everything and my calendar stays full.",
        name: 'Maria K.',
        role: 'Operations Manager',
        business: 'Professional Services',
    },
    {
        quote: "Our response time went from hours to seconds. Clients notice the difference — and they tell their friends.",
        name: 'David L.',
        role: 'Founder',
        business: 'Local Business',
    },
]
