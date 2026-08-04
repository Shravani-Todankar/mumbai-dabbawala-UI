import { useState } from 'react';
import { site } from '../data/content';
import { useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import './Contact.css';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const scope = useSectionFx();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email.';
    if (!values.message.trim()) next.message = 'Please enter a message.';

    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus();
      return;
    }

    setSent(true);
    setValues(EMPTY);
  };

  return (
    <section className="section contact" id="contact" ref={scope}>
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="eyebrow reveal">Get in touch</p>
          <AnimatedHeading text="Send us a Message" className="section-title" />

          <dl className="contact__details reveal">
            <div>
              <dt>Phone</dt>
              {site.phones.map((phone) => (
                <dd key={phone}>
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>
                </dd>
              ))}
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>Address</dt>
              {site.addresses.map((address) => (
                <dd key={address}>{address}</dd>
              ))}
            </div>
          </dl>
        </div>

        <form className="contact__form reveal" onSubmit={onSubmit} noValidate>
          <div className="contact__field">
            <label htmlFor="contact-name">Your Name *</label>
            <input
              id="contact-name"
              type="text"
              value={values.name}
              onChange={update('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              required
            />
            {errors.name && (
              <p className="contact__error" id="contact-name-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="contact__field">
            <label htmlFor="contact-email">Your Email *</label>
            <input
              id="contact-email"
              type="email"
              value={values.email}
              onChange={update('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              required
            />
            {errors.email && (
              <p className="contact__error" id="contact-email-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="contact__field">
            <label htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              type="text"
              value={values.subject}
              onChange={update('subject')}
            />
          </div>

          <div className="contact__field">
            <label htmlFor="contact-message">Your Message *</label>
            <textarea
              id="contact-message"
              rows="5"
              value={values.message}
              onChange={update('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              required
            />
            {errors.message && (
              <p className="contact__error" id="contact-message-error">
                {errors.message}
              </p>
            )}
          </div>

          <button className="btn btn--primary" type="submit">
            Send Message
          </button>

          <p className="contact__status" role="status">
            {sent ? 'Thanks — your message has been recorded.' : ''}
          </p>
        </form>
      </div>
    </section>
  );
}
