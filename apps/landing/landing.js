// Landing page behavior. Components come from /js/lds.js; this file only wires the page.
import { init, setTheme, setLoading, morphText, shake, toast, announce, setRoll } from '/js/lds.js';

const html = document.documentElement;
const $ = (s, r = document) => r.querySelector(s);
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Theme toggle: flips between light and dark; a saved "system" resolves to what the OS shows now. */
const themeBtn = $('#theme-btn');
const isDark = () => {
  const mode = html.getAttribute('data-theme');
  return mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
};
const syncTheme = () => {
  if (!themeBtn) return;
  const dark = isDark();
  themeBtn.querySelector('.swap').classList.toggle('is-swapped', dark);
  themeBtn.setAttribute('aria-label', dark ? themeBtn.dataset.labelLight : themeBtn.dataset.labelDark);
  const tip = $('#theme-tip');
  if (tip) tip.textContent = dark ? themeBtn.dataset.tipLight : themeBtn.dataset.tipDark;
};
themeBtn?.addEventListener('click', () => { setTheme(isDark() ? 'light' : 'dark'); syncTheme(); });
syncTheme();

/* Token sample: one segmented control, three real outputs of the same token file. */
const code = {
  css: ['css/tokens.css', ':root {\n  --accent: #0B6E4F;\n  --gold: #C9952B;\n  --r-lg: 16px;\n}\n[data-theme="dark"] {\n  --accent: #0F7D59;\n  --gold: #D9A93F;\n}'],
  js: ['dist/tokens.mjs', "import { tokens } from 'lampung-design-system';\n\ntokens.color.light.accent;  // \"#0B6E4F\"\ntokens.color.light.gold;    // \"#C9952B\"\ntokens.color.dark.accent;   // \"#0F7D59\""],
  flutter: ['dist/flutter/lds_tokens.dart', "final c = LdsColors.light;\n\nContainer(\n  color: c.accent,  // Color(0xFF0B6E4F)\n  child: Text('Kirim', style: LdsType.title2),\n);"],
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const highlight = (text) => esc(text).split('\n').map((line) => {
  const m = line.match(/^(.*?)(\s*\/\/.*)$/);
  const body = (m ? m[1] : line)
    .replace(/('[^']*'|"[^"]*")/g, '<span class="s">$1</span>')
    .replace(/(^|\s)(--[\w-]+|:root|import|from|final)\b/g, '$1<span class="k">$2</span>');
  return body + (m ? `<span class="c">${m[2]}</span>` : '');
}).join('\n');
const pre = $('#code-pre');
$('#code-seg')?.addEventListener('lds:change', (e) => {
  const entry = code[e.detail.item.dataset.code];
  if (!entry || !pre) return;
  const [file, text] = entry;
  $('#code-file').textContent = file;
  $('#code-copy').setAttribute('data-lds-copy', text);
  pre.innerHTML = highlight(text);
  if (!reduced()) pre.animate([{ opacity: 0, transform: 'translateY(4px)', filter: 'blur(4px)' }, { opacity: 1, transform: 'none', filter: 'none' }], { duration: 240, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
});

/* Live preview: the form refuses an empty name in place, otherwise "sends" (nothing leaves the page). */
const demo = $('#demo');
if (demo) {
  const t = demo.dataset;
  const name = $('#demo-name');
  const help = $('#demo-name-help');
  const send = $('#demo-send');
  const resetName = () => {
    name.parentElement.classList.remove('is-invalid');
    name.removeAttribute('aria-invalid');
    help.className = 'field__help';
    help.textContent = t.msgHelp;
  };
  name.addEventListener('input', () => name.parentElement.classList.contains('is-invalid') && resetName());

  $('#demo-save').addEventListener('click', () => {
    const label = $('#demo-save-label');
    morphText(label, t.msgSaved);
    setTimeout(() => morphText(label, t.msgSave), 2400);
  });

  demo.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!name.value.trim()) {
      name.parentElement.classList.add('is-invalid');
      name.setAttribute('aria-invalid', 'true');
      help.className = 'field__help field__help--error';
      help.innerHTML = '<span class="ic" aria-hidden="true">error</span>';
      help.append(t.msgEmpty);
      shake(send);
      name.focus();
      return;
    }
    setLoading(send, true);
    setTimeout(() => {
      setLoading(send, false);
      morphText($('#demo-send-label'), t.msgSent);
      const badge = $('#demo-badge');
      badge.className = 'badge badge--success';
      badge.querySelector('.ic').textContent = 'check_circle';
      $('#demo-badge-label').textContent = t.badgeDone;
      setTimeout(() => morphText($('#demo-send-label'), t.msgSend), 3200);
    }, 900);
  });
}

/* Live example: a citizen report moves Diterima -> Diproses -> Selesai, one press at a time.
   With the switch on, each change raises a toast (which is also the screen reader message);
   with it off, the change is announced quietly. */
const track = $('#track');
if (track) {
  const d = track.dataset;
  const states = d.states.split('|');
  const next = d.next.split('|');
  const look = [['badge--accent', 'inbox'], ['badge--warning', 'schedule'], ['badge--success', 'check_circle']];
  const steps = [...track.querySelectorAll('.step')];
  const badge = $('#track-badge');
  const icon = badge.querySelector('.ic');
  const last = states.length - 1;
  let s = 0;
  let touched = false;
  const render = (n, quiet) => {
    s = n;
    steps.forEach((li, i) => {
      const done = i < s || (s === last && i === s);
      const dot = li.querySelector('.step__dot');
      if (done && !li.classList.contains('is-done')) dot.innerHTML = '<span class="ic" aria-hidden="true">check</span>';
      if (!done && li.classList.contains('is-done')) dot.textContent = i + 1;
      li.classList.toggle('is-done', done);
      li.classList.toggle('is-current', i === s && !done);
      if (i === s && !done) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    badge.classList.remove(...look.map((l) => l[0]));
    badge.classList.add(look[s][0]);
    icon.textContent = look[s][1];
    if (!reduced()) icon.animate([{ transform: 'scale(0.6)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 360, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
    morphText($('#track-badge-label'), states[s]);
    morphText($('#track-next-label'), next[s]);
    if (quiet) return;
    if ($('#track-notify').checked) toast({ title: d.toast.replace('{s}', states[s]), body: d.toastSub, icon: 'sms' });
    else announce(d.announce.replace('{s}', states[s]));
  };
  $('#track-next').addEventListener('click', () => { touched = true; render(s === last ? 0 : s + 1); });
  // One quiet step on first sight shows the bar and badge move; it never repeats and yields to the visitor.
  if (!reduced() && typeof IntersectionObserver === 'function') {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setTimeout(() => { if (!touched && s === 0) render(1, true); }, 1400);
    }, { threshold: 0.6 });
    io.observe(track);
  }
}

/* Component total: the digits roll up once when the number scrolls into view. Its accessible name stays the real total. */
const count = $('.lp-count');
if (count && !reduced() && typeof IntersectionObserver === 'function') {
  const target = count.dataset.count;
  count.classList.add('roll');
  count.setAttribute('data-lds-roll-label', target);
  setRoll(count, '0'.repeat(target.length));
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    setTimeout(() => setRoll(count, target), 200);
  }, { threshold: 0.5 });
  io.observe(count);
}

/* Clipboard blocked (insecure origin, permissions): select the text so Ctrl+C or a long press still works. */
document.addEventListener('lds:copy-failed', (e) => {
  const target = e.target.closest('.codeblock')?.querySelector('pre') || e.target.closest('.lp-color__name')?.querySelector('.code');
  if (!target) return;
  const range = document.createRange();
  range.selectNodeContents(target);
  const sel = getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
});

init();
