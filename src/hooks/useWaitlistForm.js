import { useId, useRef, useState } from 'react';
import { waitlistCopy } from '../data/waitlist';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * State machine behind <WaitlistForm>. Two independent instances (hero + final
 * CTA) each call this separately — see WaitlistForm.jsx for why the two are
 * not made to share state.
 *
 * This hook now only owns the *first* leg of the flow: default / focus /
 * invalid. A valid email doesn't submit anything — it calls `onValidSubmit`,
 * which opens the detail modal, and the loading / success / error states
 * happen there against the full detail set (see useWaitlistDetails.js).
 * `markComplete()` is what the modal calls back to flip this form to its
 * success panel.
 */
export function useWaitlistForm({ onValidSubmit } = {}) {
  const uid = useId();
  const emailId = `wl-email-${uid}`;
  const errorId = `wl-email-error-${uid}`;
  const hintId = `wl-email-hint-${uid}`;

  const [email, setEmail] = useState('');
  const [fieldError, setFieldError] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | success (loading/error live in the modal)

  const inputRef = useRef(null);
  const submittedOnce = useRef(false);

  const validate = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return waitlistCopy.errorEmpty;
    if (trimmed.length > 254) return waitlistCopy.errorLength;
    if (!EMAIL_RE.test(trimmed)) return waitlistCopy.errorFormat;
    return null;
  };

  const onChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (submittedOnce.current || fieldError) {
      setFieldError(validate(value));
    }
  };

  const onBlur = () => {
    if (email.trim()) setFieldError(validate(email));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    submittedOnce.current = true;
    const error = validate(email);
    setFieldError(error);
    if (error) {
      inputRef.current?.focus();
      return;
    }

    onValidSubmit?.(email.trim());
  };

  const markComplete = () => setStatus('success');

  return {
    ids: { emailId, errorId, hintId },
    email,
    fieldError,
    status,
    inputRef,
    onChange,
    onBlur,
    onSubmit,
    markComplete,
  };
}
