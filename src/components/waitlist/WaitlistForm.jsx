import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWaitlistForm } from '../../hooks/useWaitlistForm';
import { waitlistCopy } from '../../data/waitlist';
import WaitlistModal from './WaitlistModal';
import './WaitlistForm.css';

/**
 * The one waitlist form component, mounted twice (hero + final CTA) with
 * independent state per instance — see useWaitlistForm.js for why the two
 * are not made to share a status. `variant` only changes presentation:
 * whether the label is visible and which heading level the success state
 * renders (h2 under the page's single h1 in the hero, h3 under that
 * section's own h2 in the final CTA).
 *
 * Flow: this form validates the email only (default / focus / invalid), then
 * hands off to <WaitlistModal> for phone, suburb and meal preference — the
 * loading / success / error states live there. When the modal completes, it
 * calls back and this form swaps to its own success panel, so the page still
 * reflects completion after the dialog is dismissed.
 */
export default function WaitlistForm({ variant = 'hero' }) {
  const [modalOpen, setModalOpen] = useState(false);
  const submitRef = useRef(null);

  const {
    ids: { emailId, errorId, hintId },
    email,
    fieldError,
    status,
    inputRef,
    onChange,
    onBlur,
    onSubmit,
    markComplete,
  } = useWaitlistForm({ onValidSubmit: () => setModalOpen(true) });

  const successHeadingRef = useRef(null);
  const labelHidden = variant === 'hero';
  const SuccessHeading = variant === 'cta' ? 'h3' : 'h2';

  useEffect(() => {
    if (status !== 'success') return;
    successHeadingRef.current?.focus();
    // The success swap changes document height under every ScrollTrigger
    // below this point — this is a layout consequence, not a motion effect,
    // so it runs in the reduced-motion branch too.
    ScrollTrigger.refresh();
  }, [status]);

  // Closing the dialog must put focus back on the control that opened it,
  // or a keyboard user is dropped at the top of the document.
  const closeModal = () => {
    setModalOpen(false);
    submitRef.current?.focus();
  };

  const describedBy = [fieldError ? errorId : null, hintId].filter(Boolean).join(' ') || undefined;

  if (status === 'success') {
    return (
      <div className={`wl-form wl-form--${variant} wl-form__done`}>
        <SuccessHeading className="wl-form__done-title" ref={successHeadingRef} tabIndex={-1}>
          {waitlistCopy.successHeading}
        </SuccessHeading>
        <p className="wl-form__done-body">{waitlistCopy.successBody}</p>
        <p className="wl-form__done-receipt wl-code" aria-hidden="true">
          {waitlistCopy.successReceipt}
        </p>
        {/* Cleared once populated — this announcement has already fired. */}
        <p className="wl-sr-only" role="status" />
      </div>
    );
  }

  return (
    <>
      <form className={`wl-form wl-form--${variant}`} onSubmit={onSubmit} noValidate>
        <div className="wl-form__row">
          <div className="wl-form__field">
            <label htmlFor={emailId} className={labelHidden ? 'wl-sr-only' : 'wl-form__label'}>
              {waitlistCopy.label}
            </label>
            <input
              id={emailId}
              ref={inputRef}
              type="email"
              name="email"
              autoComplete="email"
              placeholder={waitlistCopy.placeholder}
              value={email}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={Boolean(fieldError)}
              aria-describedby={describedBy}
              className="wl-form__input"
            />
          </div>
          <button type="submit" className="btn btn--primary wl-btn wl-form__submit" ref={submitRef}>
            <span className="wl-form__submit-label">{waitlistCopy.cta}</span>
          </button>
        </div>

        {fieldError && (
          <p className="wl-form__error" id={errorId}>
            {fieldError}
          </p>
        )}
        <p className="wl-form__hint" id={hintId}>
          {waitlistCopy.hint}
        </p>
      </form>

      {/* Mounted only while open, so useWaitlistDetails seeds its email state
          from the address the user actually typed — a permanently-mounted
          modal would have captured the empty initial value instead. */}
      {modalOpen && (
        <WaitlistModal open initialEmail={email} onClose={closeModal} onComplete={markComplete} />
      )}
    </>
  );
}
