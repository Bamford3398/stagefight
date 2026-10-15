export const contact = {
  phoneDisplay: '07813 308672',
  phoneHref: 'tel:+447813308672',
  email: 'info@stagefight.co.uk',
}

export const nav = [
  { to: '/screen', label: 'Screen' },
  { to: '/stage', label: 'Stage' },
  { to: '/firearms', label: 'Firearms' },
  { to: '/choreography', label: 'Choreography' },
  { to: '/agency', label: 'Agency' },
  { to: '/news', label: 'News' },
  { to: '/calendar', label: 'Calendar' },
]

export const courses = [
  {
    id: 'sc-s1-sep-bham',
    title: 'Screen Combat Stage-1',
    duration: '2-day',
    dateLabel: '12–13 September',
    year: 2026,
    month: 'September',
    monthKey: 'september',
    sort: '2026-09-12',
    price: 161,
    venue: 'AMPL Events Centre',
    city: 'Birmingham',
    status: 'full',
    spacesLabel: 'Fully booked',
    requirement: '',
    track: 'Screen',
  },
  {
    id: 'mc-sword-buckler',
    title: 'Masterclass: Sword & Buckler',
    duration: '1-day',
    dateLabel: '19 September',
    year: 2026,
    month: 'September',
    monthKey: 'september',
    sort: '2026-09-19',
    price: 40,
    venue: 'AMPL Events Centre',
    city: 'Birmingham',
    status: 'full',
    spacesLabel: 'Fully booked',
    requirement: 'Screen Combat Stage-3 or Stage Combat Level-1-Standard minimum.',
    track: 'Masterclass',
  },
  {
    id: 'refresher-sep',
    title: 'Combat Refresher',
    duration: '1-day',
    dateLabel: '20 September',
    year: 2026,
    month: 'September',
    monthKey: 'september',
    sort: '2026-09-20',
    price: 29,
    venue: 'AMPL Events Centre',
    city: 'Birmingham',
    status: 'full',
    spacesLabel: 'Fully booked',
    requirement: 'Screen Combat Stage-1 or Stage Combat Level-1-Standard minimum.',
    track: 'Refresher',
  },
  {
    id: 'sc-s3-oct',
    title: 'Screen Combat Stage-3',
    duration: '2-day',
    dateLabel: '3–4 October',
    year: 2026,
    month: 'October',
    monthKey: 'october',
    sort: '2026-10-03',
    price: 161,
    venue: 'AMPL Events Centre',
    city: 'Birmingham',
    status: 'full',
    spacesLabel: 'Fully booked',
    requirement: '',
    track: 'Screen',
  },
  {
    id: 'sc-s2-oct',
    title: 'Screen Combat Stage-2',
    duration: '2-day',
    dateLabel: '17–18 October',
    year: 2026,
    month: 'October',
    monthKey: 'october',
    sort: '2026-10-17',
    price: 161,
    venue: 'AMPL Events Centre',
    city: 'Birmingham',
    status: 'full',
    spacesLabel: 'Fully booked',
    requirement: '',
    track: 'Screen',
  },
  {
    id: 'mc-axe',
    title: 'Masterclass: Axe',
    duration: '1-day',
    dateLabel: '7 November',
    year: 2026,
    month: 'November',
    monthKey: 'november',
    sort: '2026-11-07',
    price: 45,
    venue: 'AMPL Events Centre',
    city: 'Birmingham',
    status: 'full',
    spacesLabel: 'Fully booked',
    requirement: 'Screen Combat Stage-3 or Stage Combat Level-1-Standard minimum.',
    track: 'Masterclass',
  },
  {
    id: 'sc-s1-nov-london',
    title: 'Screen Combat Stage-1',
    duration: '2-day',
    dateLabel: '14–15 November',
    year: 2026,
    month: 'November',
    monthKey: 'november',
    sort: '2026-11-14',
    price: 185,
    venue: 'Halley House School',
    city: 'London, E8',
    status: 'open',
    spacesLabel: '10 spaces available',
    requirement: '',
    track: 'Screen',
    bookingUrl: 'https://buy.stripe.com/dRm9AVe7cbK364i3VAbbG0S',
  },
  {
    id: 'sc-s4-nov',
    title: 'Screen Combat Stage-4',
    duration: '2-day',
    dateLabel: '21–22 November',
    year: 2026,
    month: 'November',
    monthKey: 'november',
    sort: '2026-11-21',
    price: 161,
    venue: 'AMPL Events Centre',
    city: 'Birmingham',
    status: 'open',
    spacesLabel: 'Spaces available',
    requirement: '',
    track: 'Screen',
    bookingUrl: 'https://buy.stripe.com/aFaaEZ8MS29t2S62RwbbG0R',
  },
]

export const screenStages = [
  {
    id: '1',
    title: 'Stage-1',
    text: 'The start of the programme. A recent cohort spent the weekend on unarmed combat, dagger fighting and swordplay. Completion is certificated in its own right.',
  },
  {
    id: '2',
    title: 'Stage-2',
    text: 'The second certificated stage. It continues the same screen-combat system so performers can work faster and more safely once the foundation is in place.',
  },
  {
    id: '3',
    title: 'Stage-3',
    text: 'Advanced camera craft within the programme. Several masterclasses ask for Stage-3, or a stage-combat Level-1, before you attend.',
  },
  {
    id: '4',
    title: 'Stage-4',
    text: 'The final certificated stage of the four-part course, for performers ready to apply the system across genres and shooting setups.',
  },
]

