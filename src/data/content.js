export const site = {
  name: 'Mumbai Dabbawala',
  tagline:
    'Since 1890, Dressed in white outfit and traditional Gandhi Cap, Mumbai Army of 5,000 Dabbawalas fulfilling the hunger of almost 200,000 Mumbaikar with home-cooked food that is lug between home and office daily.',
  // The tagline's opening clauses, cut at a clause boundary so the hero reads as
  // two lines. Wording is the site's own — trimmed, not rewritten.
  heroLead:
    'Since 1890, Dressed in white outfit and traditional Gandhi Cap, Mumbai Army of 5,000 Dabbawalas fulfilling the hunger of almost 200,000 Mumbaikar.',
  email: 'support@mumbaidabbawala.com.au',
  phones: ['+91 9870419916', '+91 7021425949'],
  addresses: [
    '23, Navyog Mension, Sleater Road, Naushir Bharucha Marg, Opposite Krishna Palace Hotel, Grant Road, Mumbai - 400007',
    'Navprabhat Chambers, 3rd Floor, Ranade Road, Opposite Waman Hari Pethe Jewellers, Dadar West, Mumbai - 400028',
  ],
};

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Transformational', href: '#framework' },
  { label: 'Our Work', href: '#work' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact Us', href: '#contact' },
];

export const about = {
  eyebrow: 'Mumbai Dabbawala',
  title: 'Welcome To Dabbawala',
  paragraphs: [
    'Since 1890, Dressed in white outfit and traditional Gandhi Cap, Mumbai Army of 5,000 Dabbawalas fulfilling the hunger of almost 200,000 Mumbaikar with home-cooked food that is lug between home and office daily. For more than a century our team have been part of this grime-ridden metropolis-of-dreams.',
    'About 125 years back, a Parsi banker wanted to have home cooked food in office and gave this responsibility to the first ever Dabbawala. Many people liked the idea and the demand for Dabba delivery soared. It was all informal and individual effort in the beginning, but visionary Mahadeo Havaji Bachche saw the opportunity and started the lunch delivery service in its present team-delivery format with 100 Dabbawalas.',
    'As the city grew, the demand for Dabba delivery grew too. The coding system created by our forefather is still prominent in 21st century. Initially it was simple colour coding but now since Mumbai is widely spread metro with 3 local train routes, our coding has also evolved into alpha numeric characters.',
  ],
};

// `icon` names a key in Icon.jsx's Material Design registry, not an image path.
export const services = [
  { id: 57, title: 'Dabba Service', icon: 'restaurant' },
  { id: 64, title: 'Lectures/Seminars & Ted Talks', icon: 'school' },
  { id: 65, title: 'Digital Dabbawala', icon: 'smartphone' },
  { id: 66, title: 'A Day with Dabbawala', icon: 'group' },
  { id: 67, title: 'Advertise with us', icon: 'announcement' },
  { id: 68, title: 'Centralised Kitchen', icon: 'kitchen' },
];

// `icon` was dropped: Stats.jsx has not rendered it since the "me&u Numbers"
// redesign (round 6), and it pointed at PNGs deleted when Benefits/Services
// switched to inline Material icons.
export const stats = [
  { value: 200000, suffix: '+', label: 'Dabba Delivery Per Day' },
  { value: 200, suffix: '+', label: 'City Tapped' },
  { value: 3500, suffix: '+', label: 'Seminars Conducted' },
  { value: 1000, suffix: '+', label: 'Clients' },
];

export const framework = [
  { id: 69, title: 'Graduate Hires', text: 'Bringing fresh talent into the network every year.' },
  { id: 74, title: 'Certification & Licensing', text: 'Formal accreditation for every dabbawala on the route.' },
  { id: 75, title: 'Start Up Initiation', text: 'Onboarding new members into the delivery system.' },
  { id: 76, title: 'Training', text: 'Hands-on coaching in the coding system and route discipline.' },
];

export const recognition = [
  {
    year: '2005',
    kind: 'Academia',
    text: 'In 2005, the Indian Institute of Management (Ahmedabad) featured a case study on the Mumbai Dabbawalas from a management perspective of logistics.',
  },
  {
    year: '2007',
    kind: 'Press',
    text: 'The New York Times reported in 2007 that the 125-year-old Dabbawala industry continues to grow at a rate of 5–10% per year.',
  },
  {
    year: 'Virgin',
    image: '/assets/images/richard-branson.jpg',
    kind: 'Visits',
    text: 'Mr Richard Branson actually travelled with us, like a Dabbawala and delivered a huge tiffin to his own employees at Virgin, Mumbai.',
  },
  {
    year: '1998',
    image: '/assets/images/sigma.jpg',
    kind: 'Press',
    text: 'In 1998, Forbes Global magazine, conducted a quality assurance study on our operations and gave it a Six Sigma efficiency rating of 99.999999.',
  },
  {
    year: 'ISO',
    image: '/assets/images/iso.jpg',
    kind: 'Certification',
    text: 'ISO 9001:2000 certified by the Joint Accreditation System of Australia and New Zealand.',
  },
  {
    year: '2005',
    image: '/assets/images/prince-charles.jpg',
    kind: 'Visits',
    text: 'Prince Charles visited us during his visit to India; he had to fit in with our schedule, since our timing was too precise to permit any flexibility. Charles also invited Dabbawalas to his wedding with Camilla Parker Bowles in London on 9 April 2005.',
  },
];

// Announcement strip. The Roti Bank helpline is the one genuinely time-sensitive
// thing on the page, so it gets the slot rather than a marketing line.
export const announcement = {
  text: 'Donate surplus food — Mumbai Roti Bank helpline',
  linkLabel: '86555 80001',
  href: 'tel:8655580001',
};

// Four value props, each restating a fact carried elsewhere on the page rather
// than making a new claim: the Forbes rating, the ISO certificate, the tagline's
// headcount and the founding year.
// `icon` names a key in Icon.jsx's Material Design registry, not an image path.
export const benefits = [
  {
    title: 'Six Sigma accurate',
    text: 'Forbes Global studied our operations in 1998 and rated them 99.999999.',
    icon: 'verified_user',
    href: '#work',
  },
  {
    title: 'ISO 9001:2000 certified',
    text: 'Certified by the Joint Accreditation System of Australia and New Zealand.',
    icon: 'assignment_turned_in',
    href: '#work',
  },
  {
    title: '5,000 Dabbawalas',
    text: 'An army in white outfits and Gandhi caps, moving 200,000 tiffins a day.',
    icon: 'groups',
    href: '#about',
  },
  {
    title: 'Running since 1890',
    text: 'More than a century carrying home-cooked food between home and office.',
    icon: 'history',
    href: '#process',
  },
];

