import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts, blogNewsletter } from '../data/content';
import { useSectionFx } from '../hooks/useScrollFx';
import './BlogPost.css';

/**
 * Two-column layout: article on the left, a sidebar on the right (newsletter
 * signup, category list, recent posts) — the single centred column read as
 * thin for a page that now has real article bodies. Sidebar "menu items" are
 * genuinely useful (they route to real posts/categories) rather than
 * decorative filler.
 */
function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="blog-sidebar__box blog-sidebar__newsletter">
      <p className="eyebrow">{blogNewsletter.eyebrow}</p>
      <h2 className="blog-sidebar__newsletter-title">{blogNewsletter.title}</h2>
      <p className="blog-sidebar__newsletter-text">{blogNewsletter.text}</p>

      {submitted ? (
        <p className="blog-sidebar__newsletter-success">Thanks — you’re on the list.</p>
      ) : (
        <form className="blog-sidebar__newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder={blogNewsletter.placeholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-label="Email address"
          />
          <button className="btn btn--primary" type="submit">
            {blogNewsletter.buttonLabel}
          </button>
        </form>
      )}
    </div>
  );
}

function BlogSidebar({ currentSlug }) {
  const categories = [...new Set(blogPosts.map((p) => p.category))];
  const recent = blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 4);

  return (
    <aside className="blog-sidebar">
      <NewsletterBox />

      <div className="blog-sidebar__box">
        <h2 className="blog-sidebar__heading">Categories</h2>
        <ul className="blog-sidebar__menu">
          {categories.map((category) => (
            <li key={category}>
              <Link to="/blog">{category}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="blog-sidebar__box">
        <h2 className="blog-sidebar__heading">Recent posts</h2>
        <ul className="blog-sidebar__menu blog-sidebar__menu--posts">
          {recent.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// `body` mixes plain paragraph strings with `{ heading }` subhead blocks —
// only the paragraph text counts toward the read-time estimate.
const textOf = (block) => (typeof block === 'string' ? block : '');

// After litmus.com/blog's meta row, which leads with a read-time estimate —
// computed from the actual body word count (200 wpm), not a fixed/invented
// number per post.
function readTime(body) {
  const words = body.map(textOf).join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const scope = useSectionFx();

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <section className="section blog-post" ref={scope}>
      <div className="container blog-post__layout">
        <article className="blog-post__article">
          <Link className="blog-post__back" to="/blog">
            &larr; Back to all posts
          </Link>

          <span className="blog-post__meta reveal">
            {post.category} &middot; {post.date} &middot; {readTime(post.body)} min read
          </span>
          <h1 className="blog-post__title reveal">{post.title}</h1>

          <div className="blog-post__image-frame reveal">
            <img src={post.image} alt="" width="1200" height="700" />
          </div>

          <div className="blog-post__body reveal">
            {post.body.map((block, i) =>
              typeof block === 'string' ? (
                <p key={i}>{block}</p>
              ) : (
                <h2 className="blog-post__subhead" key={i}>
                  {block.heading}
                </h2>
              )
            )}
          </div>
        </article>

        <BlogSidebar currentSlug={post.slug} />
      </div>
    </section>
  );
}
