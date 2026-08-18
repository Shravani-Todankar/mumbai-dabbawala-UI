import { useEffect, useRef } from "react";
import { getLenis } from "../../hooks/useSmoothScroll";
import { useWaitlistDetails } from "../../hooks/useWaitlistDetails";
import { perthSuburbs, waitlistModalCopy } from "../../data/waitlist";
import "./WaitlistModal.css";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The detail dialog that opens once the inline form has a valid email. Owns
 * the brief's loading / success / error states (the inline form only handles
 * default / focus / invalid before handing over).
 *
 * Modal a11y is hand-rolled rather than using <dialog>, to match this repo's
 * plain-CSS/no-new-deps constraint: role="dialog" + aria-modal, a Tab trap
 * bounded by the panel, Escape to close, focus moved in on open and returned
 * to the trigger on close, and body scroll + Lenis both stopped while open.
 */
export default function WaitlistModal({
  open,
  initialEmail,
  onClose,
  onComplete,
}) {
  const panelRef = useRef(null);
  const {
    ids,
    values,
    errors,
    status,
    submitError,
    fieldRefs,
    update,
    setPreference,
    onSubmit,
  } = useWaitlistDetails({ initialEmail, onComplete });

  // Move focus into the dialog on open — without this a keyboard user stays
  // parked on the trigger behind the scrim.
  useEffect(() => {
    if (!open) return;
    fieldRefs.phone.current?.focus();
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="wl-modal">
      <div className="wl-modal__scrim" onClick={onClose} aria-hidden="true" />
      <div
        className="wl-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={ids.title}
        ref={panelRef}
      >
        <button
          type="button"
          className="wl-modal__close"
          onClick={onClose}
          aria-label={waitlistModalCopy.close}
        >
          <span aria-hidden="true">×</span>
        </button>

        {/* No success branch here on purpose: onComplete flips the parent
            <WaitlistForm> to its success panel, which unmounts this dialog in
            the same commit — so the page, not the modal, is what confirms. */}
        <form
          className="wl-modal__form"
          onSubmit={onSubmit}
          noValidate
          aria-busy={status === "submitting"}
        >
          <h2 className="wl-modal__title" id={ids.title}>
            {waitlistModalCopy.title}
          </h2>
          <p className="wl-modal__intro">{waitlistModalCopy.intro}</p>

          <div className="wl-modal__field">
            <label htmlFor={ids.email}>{waitlistModalCopy.emailLabel}</label>
            <input
              id={ids.email}
              ref={fieldRefs.email}
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={update("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? ids.emailError : undefined}
            />
            {errors.email && (
              <p className="wl-modal__error" id={ids.emailError}>
                {errors.email}
              </p>
            )}
          </div>

          <div className="wl-modal__row">
            <div className="wl-modal__field">
              <label htmlFor={ids.phone}>{waitlistModalCopy.phoneLabel}</label>
              <div className="wl-modal__phone">
                <span className="wl-modal__prefix" aria-hidden="true">
                  +61
                </span>
                <input
                  id={ids.phone}
                  ref={fieldRefs.phone}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="412 345 678"
                  value={values.phone}
                  onChange={update("phone")}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={`${errors.phone ? `${ids.phoneError} ` : ""}${ids.phoneHint}`}
                />
              </div>
              {errors.phone && (
                <p className="wl-modal__error" id={ids.phoneError}>
                  {errors.phone}
                </p>
              )}
              <p className="wl-modal__hint" id={ids.phoneHint}>
                {waitlistModalCopy.phoneHint}
              </p>
            </div>

            <div className="wl-modal__field">
              <label htmlFor={ids.suburb}>
                {waitlistModalCopy.suburbLabel}
                <span className="wl-modal__optional">
                  {waitlistModalCopy.suburbOptional}
                </span>
              </label>
              <input
                id={ids.suburb}
                ref={fieldRefs.suburb}
                type="text"
                list={ids.suburbList}
                autoComplete="address-level2"
                placeholder={waitlistModalCopy.suburbPlaceholder}
                value={values.suburb}
                onChange={update("suburb")}
                aria-invalid={Boolean(errors.suburb)}
                aria-describedby={`${errors.suburb ? `${ids.suburbError} ` : ""}${ids.suburbHint}`}
              />
              <datalist id={ids.suburbList}>
                {perthSuburbs.map((suburb) => (
                  <option value={suburb} key={suburb} />
                ))}
              </datalist>
              {errors.suburb && (
                <p className="wl-modal__error" id={ids.suburbError}>
                  {errors.suburb}
                </p>
              )}
              <p className="wl-modal__hint" id={ids.suburbHint}>
                {waitlistModalCopy.suburbHint}
              </p>
            </div>
          </div>

          {/* A preference is a single choice, so this is a real radiogroup
                styled as a segmented control — not a tablist, which would
                promise panels that don't exist. */}
          <fieldset
            className="wl-modal__field wl-modal__prefs"
            aria-describedby={ids.prefHint}
          >
            <legend>{waitlistModalCopy.preferenceLabel}</legend>
            <div className="wl-modal__segmented">
              {waitlistModalCopy.options.map((option) => (
                <label
                  className={`wl-modal__seg${values.preference === option.id ? " is-active" : ""}`}
                  key={option.id}
                >
                  <input
                    type="radio"
                    name={`wl-pref-${ids.title}`}
                    value={option.id}
                    checked={values.preference === option.id}
                    onChange={() => setPreference(option.id)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            <p className="wl-modal__hint" id={ids.prefHint}>
              {waitlistModalCopy.preferenceHint}
            </p>
          </fieldset>

          <button
            type="submit"
            className="btn btn--primary wl-btn wl-modal__submit"
            aria-disabled={status === "submitting"}
          >
            {waitlistModalCopy.submit}
          </button>

          <p className="wl-sr-only" role="status">
            {status === "submitting"
              ? waitlistModalCopy.loadingAnnouncement
              : ""}
          </p>
          <div className="wl-modal__alert" role="alert">
            {status === "error" ? submitError : ""}
          </div>
        </form>
      </div>
    </div>
  );
}