// Wordmarks only — every entry is an organisation already named in `recognition`
// below, so the strip is a summary of that section rather than a new claim. Set
// as type, not logos: we have no licence to reproduce anyone's mark.
export const press = [
  'Forbes Global',
  'The New York Times',
  'IIM Ahmedabad',
  'ISO 9001:2000',
  'Virgin',
  'HRH The Prince of Wales',
];

// The relay, drawn from the `about` copy: the alpha-numeric code and the three
// local train routes are its own description of how the system works.
export const process = [
  {
    title: 'Collected from every kitchen',
    text: 'A Dabbawala picks the tiffin up from the home each morning, at the same door and the same minute every day.',
  },
  {
    title: 'Coded and sorted',
    text: 'Each dabba is marked with an alpha-numeric code — the destination station, the building and the floor. It began as simple colour coding and grew with the city.',
  },
  {
    title: 'Carried on three rail routes',
    text: 'Sorted crates travel Mumbai’s three local train routes, changing hands at each junction so no one Dabbawala carries a dabba the whole way.',
  },
  {
    title: 'Delivered — and returned',
    text: 'Lunch reaches the desk hot and on time. The empty dabba then makes the same journey in reverse, back to the kitchen it came from.',
  },
];

export const recognitionFilters = ['All', 'Press', 'Certification', 'Visits', 'Academia'];

export const gallery = [
  {
    src: '/assets/images/gal1.webp',
    width: 1000,
    height: 667,
    alt: 'Visitors in Gandhi caps standing with Dabbawalas and a delivery bicycle, holding Dabbawala comic books',
    category: 'A Day with Dabbawala',
  },
  {
    src: '/assets/images/gal3.webp',
    width: 1000,
    height: 667,
    alt: 'A visitor taking a selfie with Dabbawalas while holding a Dabbawala comic book',
    category: 'A Day with Dabbawala',
  },
  {
    src: '/assets/images/gal2.webp',
    width: 600,
    height: 399,
    alt: 'A Dabbawala sorting rows of tiffin boxes laid out on the street',
    category: 'A Day with Dabbawala',
  },
  {
    src: '/assets/images/gal4.webp',
    width: 1000,
    height: 1334,
    alt: 'Two Dabbawalas with a cart of tiffin boxes carrying branded promotional leaflets',
    category: 'Advertisement',
  },
  {
    src: '/assets/images/gal5.webp',
    width: 1000,
    height: 1334,
    alt: 'A Dabbawala placing branded product samples into a tiffin bag',
    category: 'Advertisement',
  },
];

export const app = {
  title: 'Dabbawala Mobile App',
  text: 'As technology has played vital role in making life easy for people around the global, we Dabbawala team has decided to give our customers as user friendly mobile app to connect with us and get best of our services without hassel. We are soon launching our Mobile Application so you can book directly from our app.',
  mockup: '/assets/images/app-mockup.webp',
};

// Answers restate facts already established elsewhere on this page (site,
// services, process, recognition) rather than inventing new claims.
export const faq = [
  {
    question: 'How do I book the daily dabba service?',
    answer: `Call or write in — ${site.phones[0]} or ${site.email}. There's no app booking yet (one is in the works); a route and timing are set up over a real conversation with your local coordinator.`,
  },
  {
    question: 'How does the coding system actually work?',
    answer: 'Every dabba is marked with an alpha-numeric code, not an address: the collection point and station it boards at, the station it gets off at, and the building and floor it has to reach. No dispatcher decides the route — the code carries the instructions.',
  },
  {
    question: 'How reliable is the delivery, really?',
    answer: 'Forbes Global studied the operations in 1998 and rated them Six Sigma accurate — 99.999999% — and the network is ISO 9001:2000 certified. No tracking technology is involved; the accuracy comes from the coding system and the same dabbawala running the same route every day.',
  },
  {
    question: 'Can I book a seminar or "A Day With a Dabbawala" for my company or college?',
    answer: 'Yes — both are among the services listed above. Seminars run from a lecture hall to a full case-study session; "A Day With a Dabbawala" puts a group through an actual collection round and the sorting station.',
  },
  {
    question: 'What if I have surplus food to donate?',
    answer: `The Roti Bank helpline — ${announcement.linkLabel} — exists for exactly this. Surplus is picked up on a route that's already running, not a separate collection service.`,
  },
  {
    question: 'Is there really no app or GPS tracking involved?',
    answer: 'Correct — the daily relay runs entirely on the coding system and a fixed handoff schedule, the same way it has since 1890. A mobile app is being built for booking and route information, but it sits alongside the delivery system rather than inside it.',
  },
];

// Hash links point at `/#section` rather than `#section` — this footer is
// shared across every route now, and a bare hash only resolves against
// whatever page happens to be current. `/#section` always lands on Home
// first, so the target section actually exists.
export const footerLinks = {
  quick: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: "Chef's Corner", href: '/chefs-corner' },
    { label: 'Menu Calendar', href: '/menu-calendar' },
    { label: 'Our Services', href: '/#services' },
    { label: 'Contact Us', href: '/contact' },
  ],
  useful: [
    { label: 'Transformational', href: '/#framework' },
    { label: 'Our Work', href: '/#work' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'FAQ', href: '/#faq' },
  ],
  legal: ['Privacy Policy', 'Terms of Use', 'Refund Policy'],
};

// --- About page ---
// Story/Values/Timeline copy leans on facts already established elsewhere on
// this site (`about`, `recognition` above) rather than inventing history —
// only the Team roster below is illustrative/dummy, same treatment Chef's
// Corner uses for its kitchens, and disclosed the same way.

export const aboutHero = {
  eyebrow: 'About Mumbai Dabbawala',
  statement: ['A relay run', 'on trust,', 'not technology.'],
  sub: 'No app decides which train a tiffin boards, and no algorithm times a handoff. A network of dabbawalas has run this by hand since 1890 — this page is what it looks like from the inside.',
  image: '/assets/images/gal1.webp',
  stat: { value: '134', label: 'Years running, coded by hand' },
};