export const stageLevels = [
  {
    id: '01',
    name: 'Level-1-Standard',
    summary:
      'The foundation of the ECSPC system. Every new student starts here. It introduces the techniques and disciplines that the rest of the training is built on.',
    includes: ['Unarmed combat', 'Single sword'],
  },
  {
    id: '02',
    name: 'Level-2-Intermediate',
    summary:
      'Complete three further weapon disciplines. Quarterstaff and rapier & dagger are required, so you train a two-handed weapon and a dual-weapon system used constantly on stage.',
    includes: ['Three further disciplines', 'Quarterstaff', 'Rapier & dagger'],
  },
  {
    id: '03',
    name: 'Level-3-Advanced',
    summary:
      'Complete five further weapon disciplines at Merit or Distinction, including quarterstaff, rapier & dagger and smallsword. This is the level recognised for entry to Equity’s Fight Directors Training Scheme.',
    includes: ['Five further disciplines', 'Merit or Distinction', 'Equity pathway'],
  },
]

export const weapons = [
  'Axe',
  'Dagger',
  'Longsword',
  'Multiple opponents',
  'Quarterstaff',
  'Rapier',
  'Rapier & dagger',
  'Sword & shield',
  'Smallsword',
  'Sai',
]

export const choreographyFor = [
  'Film and television fights',
  'Theatrical fight choreography',
  'Pre-viz and motion capture',
  'Pilot episodes and web series',
  'Music videos',
  'Youth, school and college productions',
]

export const choreographyProvides = [
  'Fight and action choreography',
  'Qualified, experienced fight teams',
  'Weapon training and choreography',
  'Firearms tuition and choreography',
  'Weapon hire',
  'Weapon and armour prop manufacture',
]

export const news = [
  {
    slug: 'shakespeare-festival',
    date: '2024-03-16',
    dateLabel: '16 March 2024',
    title: 'Shakespeare Festival',
    category: 'Workshop',
    excerpt:
      'A stage combat workshop for Solihull Schools Shakespeare Festival, with thanks to the staff and organisers at Solihull School.',
    body: [
      'Had a great day teaching a stage combat workshop for Solihull Schools Shakespeare Festival.',
      'Huge thanks to the staff and organisers at Solihull School for arranging the festival and looking after us.',
    ],
  },
  {
    slug: 'valkyrie-pre-production',
    date: '2024-03-01',
    dateLabel: '1 March 2024',
    title: 'Valkyrie film enters pre-production',
    category: 'Screen',
    excerpt:
      'Stagefight, Filmic-Props and Coppergate Films have spent two years on Valkyrie, a collection of short films drawn from the Norse sagas.',
    body: [
      'Over the last two years Stagefight, Filmic-Props and Coppergate Films have been collaborating on Valkyrie — a collection of short films based on the Norse sagas.',
      'The project has now gone into pre-production. We’ll keep you updated as things progress.',
    ],
  },
  {
    slug: 'screen-combat-stage-1',
    date: '2024-02-28',
    dateLabel: '28 February 2024',
    title: 'Screen Combat Stage-1 complete',
    category: 'Training',
    excerpt:
      'A weekend of unarmed combat, dagger fighting and swordplay. Thanks to everyone who made the course a pleasure to teach.',
    body: [
      'Screen Combat Stage-1 completed. A weekend of unarmed combat, dagger fighting and swordplay.',
      'Well done everyone. Thanks for the hard work, and for making the course so much fun to teach.',
    ],
  },
  {
    slug: 'axe-and-sword-masterclass',
    date: '2024-02-04',
    dateLabel: '4 February 2024',
    title: 'Masterclass: axe and sword',
    category: 'Masterclass',
    excerpt:
      'A full day of sword, axe and dual-wielding. See you on the next masterclass.',
    body: [
      'An absolutely awesome axe and sword training workshop. A whole day of sword, axe and dual-wielding.',
      'Well done to those who attended. See you on the next masterclass.',
    ],
  },
  {
    slug: 'screen-combat-standard-february',
    date: '2024-02-03',
    dateLabel: '3 February 2024',
    title: 'Screen Combat Standard',
    category: 'Training',
    excerpt:
      'Well done to the group who finished their screen combat intensive. Thank you for the effort.',
    body: [
      'Well done to this group for completing their screen combat intensive.',
      'It was great working with you all. Thanks for the effort.',
    ],
  },
  {
    slug: 'screen-combat-standard-january',
    date: '2024-01-28',
    dateLabel: '28 January 2024',
    title: 'New students for 2024',
    category: 'Training',
    excerpt:
      'The year opened with a Screen Combat Standard unarmed workshop. Welcome to the new students.',
    body: [
      'A fine way to open the year: the Screen Combat Standard unarmed workshop.',
      'Congratulations to our new students for 2024. Welcome to Stagefight. Looking forward to working with you again soon.',
    ],
  },
]

export function courseById(id) {
  return courses.find((course) => course.id === id)
}

export function newsBySlug(slug) {
  return news.find((item) => item.slug === slug)
}

export function formatPrice(price) {
  return `£${price.toFixed(2)}`
}
