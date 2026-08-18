import { useEffect, useId, useRef, useState } from 'react';
import { perthSuburbs, waitlistModalCopy } from '../data/waitlist';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Normalises the Australian mobile the user typed down to the 9 significant
 * digits after +61, accepting the three forms people actually type:
 * "412 345 678", "0412 345 678" (national trunk 0) and "+61 412 345 678".
 */
function normaliseAuMobile(raw) {
  let digits = raw.replace(/[^\d]/g, '');
  if (digits.startsWith('61')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = digits.slice(1);
  return digits;
}

function isValidAuMobile(raw) {
  const digits = normaliseAuMobile(raw);
  // Australian mobiles are 9 digits after the country code and start with 4.
  return digits.length === 9 && digits.startsWith('4');
}

/**
 * State machine behind <WaitlistModal>. This is where the simulated
 * submission now lives — the inline <WaitlistForm> only validates the email
 * and hands it over, so the brief's loading/success/error states happen here
 * against the full detail set rather than against an email alone.
 *
 * Deterministic failure path is unchanged from the inline form: any address
 * ending in `.test` (RFC 2606 reserved, so unreachable by accident, and it
 * still passes the email regex — which is what proves "invalid" and "error"
 * are different states).
 */
export function useWaitlistDetails({ initialEmail = '', onComplete }) {
  const uid = useId();
  const ids = {
    email: `wl-d-email-${uid}`,
    emailError: `wl-d-email-error-${uid}`,
    phone: `wl-d-phone-${uid}`,
    phoneError: `wl-d-phone-error-${uid}`,
    phoneHint: `wl-d-phone-hint-${uid}`,
    suburb: `wl-d-suburb-${uid}`,
    suburbError: `wl-d-suburb-error-${uid}`,
    suburbHint: `wl-d-suburb-hint-${uid}`,
    suburbList: `wl-d-suburb-list-${uid}`,
    prefHint: `wl-d-pref-hint-${uid}`,
    title: `wl-d-title-${uid}`,
  };

  const [values, setValues] = useState({
    email: initialEmail,
    phone: '',
    suburb: '',
    preference: 'veg',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [submitError, setSubmitError] = useState(null);

  const submittedOnce = useRef(false);
  const token = useRef(0);
  const timer = useRef(null);
  const fieldRefs = { email: useRef(null), phone: useRef(null), suburb: useRef(null) };

  useEffect(() => () => clearTimeout(timer.current), []);

  const validate = (v) => {
    const next = {};
    if (!EMAIL_RE.test(v.email.trim())) next.email = waitlistModalCopy.errorEmail;
    if (!isValidAuMobile(v.phone)) next.phone = waitlistModalCopy.errorPhone;
    // Suburb is optional, but if given it has to be one we actually serve.
    const suburb = v.suburb.trim();
    if (suburb && !perthSuburbs.some((s) => s.toLowerCase() === suburb.toLowerCase())) {
      next.suburb = waitlistModalCopy.errorSuburb;
    }
    return next;
  };

  const update = (field) => (event) => {
    const value = event.target.value;
    setValues((v) => {
      const nextValues = { ...v, [field]: value };
      if (submittedOnce.current) setErrors(validate(nextValues));
      return nextValues;
    });
    setSubmitError(null);
  };

  const setPreference = (preference) => {
    setValues((v) => ({ ...v, preference }));
    setSubmitError(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (status === 'submitting') return; // double-submit guard (click + Enter)

    submittedOnce.current = true;
    const next = validate(values);
    setErrors(next);
    const firstInvalid = ['email', 'phone', 'suburb'].find((f) => next[f]);
    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    setSubmitError(null);
    setStatus('submitting');
    const mine = ++token.current;
    const shouldFail = values.email.trim().toLowerCase().endsWith('.test');

    timer.current = setTimeout(() => {
      if (mine !== token.current) return; // superseded by a newer submission
      if (shouldFail) {
        setSubmitError(waitlistModalCopy.errorTransport);
        setStatus('error');
      } else {
        setStatus('success');
        onComplete?.();
      }
    }, 900 + Math.random() * 700);
  };

  return { ids, values, errors, status, submitError, fieldRefs, update, setPreference, onSubmit };
}