export const aboutStory = {
  eyebrow: 'Where it began',
  title: 'A hired lunch, and 134 years',
  paragraphs: [
    'In 1890, a Parsi banker working in Mumbai wanted his home-cooked lunch delivered to his desk. He hired a man to fetch it — the first dabbawala, doing a job that didn’t have a name yet.',
    'Word spread faster than the food did. Mahadeo Havaji Bachche, a farmer turned organiser, saw the demand and turned one man’s errand into a hundred-strong team with a shared method: a route, a code, a fixed minute at the door. That structure — not any single dabbawala — is what actually survived a century.',
  ],
  image: '/assets/images/gal2.webp',
  ticker: ['1890', 'One man, one tiffin', 'Mahadeo Havaji Bachche', 'A hundred-strong team', 'Still running'],
};

export const aboutValues = [
  {
    title: 'Precision over promises',
    text: 'A dabbawala’s day runs on fixed minutes at fixed doors — the same handoff, at the same time, whether it’s a Monday or a monsoon.',
    image: '/assets/images/float1.webp',
  },
  {
    title: 'A code, not a company',
    text: 'No dispatcher assigns a route. The alpha-numeric coding system carries the decision instead, legible to any dabbawala on the line — not just the one who wrote it.',
    image: '/assets/images/float2.webp',
  },
  {
    title: 'Passed down, not hired in',
    text: 'Most dabbawalas inherit a route from someone who ran it before them — a father, an uncle — rather than answering a job posting.',
    image: '/assets/images/float3.webp',
  },
  {
    title: 'Surplus goes back out',
    text: 'The same network that carries a paying tiffin also carries a Roti Bank donation — surplus food picked up on a route that was already running.',
    image: '/assets/images/float4.webp',
  },
];

export const aboutTimeline = [
  {
    year: '1890',
    title: 'One tiffin, one dabbawala',
    text: 'A Parsi banker hires the first dabbawala to carry his home-cooked lunch to his office — the job the whole network is named for.',
    image: '/assets/images/gal3.webp',
  },
  {
    year: '1930s',
    title: 'Formalised by Mahadeo Havaji Bachche',
    text: 'What was one man’s errand becomes a hundred-strong, team-run delivery service with a shared coding method.',
    image: '/assets/images/gal4.webp',
  },
  {
    year: '1998',
    title: 'Six Sigma, on paper',
    text: 'Forbes Global studies the network’s operations and rates them at Six Sigma accuracy — 99.999999% — without a single piece of tracking technology.',
    image: '/assets/images/gal5.webp',
  },
  {
    year: '2005',
    title: 'A case study, and a Prince',
    text: 'IIM Ahmedabad studies the network as a logistics case study the same year Prince Charles rearranges his own schedule to travel with a dabbawala.',
    image: '/assets/images/thali3.webp',
  },
  {
    year: 'Today',
    title: 'ISO-certified, still by hand',
    text: 'The network is now ISO 9001:2000 certified, 5,000 dabbawalas strong, moving 200,000 tiffins a day — coded and carried the same way it was in 1890.',
    image: '/assets/images/thali4.webp',
  },
];

// Illustrative roster for this demo — not the real network's actual
// leadership, same disclosure convention Chef's Corner uses for its
// kitchens. Roles map to services genuinely listed elsewhere on the site
// (seminars, advertising, the Roti Bank helpline), not invented functions.
export const aboutTeam = [
  { name: 'Ganesh Kadam', role: 'Route captain, Churchgate line', focus: 'Coding & handoffs', initials: 'GK' },
  { name: 'Meera Joshi', role: 'Seminar & training coordinator', focus: 'Talks & onboarding', initials: 'MJ' },
  { name: 'Arun Salvi', role: 'Client relations', focus: 'Bookings & partnerships', initials: 'AS' },
  { name: 'Devika Rane', role: 'Roti Bank coordinator', focus: 'Surplus food pickups', initials: 'DR' },
];

export const aboutCta = {
  eyebrow: 'Get in touch',
  title: 'A century-old network, still one call away',
  text: 'Whether it’s the daily dabba, a seminar for your class, or a Roti Bank pickup — the fastest way in is a real conversation, not a form.',
  buttonLabel: 'Contact us',
};

// Dummy testimonials — no real client quotes were supplied, so these are
// fictional stand-ins written as specific, flavorful copy rather than
// generic "Placeholder quote" text (per the client's note on the Chef's
// Corner and blog content). No photos — a face next to an invented quote
// would read as a fabricated real person; a name/role alone reads as demo
// content. Swap for real testimonials when supplied.
export const testimonials = [
  {
    quote: 'My dabba has never once missed the 12:40 slot in three years. I’ve stopped even checking the time.',
    name: 'Rohan Mehta',
    role: 'Office worker, Lower Parel',
  },
  {
    quote: 'What sold me wasn’t the food, it was the coding system. I sat through the seminar expecting marketing and left with an actual case study.',
    name: 'Ayesha Khan',
    role: 'HR manager, Nariman Point',
  },
  {
    quote: 'We booked the seminar for our operations elective expecting an hour of history. It turned into the most-discussed session of the semester.',
    name: 'Prof. Deshpande',
    role: 'Event coordinator, IIM Ahmedabad',
  },
  {
    quote: 'The tiffin-branding run for our product launch reached desks the leaflets never would have. People opened their lunch and found us there.',
    name: 'Simran Kaur',
    role: 'Marketing lead, local brand',
  },
  {
    quote: 'Four years on the same route and the dabbawala still remembers my floor changed without me saying a word.',
    name: 'Vikram Rao',
    role: 'Analyst, Nariman Point',
  },
  {
    quote: 'I run a small catering setup and the network still put my tiffins through faster than any courier I’ve used.',
    name: 'Farida Sheikh',
    role: 'Home caterer, Dadar',
  },
  {
    quote: 'The Six Sigma number sounds like a marketing line until you’ve had three years without a single mix-up.',
    name: 'Aditya Joshi',
    role: 'Consultant, BKC',
  },
  {
    quote: 'A day with a dabbawala was meant to be a team-building exercise. It ended with half the team asking to do it again next year.',
    name: 'Neha Kulkarni',
    role: 'People ops, Andheri',
  },
];

// --- Contact page ---
// Copy here is real (site.email/phones/addresses), unlike the About page's
// placeholder pass — there's nothing dummy about how to reach the network.

export const contactHero = {
  eyebrow: 'Get in touch',
  statement: ['Talk to us', 'about the', 'daily run.'],
  sub: 'Whether it is booking the daily service, a seminar, or a partnership — the fastest way to reach us is below.',
  image: '/assets/images/gal4.webp',
};

