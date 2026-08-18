import ContactHero from '../components/contact/ContactHero';
import ContactSection from '../components/Contact';
import ContactVisit from '../components/contact/ContactVisit';

/**
 * Dedicated Contact page. The form + phone/email/address list is Home's own
 * `Contact` component, reused as-is rather than duplicated — it's a working
 * form with real validation, not a decorative layout choice the way
 * StackSections/GlowCard were, so there's no reason to rebuild it. Only the
 * hero and the map-link cards below are page-specific.
 */
export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <ContactVisit />
    </>
  );
}
