import { blogHero } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import './BlogHero.css';

/**
 * Simplified to a single statement + subtext, after litmus.com/blog's own
 * blog header — their hero is just the featured article itself (headline,
 * meta, author), with filtering living in its own bar below, not folded
 * into the hero. The two-column "latest post" preview card and category
 * pills that used to live here moved out: the pills are now the functional
 * filter bar in BlogGrid, and a separate preview card next to the hero was
 * redundant with BlogGrid's own featured post directly below it.
 */
export default function BlogHero() {
  const scope = useSectionFx();

  return (
    <section className="section blog-hero" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">{blogHero.eyebrow}</p>

        <h1 className="blog-hero__statement" data-stagger>
          {blogHero.statement.map((line) => (
            <span className="blog-hero__line" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <p className="blog-hero__sub reveal">{blogHero.sub}</p>
      </div>
    </section>
  );
}