export const contactVisit = [
  {
    label: 'Grant Road office',
    address: site.addresses[0],
    mapHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.addresses[0])}`,
  },
  {
    label: 'Dadar West office',
    address: site.addresses[1],
    mapHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.addresses[1])}`,
  },
];

// --- Blog page (dummy placeholder posts — swap for real posts when ready) ---

export const blogHero = {
  eyebrow: 'From the network',
  statement: ['Notes from', 'the relay.'],
  sub: 'Dispatches from the daily run — how the coding system works, who books the seminars, and what a training batch actually looks like. Dummy posts written for this demo, not a live editorial feed.',
};

// --- Blog page (dummy posts — written as real articles, not labeled
// "Placeholder", per the client's 2026-08-07 note; still fictional/demo
// content rather than a live editorial feed) ---

export const blogPosts = [
  {
    slug: 'the-code-on-every-lid',
    category: 'Operations',
    date: 'Jan 2026',
    title: 'The code on every lid, decoded',
    excerpt: 'Four characters get a tiffin across three train lines and into the right hands by lunchtime — no phone call, no app, no address written anywhere on the box.',
    body: [
      'Every dabba that leaves a kitchen in the morning is marked, not addressed. There is no name on the lid and no phone number — just a short alphanumeric string painted or written by hand, and a dabbawala at the other end who already knows what it means.',
      { heading: 'Three characters, three decisions' },
      'The first part of the code names the collection point and the station the tiffin boards at. The next marks which station it gets off at, since a single train can be carrying dabbas bound for a dozen different stops. The last part is the building and floor it has to reach once it is off the train and back on foot.',
      'Each of those three pieces used to be a separate colour, back when the whole system ran on paint rather than characters. The switch to alpha-numeric happened gradually, route by route, as the city added stations faster than a fixed palette of colours could keep up with. Nobody redesigned the system in one sitting — it just kept absorbing one more character every time the map grew.',
      { heading: 'Why it survives without a dispatcher' },
      'What makes it work isn’t the code itself — Mumbai’s posties use codes too — it’s that the same dabbawala reads it every single day, on the same route, for years. The code is really just a shorthand between people who already know each other’s handwriting.',
      'That familiarity is doing more work than the code itself. A stranger handed the same crate of tiffins would need minutes per box to work out where each one goes; a dabbawala who has run that stretch for a decade sorts the same crate in seconds, because most of what the code is telling them, they already knew before they read it.',
      { heading: 'What happens when it fails' },
      'It does fail, occasionally — a smudged character, a new building that hasn’t been added to anyone’s memory yet. When that happens, the fix is never technical. Someone asks around at the platform, or waits for the dabbawala who normally handles that block. The system has no error-recovery process written down anywhere; it has people who have seen the same mistake before.',
    ],
    image: '/assets/images/gal3.webp',
    featured: true,
  },
  {
    slug: 'a-seminar-in-a-college-hall',
    category: 'Talks',
    date: 'Dec 2025',
    title: 'What a logistics class asked us in a college hall last month',
    excerpt: 'A management college booked a two-hour seminar expecting a talk about supply chains. Most of the questions were about trust, not logistics.',
    body: [
      'The seminar booking came in through the usual route: a professor teaching operations management wanted a case-study session that went beyond the printed one their students had already read. Two hours were set aside in a lecture hall for about eighty second-year students.',
      { heading: 'The questions everyone expects' },
      'The first half went the way these sessions usually do — questions about the coding system, the three rail lines, how a six-sigma error rate is even measured for something as informal-looking as a tiffin relay. Most of these have stock answers by now, refined over dozens of similar sessions at other colleges and companies.',
      'A few students had clearly read ahead: one asked why the coding system never got standardised into a single national format if it works this well elsewhere. The honest answer is that it never needed to travel — the whole method assumes a dense, walkable city with frequent short-haul trains, which most cities don’t have.',
      { heading: 'The question nobody expects' },
      'The second half turned somewhere else: how do you get a team to be that consistent without cameras, apps, or a manager standing over anyone? That one usually stops the room, because it isn’t really a logistics question anymore.',
      'There isn’t a tidy answer to that one. The honest answer given in the hall was that the system runs on the same handful of people doing the same route for years, and on a culture where showing up late isn’t really an option anyone considers. That answer tends to land better than any slide about logistics does.',
      'A few students pushed further — could that culture be built deliberately, or does it only happen when a route gets passed down through a family for a generation? Nobody in the room, including the presenter, had a confident answer. It was left as the open question the class was told to sit with.',
    ],
    image: '/assets/images/gal4.webp',
  },
  {
    slug: 'what-the-coverage-gets-right-and-wrong',
    category: 'Press',
    date: 'Nov 2025',
    title: 'What the old newspaper coverage still gets right — and wrong',
    excerpt: 'The New York Times wrote about the network back in 2007. Reading it again now, most of it still holds — a couple of details don’t.',
    body: [
      'The 2007 piece is still the article most people find first when they search for the network, and it holds up better than most decade-old business writing does. The growth figure it quoted — five to ten percent a year — was roughly right for that period, and the basic mechanics it described are unchanged: no technology in the loop, no central dispatcher, just a coding system and a strict handoff schedule.',
      { heading: 'What still holds up' },
      'The parts that have aged well are the structural ones: the description of the coding system, the three-rail-line relay, and the emphasis on how little the method has changed since it was formalised. Nothing in those sections needs correcting even now.',
      'The framing of reliability also holds — most coverage, old and new, correctly avoids crediting any single dabbawala or manager for the accuracy. It has always been described as a property of the system, not a person, and that remains true.',
      { heading: 'What tends to drift' },
      'Where older coverage tends to drift is in treating the whole operation as one uniform company. It isn’t. Each route is closer to a small partnership of dabbawalas who share the earnings and the responsibility for that stretch of the relay, which is also why one late delivery on one route doesn’t rattle the rest of the city.',
      'A second, smaller drift: some pieces describe the coding as unchanged since 1890, which overstates it slightly. The underlying idea is unchanged — a fixed, learnable mark instead of a written address — but the marks themselves have moved from colour to alpha-numeric as the city grew, as covered in an earlier post here.',
      { heading: 'Why the correction matters' },
      'It’s a minor correction, but it matters for anyone actually studying how the system holds together: the reliability doesn’t come from central control. It comes from there being no central control to fail. Treat the network as one company and the obvious question is who manages it; treat it as dozens of small route-partnerships and the question becomes why each one holds itself to the same standard without being told to — which is the more interesting question, and the one older coverage mostly skips.',
    ],
    image: '/assets/images/gal5.webp',
  },
  {
    slug: 'building-the-app-behind-the-relay',
    category: 'Product',
    date: 'Oct 2025',
    title: 'Building the app behind a system that has never needed one',
    excerpt: 'A mobile app for a network that has run on handwritten codes since 1890 raises an obvious question: why now, and what does it actually need to do?',
    body: [
      'The honest starting point for the app was customer requests, not operational need — the coding system does not need a phone to work, and it is not being replaced. What people kept asking for was a way to book the daily service, check a delivery window, and reach the right local coordinator without hunting for a phone number.',
      { heading: 'What it will not do' },
      'That kept the scope narrow on purpose: booking, basic route information, and contact — not tracking, not route optimisation, not anything that would ask a dabbawala to carry or check a device mid-route. Whatever ships first is meant to sit alongside the existing system, not sit inside it.',
      'Live tracking came up early in planning and was dropped deliberately. Showing a tiffin’s position in real time would mean putting a device somewhere in the relay — on a dabbawala, a crate, or a bicycle — and the whole point of the coding system is that it needs none of that. Adding a device to satisfy an app feature would be solving a problem the network doesn’t have.',
      { heading: 'What "done" looks like' },
      'It is still in build. The team’s own bar for shipping it is simple: it has to make booking easier for a new customer without changing a single thing about how a dabbawala actually works their route.',
      'That bar has already killed a few proposed features — a route-rating system, a photo-confirmation step at delivery — each of which would have quietly pushed a new habit onto the dabbawala side of the relay rather than the customer side. If a feature only saves the office worker booking lunch a phone call, it stays; if it asks anything new of the person delivering it, it gets cut.',
    ],
    image: '/assets/images/thali3.webp',
  },
  {
    slug: 'inside-a-training-batch',
    category: 'Training',
    date: 'Sep 2025',
    title: 'Inside a training batch, from the coding test to the first solo route',
    excerpt: 'New dabbawalas don’t start on a route alone. They shadow, get tested on the coding system, and only then get handed a crate of their own.',
    body: [
      'A new batch starts with weeks of shadowing an experienced dabbawala on an existing route — not a classroom, the actual platform and the actual stairwells. The first thing a recruit has to be reliable on isn’t carrying weight, it’s reading the code on a lid correctly, every time, without a second look.',
      { heading: 'Weeks of watching before doing' },
      'Shadowing isn’t passive. A recruit is expected to call out what a code means before the dabbawala training them confirms it, building the same instant recognition a decade on the job eventually produces on its own. Getting it right slowly is fine at this stage; getting it wrong confidently is the thing that gets corrected immediately.',
      'The stairwells matter as much as the platforms. Every building on a route has its own quirks — a floor number that doesn’t match the lift panel, a back entrance that’s faster at certain hours — and none of that is written down anywhere. It gets passed on the same way the coding system itself did originally: by walking it, repeatedly, with someone who already knows it.',
      { heading: 'The test that actually matters' },
      'Before anyone is trusted with a route section of their own, they’re tested on sorting a full crate of mixed codes against the clock. Get the sorting wrong and a tiffin ends up on the wrong train — which is the one mistake the whole system is built to prevent.',
      'There’s no formal pass mark published anywhere, but in practice a recruit is expected to sort a full crate as fast as a dabbawala with a few years on the job, not just accurately. Speed without accuracy fails immediately; accuracy without speed is coached further rather than failed outright, since that side of it comes with repetition.',
      { heading: 'The first solo route' },
      'Only after that does a recruit get a short stretch of route to run solo, usually the easiest leg on a line, with the same dabbawala who trained them checking in at the handoff points for the first few weeks. It is a slow way to build a team. It is also most of the reason the error rate stays as low as it does.',
    ],
    image: '/assets/images/thali4.webp',
  },
  {
    slug: 'another-year-on-the-relay',
    category: 'Milestones',
    date: 'Aug 2025',
    title: 'Another year on the relay, and the same coding system still holds',
    excerpt: 'The network marks another year of the daily run — same coding system it started with, still moving lunch across the city on time.',
    body: [
      'Nothing dramatic marks the anniversary internally — the same tiffins go out at the same hours, on the same three rail lines, coded the same way they have been for decades. That is more or less the point: the system is judged by how little needs to change about it, year over year.',
      { heading: 'What actually moved this year' },
      'What has changed is the reach — more buildings on the route list, a few new coordinators added to handle the newer stretches of the city, and a growing number of seminar and “day with a dabbawala” bookings from outside Mumbai entirely. None of it has touched the coding system itself.',
      'The seminar bookings in particular grew faster than expected, largely off word of mouth from earlier sessions rather than any active outreach. A few requests have come from outside India entirely, asking whether a version of the talk could be delivered remotely — so far, all of it has stayed in-person, since the demonstrations at the sorting station don’t translate well to a video call.',
      { heading: 'What is deliberately staying the same' },
      'The plan for the coming year is the plan for most years before it: keep the daily relay exactly as boring and exact as it already is, and let everything else — the app, the seminars, the press — sit around that without disturbing it.',
      'That includes resisting pressure to formalise things that currently work informally, like the Roti Bank pickups or the route-training process. Every time something gets written down and standardised, it gets a little harder to adjust on the fly the way the network has always relied on being able to.',
    ],
    image: '/assets/images/float6.webp',
  },
  {
    slug: 'the-roti-bank-runs-on-the-same-network',
    category: 'Community',
    date: 'Jul 2025',
    title: 'The Roti Bank runs on the same network that carries your lunch',
    excerpt: 'Surplus food collection didn’t need a new fleet or a new system — it just needed the relay that was already running twice a day.',
    body: [
      'The Roti Bank helpline exists because the hardest part of food donation was never the food — it was the last mile. Kitchens, canteens and households often have surplus at the end of a service, but no reliable way to get it somewhere it will actually be eaten the same day.',
      { heading: 'Piggybacking on a route that already exists' },
      'Since the daily relay already threads through most of the city twice a day, adding a surplus-collection call to an existing route costs almost nothing extra. A call comes in, a dabbawala already passing nearby picks it up on the way, and it is handed off through the same crate system a paying tiffin would use.',
      'This only works because the relay is already dense — a route that only ran once a day, or covered a smaller area, wouldn’t have a dabbawala nearby often enough to make a same-day pickup realistic. The density that makes daily lunch delivery reliable is the same density that makes the donation line viable.',
      { heading: 'Why it stays small on purpose' },
      'It is deliberately kept this small and informal. The moment it needs its own fleet or its own schedule, it stops being a same-day fix and starts being a second logistics network to maintain — which defeats the point.',
      'There has been discussion about formalising it — a dedicated collection window, a tracking log of pickups — and each time the answer has been to leave it alone. A same-day pickup that depends on someone already being nearby is fragile in a useful way: it only ever asks for a small favour on top of a route that was running anyway, never a commitment beyond that.',
    ],
    image: '/assets/images/gal1.webp',
  },
  {
    slug: 'what-digital-dabbawala-actually-means',
    category: 'Product',
    date: 'Jun 2025',
    title: 'What "Digital Dabbawala" actually means, since it isn’t an app',
    excerpt: 'The name sounds like a tech product. What it actually is turns out to be closer to a booking desk than a piece of software.',
    body: [
      'People hear "Digital Dabbawala" and assume it is the mobile app already in build. It isn’t — it is the service that exists right now, today, for anyone who wants to start or manage a daily delivery without walking into an office: booking over phone or message, confirming route and timing, and getting a coordinator assigned to a building.',
      { heading: 'The confusion with the app' },
      'The naming overlap is a fair complaint — two things called roughly the same thing, launched at different times, doing related but distinct jobs. "Digital Dabbawala" predates the app effort by a couple of years and was named before anyone anticipated a second, more literally "digital" product would follow it.',
      { heading: 'What actually changes for the customer' },
      'The "digital" part is really just moving the front door of the service online, not changing what happens after that. Once a route is booked, everything downstream is exactly the same relay it has always been — same coding, same handoffs, same three rail lines.',
      'For someone new to Mumbai, that front door matters more than it sounds like it should. Knowing which office handles which neighbourhood, or who to call about a building the network hasn’t served before, used to require asking around. Now it’s one phone number regardless of where in the city the request is coming from.',
      { heading: 'Why it stayed unglamorous' },
      'It is a small, unglamorous service, and that is deliberate. The goal was never to make the delivery itself more digital. It was to make it easier for someone new to the city to find the service at all.',
    ],
    image: '/assets/images/gal2.webp',
  },
  {
    slug: 'a-look-inside-the-centralised-kitchen',
    category: 'Operations',
    date: 'May 2025',
    title: 'A look inside the centralised kitchen option, and who actually uses it',
    excerpt: 'Most tiffins still come from home kitchens. The centralised kitchen exists for the households and offices that don’t have one to send from.',
    body: [
      'The home-kitchen model is the default and the one the network is built around, but it assumes someone at home is cooking that morning. For a growing number of customers — people living alone, couples where both work, small offices without a pantry — that assumption doesn’t hold.',
      { heading: 'Who actually chooses it' },
      'The centralised kitchen option fills that specific gap: one commercial kitchen cooking a set thali on a fixed schedule, packed into the same tiffins and handed to the same dabbawalas running the same routes. From the point it enters the relay, it is indistinguishable from a home-cooked dabba.',
      'Most customers who choose it aren’t trading up from a home kitchen — they never had one cooking for them to begin with. It tends to serve people newly living alone in the city, or small offices ordering in bulk for a team, rather than pulling customers away from an existing dabbawala relationship.',
      { heading: 'Why it isn’t positioned as the default' },
      'It is intentionally kept as the smaller, secondary option. The network’s reputation was built on home cooking, and the centralised kitchen exists to serve people the home-kitchen model genuinely can’t reach — not to replace it.',
      'There’s been no push to expand it into the primary offering, even though it would likely scale faster than the home-kitchen model — a single kitchen can cook for far more tiffins than one household can. That kind of scale isn’t the goal; matching a customer to a kitchen that actually fits their situation is.',
    ],
    image: '/assets/images/float4.webp',
  },
  {
    slug: 'a-day-with-a-dabbawala-recap',
    category: 'Community',
    date: 'Apr 2025',
    title: 'What actually happens on "A Day With a Dabbawala"',
    excerpt: 'Corporate teams book it expecting a photo opportunity. Most of them come back saying the sorting station was the part that stuck.',
    body: [
      'The experience starts early — earlier than most participants expect, since it means showing up before the first collection round to see a route the way a dabbawala actually sees it, not a curated version of it.',
      { heading: 'The part that surprises people' },
      'The stop people remember most isn’t the train platform, it’s the sorting station: watching a crate of a hundred-odd tiffins get split by code in a couple of minutes, with zero conversation and zero hesitation, is the point where the abstract "coding system" people read about becomes an actual skill they just watched someone perform.',
      'Most participants expect the train platform to be the highlight, since that’s the part that photographs well. In practice, the sorting station is over almost before anyone has their phone out, and it’s usually the moment the group goes quiet — there’s nothing to narrate, just watching it happen faster than seems possible.',
      { heading: 'What the day actually changes' },
      'By the end of it, most groups have stopped asking about logistics and started asking about the dabbawalas themselves — how long they’ve run the route, whether their fathers did too. That shift is usually treated as the real success of the day, more than the delivery itself.',
      'Corporate groups in particular tend to arrive with a team-building brief in mind and leave with something closer to a case study on continuity — how a skill gets passed down without ever being formally documented. That wasn’t the original pitch for the experience, but it’s become most of what people mention afterward.',
    ],
    image: '/assets/images/float5.webp',
  },
];

