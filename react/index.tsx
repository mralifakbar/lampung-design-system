'use client';

// React bindings for Lampung Design System. Markup and class names are the CSS components';
// these components add the state the vanilla module would otherwise wire through data-lds-*
// (which does not survive React re-rendering the DOM). Needs css/lds.css loaded once.
// Source TSX: import it from a vendored copy, or list the package in transpilePackages.
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from 'react';

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const lds = () => import('../js/lds.js');
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

// Default text follows the closest [lang] (then <html lang>): "id*" reads Indonesian, anything else English.
// Props such as label, placeholder, emptyText and clearLabel still win. Read after mount so server output stays stable.
const STRINGS = {
  en: { steps: 'Steps', choose: 'Choose', noMatch: 'Nothing matches. Try other words.', clear: 'Clear' },
  id: { steps: 'Langkah', choose: 'Pilih', noMatch: 'Tidak ada yang cocok. Coba kata lain.', clear: 'Hapus' },
};
type StringKey = keyof typeof STRINGS.en;
function useStrings(ref: RefObject<Element | null>) {
  const [code, setCode] = useState<keyof typeof STRINGS>('en');
  useIso(() => {
    const tag = ref.current?.closest('[lang]')?.getAttribute('lang') || document.documentElement.lang || '';
    setCode(tag.toLowerCase().startsWith('id') ? 'id' : 'en');
  }, []);
  return (k: StringKey) => STRINGS[code][k];
}

// ---------- Navigation and selection ----------

export type TabItem<T extends string> = { value: T; label: ReactNode; count?: number | string };

/** Underlined section tabs; the ink glides to the selected tab. For switching a value, use Segmented. */
export function Tabs<T extends string>({ value, onChange, items, label, align = 'fill', className }: { value: T; onChange: (v: T) => void; items: TabItem<T>[]; label: string; align?: 'fill' | 'start'; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ink, setInk] = useState<{ x: number; w: number } | null>(null);
  useIso(() => {
    const el = ref.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!el || !ref.current) return;
    const measure = () => setInk({ x: el.offsetLeft + 12, w: Math.max(0, el.offsetWidth - 24) });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [value, items.length]);
  const onKey = (e: KeyboardEvent) => {
    const i = items.findIndex((t) => t.value === value);
    const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : -2;
    if (n === -2) return;
    e.preventDefault();
    const next = items[(n + items.length) % items.length];
    onChange(next.value);
    requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus());
  };
  return (
    <div className={cx('tabs', align === 'start' && 'tabs--start', className)} role="tablist" aria-label={label} ref={ref} onKeyDown={onKey}>
      {items.map((t) => (
        <button key={t.value} type="button" role="tab" className="tabs__btn" aria-selected={t.value === value} tabIndex={t.value === value ? 0 : -1} onClick={() => onChange(t.value)}>
          {t.label}
          {t.count !== undefined && <span className="tabs__count">{t.count}</span>}
        </button>
      ))}
      {ink && <span className="tabs__ink" aria-hidden="true" style={{ width: ink.w, transform: `translateX(${ink.x}px)` }} />}
    </div>
  );
}

