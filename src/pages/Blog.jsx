import BlogHero from '../components/blog/BlogHero';
import BlogGrid from '../components/blog/BlogGrid';

/**
 * Blog landing page — dummy posts throughout (see data/content.js). Same
 * page-family treatment as About/Contact (shared eyebrow/statement heading
 * pattern, useSectionFx reveals) but its own hero (no photo, see BlogHero)
 * and its own featured-post + grid layout.
 */
export default function Blog() {
  return (
    <>
      <BlogHero />
      <BlogGrid />
    </>
  );
}
