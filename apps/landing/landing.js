// Landing page behavior. Components come from /js/lds.js; this file only wires the page.
import { init, setTheme, setLoading, morphText, shake } from '/js/lds.js';

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
