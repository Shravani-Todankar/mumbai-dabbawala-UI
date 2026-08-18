import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import './BlogGrid.css';

const CATEGORIES = ['All', ...new Set(blogPosts.map((post) => post.category))];

/**
 * After litmus.com/blog: a featured article up top, a horizontal
 * category-filter bar (plus a newest/oldest sort) below it, and the rest of
 * the posts as a plain chronological row list — no card borders/shadows —
 * rather than the equal-size 3-column card grid this replaces. `blogPosts`
 * is already newest-first, so "Oldest first" is just the reversed array,
 * no date parsing needed.
 */
export default function BlogGrid() {
  const scope = useSectionFx();
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');

  const featured = blogPosts.find((post) => post.featured);
  const rest = blogPosts.filter((post) => post !== featured);

  const visible = useMemo(() => {
    const filtered = category === 'All' ? rest : rest.filter((post) => post.category === category);
    return sort === 'newest' ? filtered : [...filtered].reverse();
  }, [category, sort, rest]);

  return (
    <section className="section blog-grid" ref={scope}>
      <div className="container">
        {featured && (
          <Link className="blog-grid__featured reveal" to={`/blog/${featured.slug}`}>
            <div className="blog-grid__featured-image-frame">
              <img src={featured.image} alt="" width="900" height="600" />
            </div>
            <div className="blog-grid__featured-body">
              <span className="blog-grid__meta">
                {featured.category} &middot; {featured.date}
              </span>
              <h2 className="blog-grid__featured-title">{featured.title}</h2>
              <p className="blog-grid__excerpt">{featured.excerpt}</p>
              <span className="blog-grid__read-more">Read more &rarr;</span>
            </div>
          </Link>
        )}

        <div className="blog-grid__bar">
          <div className="blog-grid__filters" role="group" aria-label="Filter by category">
            {CATEGORIES.map((name) => (
              <button
                type="button"
                key={name}
                className={`blog-grid__filter${category === name ? ' is-active' : ''}`}
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="blog-grid__sort" role="group" aria-label="Sort posts">
            <button
              type="button"
              className={`blog-grid__sort-btn${sort === 'newest' ? ' is-active' : ''}`}
              onClick={() => setSort('newest')}
            >
              Newest
            </button>
            <button
              type="button"
              className={`blog-grid__sort-btn${sort === 'oldest' ? ' is-active' : ''}`}
              onClick={() => setSort('oldest')}
            >
              Oldest
            </button>
          </div>
        </div>

        {/* Keyed on category+sort so a filter change mounts fresh nodes —
            useSectionFx's reveal only runs once, and reusing nodes would
            leave a re-filtered set stuck at whatever opacity it had before. */}
        <ul className="blog-grid__list" key={`${category}-${sort}`} data-stagger>
          {visible.map((post) => (
            <li className="blog-grid__row" key={post.slug}>
              <Link className="blog-grid__row-link" to={`/blog/${post.slug}`}>
                <div className="blog-grid__row-image-frame">
                  <img src={post.image} alt="" width="160" height="120" loading="lazy" />
                </div>
                <div className="blog-grid__row-body">
                  <span className="blog-grid__meta">
                    {post.category} &middot; {post.date}
                  </span>
                  <h3 className="blog-grid__row-title">{post.title}</h3>
                  <p className="blog-grid__excerpt">{post.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {visible.length === 0 && <p className="blog-grid__empty">No posts in this category yet.</p>}
      </div>
    </section>
  );
}