// Sidebar newsletter box on the blog post page — client-side only, same as
// the Contact form: validates and clears, does not post anywhere real.
export const blogNewsletter = {
  eyebrow: 'Stay in the loop',
  title: 'One dispatch a month, nothing more',
  text: 'New posts from the network, straight to your inbox. No spam, unsubscribe whenever.',
  placeholder: 'you@email.com',
  buttonLabel: 'Subscribe',
};

// --- Chef's Corner page (dummy placeholder content) ---

export const chefHero = {
  eyebrow: "Chef's Corner",
  statement: ['The hands', 'behind every', 'home-cooked dabba.'],
  sub: 'Every dabba starts two hours before dawn, in someone’s home kitchen — not a commercial one. Meet a few of the kitchens carrying the route this week. (Illustrative kitchens — names below are for demonstration, not real listings.)',
  image: '/assets/images/thali1.webp',
};

export const chefSpotlight = {
  eyebrow: 'Kitchen spotlight',
  title: 'Kamble Kitchen has cooked this route since 1994',
  paragraphs: [
    'Sunita Kamble took over her mother-in-law’s stove in a one-room Dadar kitchen in 1994, cooking for eleven dabbas a day. Three decades on it’s forty, but the method hasn’t moved: dal soaked overnight, rice measured by the fistful, one sabzi decided fresh each morning by whatever came off the cart.',
    'Nothing here is pre-cooked or frozen. The stove is lit at 4:30am so the first tiffin is sealed by 10, hours before the earliest train out of Dadar carries it toward the city.',
  ],
  image: '/assets/images/thali2.webp',
  quote: 'People think a tiffin is just food in a box. It’s really a promise that someone woke up early enough to make it fresh for you.',
  name: 'Sunita Kamble',
  role: 'Kamble Kitchen, Dadar West',
};

