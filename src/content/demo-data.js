// Demo section data - scripts from CONTENT-SPEC.md
// Used by Demo Parts I, II, III and testimonials

export const formFields = [
  { label: 'Name', value: 'Sarah Mitchell' },
  { label: 'Phone', value: '123-456-7890' },
  { label: 'Service', value: 'General service request' },
  { label: 'Preferred Date', value: 'Next available' },
]

export const smsConversation = [
  {
    sender: 'system',
    text: "Hi Sarah! Thanks for submitting your request. We've got everything we need. Do you have any questions?",
  },
  {
    sender: 'customer',
    text: "No, I'm all good!",
  },
  {
    sender: 'system',
    text: 'Great! Would you like to book a time slot?',
  },
  {
    sender: 'customer',
    text: 'Yeah, can we do Saturday at 2?',
  },
  {
    sender: 'system',
    text: "Saturday at 2pm works perfectly. You're all booked! You'll get a reminder the day before.",
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
  text: 'Approve meeting with Sarah Mitchell, Saturday at 2pm',
  name: 'Sarah Mitchell',
  time: 'Saturday at 2pm',
}

export const testimonials = [
  {
    quote:
      'Working with Leviathan has been an incredible experience. They build with quality, professionalism, and integrity.',
    name: 'Sam Ho',
    role: 'Owner',
    business: 'Leaside Fades',
    image: '/testimonials/sam-po.png',
  },
  {
    quote:
      'The system you built has completely streamlined how we handle bookings. Everything syncs, reminders go out automatically, and we are not chasing clients anymore. It honestly feels like we added an operations manager without hiring one.',
    name: 'Carter Jenkins',
    role: 'Owner',
    business: 'Midtown Painting Home Services',
    image: '/testimonials/carter-jenkins.png',
  },
  {
    quote:
      "Working with Leviathan has been a crucial step to my company's success. They took full control of my online interface and made it as simple and straightforward on my end as possible. Now I can focus on business operations instead of chasing leads.",
    name: "Alister D'Souza",
    role: 'Owner',
    business: 'JAT Home Solutions',
  },
  {
    quote:
      'Our response time went from hours to seconds. Clients notice the difference, and they tell their friends.',
    name: 'David L.',
    role: 'Founder',
    business: 'Local Business',
  },
]
