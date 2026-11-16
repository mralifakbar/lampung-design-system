// Shared helpers for the chart specs (files starting with _ are not specs).
// Deterministic example data, so every build renders the same numbers.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Days ending on `end` (YYYY-MM-DD): short labels ("12 Nov") and long ones ("Thu 12 Nov"). */
export function days(n, end = '2026-11-16') {
  const e = new Date(`${end}T12:00:00Z`); const short = [], long = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(e.getTime() - i * 864e5);
    short.push(`${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`);
    long.push(`${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`);
  }
  return { short, long };
}
export const months = (from = 0, n = 12) => Array.from({ length: n }, (_, i) => MONTHS[(from + i) % 12]);

/** A wobbly series: base plus a gentle trend, a weekly rhythm and seeded noise. */
export function wave(n, { base = 100, trend = 0, amp = 0.15, week = 0.12, seed = 1, round = 1 } = {}) {
  let s = seed * 9301 + 49297; const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: n }, (_, i) => {
    const v = base * (1 + (trend * i) / Math.max(1, n - 1)) * (1 + week * Math.sin((i / 7) * 2 * Math.PI) + amp * (rnd() - 0.5));
    return Math.round(v / round) * round;
  });
}

/** JSON for a single-quoted data attribute. */
export const cfg = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
export const sum = (a) => a.reduce((x, y) => x + y, 0);
export const fmt = (v) => v.toLocaleString('en-US');