/** Segmented control: two to four options, one thumb sliding on a spring. */
export function Segmented<T extends string>({ value, options, onChange, label, size = 'lg', className }: { value: T; options: { value: T; label: ReactNode }[]; onChange: (v: T) => void; label: string; size?: 'md' | 'lg'; className?: string }) {
  const i = Math.max(0, options.findIndex((o) => o.value === value));
  return (
    <div className={cx('seg', size === 'lg' && 'seg--lg', className)} role="group" aria-label={label}>
      <span className="seg__thumb" style={{ width: `calc((100% - 4px) / ${options.length})`, transform: `translateX(${i * 100}%)` }} />
      {options.map((o) => (
        <button key={o.value} type="button" className="seg__btn" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** One accordion item; put several inside <div className="acc"> (or "acc acc--fill"). */
export function AccordionItem({ title, sub, children, defaultOpen = false, id }: { title: ReactNode; sub?: ReactNode; children: ReactNode; defaultOpen?: boolean; id?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  const pid = `${useId()}-panel`;
  return (
    <div className="acc__item" id={id}>
      <button type="button" className="acc__btn" aria-expanded={open} aria-controls={pid} onClick={() => setOpen((x) => !x)}>
        <span className="acc__title">
          {title}
          {sub && <span className="acc__sub">{sub}</span>}
        </span>
        <span className="ic" aria-hidden="true">
          expand_more
        </span>
      </button>
      <div className={cx('acc__panel', open && 'is-open')} id={pid}>
        <div>
          <div className="acc__content">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** Switch with an optional second line; the thumb stretches once as it lands. */
export function Switch({ checked, onChange, children, sub, size, disabled }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode; sub?: ReactNode; size?: 'sm'; disabled?: boolean }) {
  const [flip, setFlip] = useState(false);
  return (
    <label className={cx('switch', size === 'sm' && 'switch--sm', flip && 'is-flip')} onAnimationEnd={() => setFlip(false)}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          setFlip(true);
          onChange(e.target.checked);
        }}
      />
      <span className="switch__track" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
      <span className="switch__text">
        {children}
        {sub && <small>{sub}</small>}
      </span>
    </label>
  );
}

/** Horizontal steps; everything before `current` is done. */
export function Steps({ items, current, label }: { items: ReactNode[]; current: number; label?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const str = useStrings(ref);
  return (
    <ol className="steps" aria-label={label ?? str('steps')} ref={ref}>
      {items.map((s, i) => (
        <li key={i} className={cx('step', i < current && 'is-done', i === current && 'is-current')} aria-current={i === current ? 'step' : undefined}>
          <span className="step__head">
            <span className="step__dot">
              {i < current ? (
                <span className="ic" aria-hidden="true">
                  check
                </span>
              ) : (
                i + 1
              )}
            </span>
            {i < items.length - 1 && <span className="step__bar" aria-hidden="true" />}
          </span>
          <span className="step__label">{s}</span>
        </li>
      ))}
    </ol>
  );
}

// ---------- Feedback ----------

export function Spinner({ size }: { size?: 'lg' }) {
  return (
    <span className={cx('spinner', size === 'lg' && 'spinner--lg')} aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}

/** Inside a .btn: the label swaps to a spinner without changing the width. Add .is-loading to the button too. */
export function ButtonContent({ children, loading }: { children: ReactNode; loading?: boolean }) {
  return (
    <>
      <span className="btn__label">{children}</span>
      <span className="btn__spin" aria-hidden={!loading}>
        <Spinner />
      </span>
    </>
  );
}

export type Tone = 'info' | 'success' | 'warning' | 'danger';
const ALERT_ICON: Record<Tone, string> = { info: 'info', success: 'check_circle', warning: 'warning', danger: 'error' };

/** Inline alert with an optional title and actions. Danger is announced. */
export function Alert({ tone = 'info', title, children, actions, className }: { tone?: Tone; title?: ReactNode; children: ReactNode; actions?: ReactNode; className?: string }) {
  return (
    <div className={cx('alert', `alert--${tone}`, className)} role={tone === 'danger' ? 'alert' : undefined}>
      <span className="ic" aria-hidden="true">
        {ALERT_ICON[tone]}
      </span>
      <div>
        {title && <p className="alert__title">{title}</p>}
        <div className="alert__body">{children}</div>
        {actions && <div className="alert__actions">{actions}</div>}
      </div>
    </div>
  );
}

/** Progress ring; the number counts up once (instantly with reduced motion). */
export function Ring({ value, max = 100, size = 64, label, tone, animate = true, ariaLabel }: { value: number; max?: number; size?: number; label?: ReactNode; tone?: 'success' | 'warning' | 'danger'; animate?: boolean; ariaLabel?: string }) {
  const [shown, setShown] = useState(animate ? 0 : value);
  useEffect(() => {
    if (!animate || reduced()) return setShown(value);
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 900);
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, animate]);
  const r = 27;
  const len = 2 * Math.PI * r;
  return (
    <div className={cx('ring', tone && `ring--${tone}`)} style={{ width: size, height: size }} role="img" aria-label={ariaLabel ?? `${value} / ${max}`}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle className="ring__track" cx="32" cy="32" r={r} />
        <circle className="ring__val" cx="32" cy="32" r={r} strokeDasharray={len} strokeDashoffset={len * (1 - shown / max)} />
      </svg>
      {/* Small rings scale the number with the diameter and digit count so three digits stay inside. */}
      <span className="ring__label" style={size < 64 ? { fontSize: Math.max(10, Math.round(size * (String(value).length > 2 ? 0.27 : 0.34))) } : undefined}>
        {label ?? shown}
      </span>
    </div>
  );
}

/** Work in progress: dot-grid wave, shimmering label, honest elapsed time (pass startedAt as Date.now()). */
export function Thinking({ label, startedAt, done = false }: { label: ReactNode; startedAt?: number; done?: boolean }) {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    if (!startedAt || done) return;
    const t = window.setInterval(() => setSec(Math.floor((Date.now() - startedAt) / 1000)), 250);
    return () => window.clearInterval(t);
  }, [startedAt, done]);
  return (
    <span className={cx('thinking', done && 'is-done')} role="status">
      <span className="dotgrid" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} />
        ))}
      </span>
      <span className={cx('shimmer', done && 'is-settled')}>{label}</span>
      {startedAt !== undefined && <span className="thinking__time">{`${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`}</span>}
    </span>
  );
}