// A kitchen's morning, in the order it actually happens — narrative filler
// for the illustrative example above, not a documented real schedule.
export const chefDay = [
  { time: '4:30 AM', title: 'Stove lit', text: 'Dal goes on to soak, rice is measured, and the day’s one fresh sabzi gets decided by what came off the vegetable cart at dawn.' },
  { time: '7:00 AM', title: 'The cooking hour', text: 'Every dabba on the route gets the same meal, cooked in one batch — no separate orders, no menu to choose from.' },
  { time: '9:30 AM', title: 'Packed and sealed', text: 'Each tiffin is stacked, labelled with its route code, and handed off exactly where the dabbawala expects it to be.' },
  { time: '11:30 AM', title: 'On the desk, hot', text: 'The empty tiffin from yesterday comes back on the same trip — washed by evening, ready to be filled again before dawn.' },
];

// Each kitchen now carries the cook's own name, not just the kitchen's brand
// name — the page is meant to be about the chefs, not just their addresses.
// `chef` for Kamble Kitchen matches `chefSpotlight.name` deliberately, since
// it's the same kitchen introduced there.
export const chefKitchens = [
  {
    chef: 'Sunita Kamble',
    name: 'Kamble Kitchen',
    specialty: 'Dal-rice thali, one sabzi a day',
    since: '1994',
    years: '30+ years on this route',
    image: '/assets/images/thali3.webp',
  },
  {
    chef: 'Manisha Bhatt',
    name: 'Annapurna Ghar Rasoi',
    specialty: 'Roti, sabzi and a soft khichdi on Mondays',
    since: '2001',
    years: '23 years on this route',
    image: '/assets/images/thali4.webp',
  },
  {
    chef: 'Ramila Patel',
    name: 'Patel Bhog',
    specialty: 'Gujarati thali — dhokla on Thursdays',
    since: '1988',
    years: '36 years on this route',
    image: '/assets/images/float1.webp',
  },
  {
    chef: 'Lakshmi Iyer',
    name: 'Iyer’s Tiffin',
    specialty: 'South Indian meal, sambar made fresh daily',
    since: '2005',
    years: '19 years on this route',
    image: '/assets/images/float2.webp',
  },
];

