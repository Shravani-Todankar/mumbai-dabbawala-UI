/**
 * Content for the "Mumbai Dabbawala 2.0" waitlist page (route: /waitlist).
 * Kept separate from content.js since this is a fictional sub-brand, not the
 * real site's copy — see BUILD_LOG.md for the authorization note on that page.
 */
export const waitlistHero = {
  titleLines: ['Lunch, delivered', 'with precision.'],
  lead:
    "A modern evolution of Mumbai's legendary dabbawala system — human reliability joined to smart coordination, for office lunch delivery across the city.",
  note: 'Be among the first to experience the next generation of lunch delivery.',
};

export const waitlistWhy = {
  eyebrow: 'Why Mumbai Dabbawala 2.0',
  heading: 'Built for precision.',
  rows: [
    {
      claim: 'Zero missed deliveries. Ever.',
      body:
        'Every tiffin carries a code painted the same way a real dabbawala marks a lid — origin, carrier, corridor, destination. Nothing moves without one, and the relay stays 99.9993% on-time because of it.',
    },
    {
      claim: 'Built on decades of Mumbai trust + modern coordination.',
      body:
        '"You learn the whole line by walking it. The code on the lid is the only thing that has to be right." — a Vile Parle route carrier, 14 years on the relay.',
    },
    {
      claim: 'Hot, fresh, and on-time — every single day.',
      body:
        'Kitchens hold to a single collection window; the relay holds to a single delivery window between 11:00 and 13:00. Neither moves.',
    },
  ],
};

export const waitlistCta = {
  stats: [
    { value: '1890', label: 'Origin of the relay' },
    { value: '5,000+', label: 'Carriers on the network' },
    { value: '200,000+', label: 'Lunches, daily' },
  ],
};

/** Service launches in Perth first, so the suburb field is scoped to Perth. */
export const perthSuburbs = [
  'Perth CBD',
  'Northbridge',
  'East Perth',
  'West Perth',
  'South Perth',
  'Subiaco',
  'Leederville',
  'Mount Lawley',
  'Victoria Park',
  'Fremantle',
  'Cottesloe',
  'Claremont',
  'Nedlands',
  'Scarborough',
  'Joondalup',
  'Morley',
  'Cannington',
  'Osborne Park',
  'Balcatta',
  'Bentley',
];

export const waitlistModalCopy = {
  title: 'Complete your waitlist spot',
  intro: 'A few details so we can match you to a route when service opens.',
  emailLabel: 'Email address',
  phoneLabel: 'Phone number',
  phoneHint: 'Australian mobile — 9 digits after +61, e.g. 412 345 678.',
  suburbLabel: 'Suburb',
  suburbOptional: 'Optional',
  suburbHint: 'Perth metro only — that is where service opens first.',
  suburbPlaceholder: 'Start typing a Perth suburb',
  preferenceLabel: 'Meal preference',
  preferenceHint: 'You can change this any time before launch.',
  options: [
    { id: 'veg', label: 'Vegetarian' },
    { id: 'nonveg', label: 'Non-vegetarian' },
  ],
  submit: 'Confirm my spot',
  close: 'Close',
  errorEmail: 'Enter a valid email address, like name@company.com.',
  errorPhone: 'Enter a valid Australian mobile number.',
  errorSuburb: 'Choose a suburb from the Perth metro list, or leave it blank.',
  loadingAnnouncement: 'Confirming your waitlist spot.',
  errorTransport: "We couldn't confirm your spot. Check your connection and try again.",
};

export const waitlistCopy = {
  label: 'Work email',
  placeholder: 'you@company.com',
  hint: 'Demo: submit any address ending in .test to see the failure state.',
  cta: 'Join the Waitlist',
  loadingAnnouncement: 'Adding you to the waitlist.',
  errorEmpty: 'Enter your email address to join the waitlist.',
  errorFormat: 'Enter a valid email address, like name@company.com.',
  errorLength: 'That email address is too long.',
  errorTransport: "We couldn't add you to the waitlist. Check your connection and try again.",
  successHeading: "You're on the list.",
  successBody:
    "Welcome to the future of Mumbai Dabbawala. We'll notify you when service launches in your area.",
  successReceipt: 'MANIFEST DW2-0417 · QUEUED',
};