/** Toast plus a light haptic where supported. */
export function notify(o: { title: string; body?: string; icon?: string; action?: string; onAction?: () => void; duration?: number }, feel: 'light' | 'success' | 'error' = 'light') {
  void lds().then((d) => {
    d.toast({ duration: 3200, ...o });
    d.haptic(feel);
  });
}

/** A refused input: shake it once and buzz. Put the reason in text next to it as well. */
export function reject(el: Element | null | undefined) {
  if (!el) return;
  // shake() already gives the error haptic
  void lds().then((d) => d.shake(el));
}

/** Plays a .modal or .overlay exit, then closes it (native dialog) and calls done. */
export function closeModal(el: Element | null | undefined, done?: () => void) {
  void lds().then((d) => d.closeModal(el, done));
}

/** Reveal [data-lds-reveal] elements as they scroll in. Pass a key that changes per route to re-scan. */
export function useReveal(key?: string) {
  useEffect(() => {
    let stop = () => {};
    let live = true;
    void lds().then((d) => {
      if (live) stop = d.observeReveal(document);
    });
    return () => {
      live = false;
      stop();
    };
  }, [key]);
}

// ---------- Select and combobox ----------

export type Option = { value: string; label: string; sub?: string };

function useOutside(ref: RefObject<HTMLElement | null>, active: boolean, close: () => void) {
  useEffect(() => {
    if (!active) return;
    const h = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener('pointerdown', h);
    return () => document.removeEventListener('pointerdown', h);
  }, [ref, active, close]);
}

function useKeepVisible(listRef: RefObject<HTMLUListElement | null>, active: number, open: boolean) {
  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [listRef, active, open]);
}

function OptionRow({ o, i, lid, selected, active, onEnter, onPick }: { o: Option; i: number; lid: string; selected: boolean; active: boolean; onEnter: () => void; onPick: (e: React.PointerEvent | React.MouseEvent) => void }) {
  return (
    <li id={`${lid}-${i}`} data-i={i} role="option" aria-selected={selected} className={cx('menu__item', active && 'is-hover', selected && 'is-selected')} onPointerEnter={onEnter} onPointerDown={onPick}>
      <span className="select__text">
        {o.label}
        {o.sub && <small>{o.sub}</small>}
      </span>
      {selected && (
        <span className="ic ic--sm menu__check" aria-hidden="true">
          check
        </span>
      )}
    </li>
  );
}

/**
 * Select: a .select-trigger opening a listbox below it. Arrows, Home/End, Enter or Space picks,
 * Escape closes, typing jumps to the first option that starts with the letters.
 */
