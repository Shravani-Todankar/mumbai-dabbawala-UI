import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutValues from '../components/about/AboutValues';
import AboutTimeline from '../components/about/AboutTimeline';
import AboutTeam from '../components/about/AboutTeam';
import AboutCta from '../components/about/AboutCta';
import './About.css';

/**
 * About page — dummy content throughout (see data/content.js). First pass
 * was text-only after a set of editorial/agency-site references (noth.in,
 * ciaoenergy.com, madewithgsap.com and others) and read as too flat; this
 * pass adds back imagery, depth and hover/scroll motion while keeping the
 * layout language (numbered rows, roster list, horizontal timeline) that
 * pass established — a grain texture over the whole page, a photo behind the
 * hero statement, a side image in the story section, and per-row/per-card
 * hover reveals in Values/Timeline/Team. Still no StackSections/GlowCard —
 * those stay Home's own.
 */
export default function About() {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTimeline />
      <AboutTeam />
      <AboutCta />
    </div>
  );
}