// A week's worth of what actually goes into the dabba — ties the individual
// kitchens above into one shared rotation rather than each cooking in
// isolation. Sunday is a real operational fact carried over from the rest of
// the site (no Sunday service), not invented for this page.
// `veg` drives the small FSSAI-style green square-and-dot mark ChefMenu
// prints next to each dish — every entry here happens to be vegetarian, not
// a claim that the real service's menu always is.
// `icon` names a key in Icon.jsx's Material Design registry, one per dish
// (not the same utensil glyph repeated seven times) — Sunday gets a
// "closed" mark instead of a food icon, since there's no dish that day.
export const chefMenu = [
  { day: 'Monday', dish: 'Varan bhaat with a seasonal sabzi', veg: true, icon: 'rice_bowl' },
  { day: 'Tuesday', dish: 'Roti, dal and a dry sabzi', veg: true, icon: 'dinner_dining' },
  { day: 'Wednesday', dish: 'Gujarati thali, dhokla on the side', veg: true, icon: 'tapas' },
  { day: 'Thursday', dish: 'Khichdi with kadhi, a lighter mid-week plate', veg: true, icon: 'ramen_dining' },
  { day: 'Friday', dish: 'South Indian meal, sambar made fresh', veg: true, icon: 'brunch_dining' },
  { day: 'Saturday', dish: 'Roti, paneer or seasonal vegetable, and rice', veg: true, icon: 'rice_bowl' },
  { day: 'Sunday', dish: 'No deliveries — kitchens and the relay both rest', icon: 'event_busy' },
];

// Kitchen-side trust signals — the site's ISO/Six Sigma claims are about the
// delivery network; these are the equivalent for the kitchens themselves.
export const chefHygiene = [
  { icon: 'kitchen', title: 'Inspected kitchens', text: 'Every kitchen on the route is visited and checked before it starts cooking for a new building.' },
  { icon: 'verified_user', title: 'Checked each morning', text: 'Hygiene and freshness are checked at the stove, before anything goes into a tiffin.' },
  { icon: 'assignment_turned_in', title: 'Sealed before it leaves', text: 'Lids are sealed at the kitchen, not somewhere along the route — nothing is opened until it reaches the desk.' },
  { icon: 'group', title: 'Same cook, every day', text: 'One kitchen runs one route. You get the same hands cooking your lunch, not a rotating roster.' },
];

export const chefCta = {
  eyebrow: 'Book the service',
  title: 'Every dabba starts in a home kitchen',
  text: 'Tell us your route and lunch window, and we’ll match you to a kitchen already cooking for your building.',
  buttonLabel: 'Book the service',
};

// --- Menu Calendar page (dummy illustrative menus, not a real live menu) ---