export function Select({ id, value, options, onChange, label, labelledBy, icon, placeholder, className }: { id?: string; value: string; options: Option[]; onChange: (v: string) => void; label?: string; labelledBy?: string; icon?: string; placeholder?: string; className?: string }) {
  const uid = useId();
  const tid = id ?? `sel-${uid}`;
  const lid = `${tid}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const str = useStrings(wrap);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const typed = useRef({ s: '', t: 0 });
  const idx = Math.max(0, options.findIndex((o) => o.value === value));
  const chosen = options.find((o) => o.value === value);
  useOutside(wrap, open, () => setOpen(false));
  useKeepVisible(list, active, open);
  useEffect(() => {
    if (open) void lds().then((d) => d.fitLayer(list.current));
  }, [open]);

  const show = () => {
    setActive(idx);
    setOpen(true);
  };
  const pick = (i: number) => {
    const o = options[i];
    if (o) onChange(o.value);
    setOpen(false);
    btn.current?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const n = options.length;
    if (!open && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      return show();
    }
    if (!open) return;
    if (e.key === 'ArrowDown') setActive((a) => Math.min(n - 1, a + 1));
    else if (e.key === 'ArrowUp') setActive((a) => Math.max(0, a - 1));
    else if (e.key === 'Home') setActive(0);
    else if (e.key === 'End') setActive(n - 1);
    else if (e.key === 'Enter' || e.key === ' ') pick(active);
    else if (e.key === 'Tab') return setOpen(false);
    else if (e.key === 'Escape') setOpen(false);
    else if (e.key.length === 1) {
      const k = typed.current;
      k.s = Date.now() - k.t < 700 ? k.s + e.key.toLowerCase() : e.key.toLowerCase();
      k.t = Date.now();
      const j = options.findIndex((o) => o.label.toLowerCase().startsWith(k.s));
      if (j >= 0) setActive(j);
      return;
    } else return;
    e.preventDefault();
  };

  return (
    <div className={cx('select', className)} ref={wrap}>
      <button
        type="button"
        id={tid}
        ref={btn}
        className={cx('control select-trigger', !chosen && 'is-placeholder')}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={lid}
        aria-label={label}
        aria-labelledby={labelledBy ? `${labelledBy} ${tid}` : undefined}
        aria-activedescendant={open ? `${lid}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
      >
        {icon && (
          <span className="ic" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="select__value">{chosen?.label ?? placeholder ?? str('choose')}</span>
        <span className="ic" aria-hidden="true">
          expand_more
        </span>
      </button>
      <ul className={cx('menu select__menu', open && 'is-open')} role="listbox" id={lid} ref={list} aria-labelledby={labelledBy} aria-label={label} tabIndex={-1}>
        {options.map((o, i) => (
          <OptionRow
            key={o.value}
            o={o}
            i={i}
            lid={lid}
            selected={o.value === value}
            active={i === active}
            onEnter={() => setActive(i)}
            onPick={(e) => {
              e.preventDefault();
              pick(i);
            }}
          />
        ))}
      </ul>
    </div>
  );
}

/**
 * Combobox: an input that filters a listbox as you type. With `loadOptions`, options come from
 * a server (debounced, aborted when the query changes); otherwise `options` filter in the browser.
 * Says so when nothing matches.
 */
export function Combobox({
  id,
  value,
  options = [],
  loadOptions,
  onChange,
  label,
  icon,
  placeholder,
  minChars = 0,
  emptyText,
  clearLabel,
}: {
  id?: string;
  value: string;
  options?: Option[];
  loadOptions?: (q: string, signal: AbortSignal) => Promise<Option[]>;
  onChange: (v: string) => void;
  label?: string;
  icon?: string;
  placeholder?: string;
  minChars?: number;
  emptyText?: string;
  clearLabel?: string;
}) {
  const uid = useId();
  const iid = id ?? `cbx-${uid}`;
  const lid = `${iid}-list`;
  const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;
  const [text, setText] = useState(labelOf(value));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [remote, setRemote] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const str = useStrings(wrap);
  const clearText = clearLabel ?? str('clear');
  useEffect(() => setText(labelOf(value)), [value]); // eslint-disable-line react-hooks/exhaustive-deps
  useOutside(wrap, open, () => {
    setOpen(false);
    setText(labelOf(value));
  });

  const q = text.trim().toLowerCase();
  const query = q === labelOf(value).toLowerCase() ? '' : q;
  useEffect(() => {
    if (!loadOptions || !open) return;
    if (query.length < minChars) return setRemote([]);
    const ac = new AbortController();
    setLoading(true);
    const t = setTimeout(
      () =>
        loadOptions(query, ac.signal)
          .then(setRemote, () => {})
          .finally(() => setLoading(false)),
      180
    );
    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [query, open, loadOptions, minChars]);
  const results = useMemo(() => (loadOptions ? remote : options.filter((o) => !query || `${o.label} ${o.sub ?? ''}`.toLowerCase().includes(query)).slice(0, 80)), [loadOptions, remote, options, query]);
  useKeepVisible(list, active, open);

  const pick = (o: Option) => {
    onChange(o.value);
    setText(o.label);
    setOpen(false);
  };
  const needsChars = !!loadOptions && query.length < minChars;
  const showing = open && (results.length > 0 || (!needsChars && !loading && query.length > 0));
  useEffect(() => {
    if (showing) void lds().then((d) => d.fitLayer(list.current));
  }, [showing]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="select combobox" ref={wrap}>
      <div className={cx('control combobox__control', showing && 'is-open')}>
        {icon && (
          <span className="ic" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          id={iid}
          ref={input}
          role="combobox"
          aria-expanded={showing}
          aria-controls={lid}
          aria-autocomplete="list"
          aria-activedescendant={showing && results[active] ? `${lid}-${active}` : undefined}
          aria-label={label}
          value={text}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => {
            setText(e.target.value);
            setOpen(true);
            setActive(0);
            if (!e.target.value) onChange('');
          }}
          onFocus={(e) => {
            setOpen(true);
            e.target.select();
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') (setOpen(true), setActive((a) => Math.min(results.length - 1, a + 1)));
            else if (e.key === 'ArrowUp') setActive((a) => Math.max(0, a - 1));
            else if (e.key === 'Enter' && showing && results[active]) pick(results[active]);
            else if (e.key === 'Escape') {
              setOpen(false);
              setText(labelOf(value));
            } else return;
            e.preventDefault();
          }}
        />
        {loading && <Spinner />}
        {!value && !loading && (
          <button type="button" tabIndex={-1} className="control__btn combobox__arrow" aria-hidden="true" onClick={() => input.current?.focus()}>
            <span className="ic">expand_more</span>
          </button>
        )}
        {value && !loading && (
          <button
            type="button"
            className="control__btn"
            aria-label={label ? `${clearText} ${label}` : clearText}
            onClick={() => {
              onChange('');
              setText('');
              input.current?.focus();
            }}
          >
            <span className="ic" aria-hidden="true">
              close
            </span>
          </button>
        )}
      </div>
      <ul className={cx('menu select__menu', showing && 'is-open')} role="listbox" id={lid} ref={list} aria-label={label}>
        {results.map((o, i) => (
          <OptionRow
            key={o.value}
            o={o}
            i={i}
            lid={lid}
            selected={o.value === value}
            active={i === active}
            onEnter={() => setActive(i)}
            onPick={(e) => {
              e.preventDefault();
              pick(o);
            }}
          />
        ))}
        {!results.length && !needsChars && !loading && query.length > 0 && (
          <li className="select__empty" role="presentation">
            {emptyText ?? str('noMatch')}
          </li>
        )}
      </ul>
    </div>
  );
}

// ---------- Data charts ----------

/** Area, line, bar, combo, donut or gauge chart drawn from data by drawChart. React owns the config;
 *  a new config animates from what is on screen. Range controls: keep the period in state and pass a new config. */
export function Chart({ config, id, className }: { config: import('../js/lds.js').ChartConfig; id?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const key = JSON.stringify(config);
  useEffect(() => {
    let live = true;
    lds().then((m) => { if (live && ref.current) m.drawChart(ref.current, config); });
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return <div ref={ref} id={id} className={cx(!config.type || config.type === 'xy' ? 'chart' : undefined, className)} />;
}
