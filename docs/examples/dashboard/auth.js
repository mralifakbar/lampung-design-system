// Shared behavior of the pages without the app frame (masuk, daftar, lupa kata sandi, verifikasi, akses ditolak, segera hadir):
// field errors in the helper slot, password strength, the submit walk (loading, done, redirect) and the
// appearance switch. Pages import what they need:
//   import { fieldError, fieldOk, isEmail, strength, finish, busy } from './auth.js';
import { setLoading, shake, announce, haptic } from '../../../js/lds.js';
import { delay } from './dashboard.js';

const helpOf = (input) => input.closest('.field')?.querySelector('.field__help');
const ctrlOf = (input) => input.closest('.control') || input.closest('.otp-wrap') || input;
const remember = (help) => { if (help && !help.hasAttribute('data-default')) help.setAttribute('data-default', help.innerHTML); };

/** Marks the field invalid, puts the reason in its helper line, shakes the control and focuses it. */
export function fieldError(input, text, { focus = true } = {}) {
  const ctrl = ctrlOf(input), help = helpOf(input);
  remember(help);
  ctrl.classList.add('is-invalid');
  input.setAttribute('aria-invalid', 'true');
  if (help) { help.classList.remove('field__help--ok'); help.classList.add('field__help--error'); help.innerHTML = `<span class="ic" aria-hidden="true">error</span>${text}`; }
  shake(ctrl);
  if (focus) input.focus();
  return false;
}
/** Clears the error. With text, the helper turns into a success line; without, it goes back to its hint. */
export function fieldOk(input, text) {
  const ctrl = ctrlOf(input), help = helpOf(input);
  remember(help);
  ctrl.classList.remove('is-invalid');
  input.removeAttribute('aria-invalid');
  if (!help) return true;
  help.classList.remove('field__help--error');
  help.classList.toggle('field__help--ok', !!text);
  help.innerHTML = text ? `<span class="ic" aria-hidden="true">check_circle</span>${text}` : help.getAttribute('data-default');
  return true;
}
/** After a field was refused once, it re-checks on every keystroke so the fix shows while typing. */
export function liveCheck(input, check) {
  input.addEventListener('input', () => { if (input.getAttribute('aria-invalid') === 'true') check(false); });
  input.addEventListener('blur', () => { if (input.value.trim()) check(false); });
}

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Password strength on a four step .meter-seg: weak (danger), fair (warning), good, strong (accent). */
export function strength(input, meter, help) {
  const steps = [...meter.querySelectorAll('i')];
  const words = ['', 'Lemah', 'Cukup', 'Baik', 'Kuat'];
  const update = () => {
    const v = input.value;
    let score = 0;
    if (v.length >= 8) score++;
    if (v.length >= 12) score++;
    if (/[0-9]/.test(v) && /[a-zA-Z]/.test(v)) score++;
    if (/[^a-zA-Z0-9]/.test(v) || (/[a-z]/.test(v) && /[A-Z]/.test(v))) score++;
    if (v && v.length < 8) score = 1;
    score = Math.min(4, v ? Math.max(1, score) : 0);
    steps.forEach((s, i) => s.classList.toggle('on', i < score));
    meter.classList.toggle('is-full', score === 1);
    meter.classList.toggle('is-warn', score === 2);
    if (input.getAttribute('aria-invalid') === 'true') return score;
    if (!v) help.textContent = 'Minimal 8 karakter. Frasa yang panjang lebih kuat daripada simbol.';
    else if (v.length < 8) help.textContent = `Lemah. Kurang ${8 - v.length} karakter lagi.`;
    else if (score === 2) help.textContent = 'Cukup. Tambahkan angka, atau buat lebih panjang.';
    else help.textContent = `${words[score]}. ${score === 4 ? 'Siap dipakai.' : 'Makin panjang makin kuat.'}`;
    return score;
  };
  input.addEventListener('input', update);
  update();
  return update;
}

/** The submit walk of a primary button: spinner while the request runs. */
export async function busy(btn, ms = 900) {
  setLoading(btn, true);
  await delay(ms);
  setLoading(btn, false);
}
/** Success: the label rises in with a check, then the page moves on. */
export async function finish(btn, label, href, ms = 900) {
  const l = btn.querySelector('.btn__label');
  l.innerHTML = `<span class="ic" aria-hidden="true">check_circle</span>${label}`;
  btn.classList.add('is-done');
  btn.setAttribute('aria-disabled', 'true');
  announce(label);
  haptic('success');
  await delay(ms);
  location.href = href;
}

// ---------- Appearance switch (a .seg of [data-lds-theme] buttons) ----------
const syncSeg = () => {
  const mode = document.documentElement.getAttribute('data-theme') || 'light';
  document.querySelectorAll('.seg').forEach((seg) => {
    const btns = [...seg.querySelectorAll('[data-lds-theme]')];
    if (!btns.length) return;
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-lds-theme') === mode)));
    const i = btns.findIndex((b) => b.getAttribute('aria-pressed') === 'true');
    const thumb = seg.querySelector('.seg__thumb');
    if (thumb && i >= 0) thumb.style.transform = `translateX(${i * 100}%)`;
  });
};
document.documentElement.addEventListener('lds:theme', syncSeg);
syncSeg();