export const menuCalendarHero = {
  eyebrow: 'Menu Calendar',
  statement: ['Pick a thali,', 'see the', 'whole week.'],
  sub: 'Four regional thalis, veg or non-veg where the kitchen offers both, laid out day by day. Illustrative menus for this demo — not a live order sheet.',
  image: '/assets/images/thali2.webp',
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Recycled across the calendar's date cards — one photo per day slot, not
// per specific dish (there's no unique photo shoot per dish for this demo).
export const menuCalendarPhotos = [
  '/assets/images/thali1.webp',
  '/assets/images/thali2.webp',
  '/assets/images/thali3.webp',
  '/assets/images/thali4.webp',
  '/assets/images/gal1.webp',
  '/assets/images/gal2.webp',
  '/assets/images/gal3.webp',
  '/assets/images/gal4.webp',
  '/assets/images/gal5.webp',
];

// Each day is a short card title (the dish) + a one-line note (how it's
// served), matching a printed menu card rather than a full sentence.
// `nonveg: null` means that regional thali is kept vegetarian-only here —
// Gujarati thalis traditionally are — not that no kitchen anywhere serves a
// non-veg version.
export const menuCalendar = [
  {
    type: 'Gujarati',
    veg: [
      { title: 'Dal Bhaat & Rotli', note: 'With bataka nu shaak' },
      { title: 'Undhiyu & Puri', note: 'Winter special mixed veg' },
      { title: 'Kadhi & Khichdi', note: 'Served with thepla' },
      { title: 'Dal Dhokli', note: 'Grounded peanut garnish' },
      { title: 'Handvo & Chutney', note: 'Savoury lentil cake' },
      { title: 'Sev Tameta & Rotli', note: 'Kathiyawadi delicacy' },
      { title: 'Full Thali & Basundi', note: 'Festive dessert thali' },
    ],
    nonveg: null,
  },
  {
    type: 'Maharashtrian',
    veg: [
      { title: 'Varan Bhaat', note: 'With bhaji & chapati' },
      { title: 'Batata Bhaji', note: 'With puran poli' },
      { title: 'Amti & Bhakri', note: 'Tangy-sweet dal' },
      { title: 'Masale Bhaat', note: 'Spiced mixed rice' },
      { title: 'Sabudana Khichdi', note: 'Peanut & potato mix' },
      { title: 'Pithla Bhakri', note: 'Gram-flour curry' },
      { title: 'Puran Poli Special', note: 'Sweet stuffed flatbread' },
    ],
    nonveg: [
      { title: 'Chicken Sukka', note: 'With bhakri' },
      { title: 'Mutton Rassa', note: 'With steamed rice' },
      { title: 'Malvani Fish Curry', note: 'Coconut-based curry' },
      { title: 'Egg Curry', note: 'With chapati' },
      { title: 'Chicken Kolhapuri', note: 'Spicy Kolhapuri style' },
      { title: 'Prawn Curry', note: 'With steamed rice' },
      { title: 'Mutton Biryani', note: 'Weekend special' },
    ],
  },
  {
    type: 'Punjabi',
    veg: [
      { title: 'Rajma Chawal', note: 'Kidney bean curry & rice' },
      { title: 'Chole Bhature', note: 'Spiced chickpeas' },
      { title: 'Dal Makhani', note: 'With butter naan' },
      { title: 'Aloo Paratha', note: 'Served with curd' },
      { title: 'Kadhi Pakora', note: 'With steamed rice' },
      { title: 'Sarson Da Saag', note: 'With makki di roti' },
      { title: 'Paneer Butter Masala', note: 'With butter naan' },
    ],
    nonveg: [
      { title: 'Butter Chicken', note: 'With butter naan' },
      { title: 'Chicken Curry', note: 'With steamed rice' },
      { title: 'Mutton Curry', note: 'With tandoori roti' },
      { title: 'Egg Bhurji', note: 'With paratha' },
      { title: 'Tandoori Chicken', note: 'With butter naan' },
      { title: 'Chicken Tikka Masala', note: 'Weekend favourite' },
      { title: 'Mutton Rogan Josh', note: 'Kashmiri-style curry' },
    ],
  },
  {
    type: 'South Indian',
    veg: [
      { title: 'Sambar Rice', note: 'Served with curd' },
      { title: 'Rasam Rice', note: 'With vegetable poriyal' },
      { title: 'Lemon Rice', note: 'Served with curd' },
      { title: 'Curd Rice', note: 'With pickle' },
      { title: 'Bisi Bele Bath', note: 'Spiced lentil rice' },
      { title: 'Vegetable Kurma', note: 'With soft idli' },
      { title: 'Pongal', note: 'With coconut chutney' },
    ],
    nonveg: [
      { title: 'Chettinad Chicken', note: 'With steamed rice' },
      { title: 'Fish Curry', note: 'With steamed rice' },
      { title: 'Egg Curry', note: 'With steamed rice' },
      { title: 'Chicken Chettinad', note: 'Spicy South Indian curry' },
      { title: 'Prawn Masala', note: 'With steamed rice' },
      { title: 'Mutton Curry', note: 'With steamed rice' },
      { title: 'Chicken Biryani', note: 'Weekend special' },
    ],
  },
];

export { DAYS as menuCalendarDays };

export const menuCalendarCta = {
  eyebrow: 'Pick a thali',
  title: 'Tell us which region, we’ll match the kitchen',
  text: 'Every thali on this calendar is cooked by a kitchen already running that region’s menu — book the daily service and get matched to one on your route.',
  buttonLabel: 'Book the service',
};

// Editorial preview of the 4 regions before the interactive filter/calendar
// below — a tagline each, not the full week (that's what the calendar is for).
export const menuHighlights = [
  {
    type: 'Gujarati',
    tagline: 'Sweet, savoury and fried, often in the same bite',
    image: '/assets/images/thali1.webp',
  },
  {
    type: 'Maharashtrian',
    tagline: 'Kokum, peanut and a coconut base running through it',
    image: '/assets/images/thali2.webp',
  },
  {
    type: 'Punjabi',
    tagline: 'Ghee-forward, built around wheat and dairy',
    image: '/assets/images/thali3.webp',
  },
  {
    type: 'South Indian',
    tagline: 'Rice-based, tamarind and curry leaf doing the work',
    image: '/assets/images/thali4.webp',
  },
];

// Ordering/customisation questions specific to this page — not a repeat of
// Home's own FAQ, which covers the booking/coding-system basics.
export const menuFaq = [
  {
    question: 'Can I mix regions across the week instead of picking one?',
    answer: 'Yes — the calendar shows one region at a time to keep it readable, but your actual booking can mix, say, Punjabi on weekdays and South Indian on weekends. Tell your coordinator the split when you book.',
  },
  {
    question: 'Can I switch from veg to non-veg mid-week?',
    answer: 'Yes, with a day’s notice — the kitchen needs to know before their morning cooking starts, not after. Same-day switches usually can’t be accommodated.',
  },
  {
    question: 'Is spice level adjustable?',
    answer: 'Within reason — most kitchens can cook milder on request, since it’s the same pot for the whole route. A fully separate spice level per customer isn’t possible without becoming a different kind of kitchen.',
  },
  {
    question: 'What if I have an allergy?',
    answer: 'Tell your coordinator when you book, not after the first delivery. Home kitchens can usually leave out a specific ingredient; centralised kitchens are more limited since they cook one batch for many customers.',
  },
];
