export const site = {
  name: 'Mumbai Dabbawala',
  tagline:
    'Since 1890, Dressed in white outfit and traditional Gandhi Cap, Mumbai Army of 5,000 Dabbawalas fulfilling the hunger of almost 200,000 Mumbaikar with home-cooked food that is lug between home and office daily.',
  // The tagline's opening clauses, cut at a clause boundary so the hero reads as
  // two lines. Wording is the site's own — trimmed, not rewritten.
  heroLead:
    'Since 1890, Dressed in white outfit and traditional Gandhi Cap, Mumbai Army of 5,000 Dabbawalas fulfilling the hunger of almost 200,000 Mumbaikar.',
  email: 'info@mumbaidabbawala.in',
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
  { id: 69, title: 'Graduate Hires' },
  { id: 74, title: 'Certification & Licensing' },
  { id: 75, title: 'Start Up Initiation' },
  { id: 76, title: 'Training' },
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

export const footerLinks = {
  quick: [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'How It Works', href: '#process' },
    { label: 'Our Services', href: '#services' },
    { label: 'Contact Us', href: '#contact' },
  ],
  useful: [
    { label: 'Transformational', href: '#framework' },
    { label: 'Our Work', href: '#work' },
    { label: 'Gallery', href: '#gallery' },
  ],
  legal: ['Privacy Policy', 'Terms of Use', 'Refund Policy'],
};
