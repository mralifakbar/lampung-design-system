'use client';
// Generated from react/index.tsx by scripts/build-react.mjs. Edit the source, then run npm run build:react.
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;
const lds = () => import("../js/lds.js");
const reduced = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const cx = (...c) => c.filter(Boolean).join(" ");
const STRINGS = {
  en: { steps: "Steps", choose: "Choose", noMatch: "Nothing matches. Try other words.", clear: "Clear" },
  id: { steps: "Langkah", choose: "Pilih", noMatch: "Tidak ada yang cocok. Coba kata lain.", clear: "Hapus" }
};
function useStrings(ref) {
  const [code, setCode] = useState("en");
  useIso(() => {
    const tag = ref.current?.closest("[lang]")?.getAttribute("lang") || document.documentElement.lang || "";
    setCode(tag.toLowerCase().startsWith("id") ? "id" : "en");
  }, []);
  return (k) => STRINGS[code][k];
}
function Tabs({ value, onChange, items, label, align = "fill", className }) {
  const ref = useRef(null);
  const [ink, setInk] = useState(null);
  useIso(() => {
    const el = ref.current?.querySelector('[aria-selected="true"]');
    if (!el || !ref.current) return;
    const measure = () => setInk({ x: el.offsetLeft + 12, w: Math.max(0, el.offsetWidth - 24) });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [value, items.length]);
  const onKey = (e) => {
    const i = items.findIndex((t) => t.value === value);
    const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : -2;
    if (n === -2) return;
    e.preventDefault();
    const next = items[(n + items.length) % items.length];
    onChange(next.value);
    requestAnimationFrame(() => ref.current?.querySelector('[aria-selected="true"]')?.focus());
  };
  return /* @__PURE__ */ jsxs("div", { className: cx("tabs", align === "start" && "tabs--start", className), role: "tablist", "aria-label": label, ref, onKeyDown: onKey, children: [
    items.map((t) => /* @__PURE__ */ jsxs("button", { type: "button", role: "tab", className: "tabs__btn", "aria-selected": t.value === value, tabIndex: t.value === value ? 0 : -1, onClick: () => onChange(t.value), children: [
      t.label,
      t.count !== void 0 && /* @__PURE__ */ jsx("span", { className: "tabs__count", children: t.count })
    ] }, t.value)),
    ink && /* @__PURE__ */ jsx("span", { className: "tabs__ink", "aria-hidden": "true", style: { width: ink.w, transform: `translateX(${ink.x}px)` } })
  ] });
}
function Segmented({ value, options, onChange, label, size = "lg", className }) {
  const i = Math.max(0, options.findIndex((o) => o.value === value));
  return /* @__PURE__ */ jsxs("div", { className: cx("seg", size === "lg" && "seg--lg", className), role: "group", "aria-label": label, children: [
    /* @__PURE__ */ jsx("span", { className: "seg__thumb", style: { width: `calc((100% - 4px) / ${options.length})`, transform: `translateX(${i * 100}%)` } }),
    options.map((o) => /* @__PURE__ */ jsx("button", { type: "button", className: "seg__btn", "aria-pressed": o.value === value, onClick: () => onChange(o.value), children: o.label }, o.value))
  ] });
}
function AccordionItem({ title, sub, children, defaultOpen = false, id }) {
  const [open, setOpen] = useState(defaultOpen);
  const pid = `${useId()}-panel`;
  return /* @__PURE__ */ jsxs("div", { className: "acc__item", id, children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: "acc__btn", "aria-expanded": open, "aria-controls": pid, onClick: () => setOpen((x) => !x), children: [
      /* @__PURE__ */ jsxs("span", { className: "acc__title", children: [
        title,
        sub && /* @__PURE__ */ jsx("span", { className: "acc__sub", children: sub })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "ic", "aria-hidden": "true", children: "expand_more" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: cx("acc__panel", open && "is-open"), id: pid, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "acc__content", children }) }) })
  ] });
}
function Switch({ checked, onChange, children, sub, size, disabled }) {
  const [flip, setFlip] = useState(false);
  return /* @__PURE__ */ jsxs("label", { className: cx("switch", size === "sm" && "switch--sm", flip && "is-flip"), onAnimationEnd: () => setFlip(false), children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        role: "switch",
        checked,
        disabled,
        onChange: (e) => {
          setFlip(true);
          onChange(e.target.checked);
        }
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "switch__track", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "switch__thumb" }) }),
    /* @__PURE__ */ jsxs("span", { className: "switch__text", children: [
      children,
      sub && /* @__PURE__ */ jsx("small", { children: sub })
    ] })
  ] });
}
function Steps({ items, current, label }) {
  const ref = useRef(null);
  const str = useStrings(ref);
  return /* @__PURE__ */ jsx("ol", { className: "steps", "aria-label": label ?? str("steps"), ref, children: items.map((s, i) => /* @__PURE__ */ jsxs("li", { className: cx("step", i < current && "is-done", i === current && "is-current"), "aria-current": i === current ? "step" : void 0, children: [
    /* @__PURE__ */ jsxs("span", { className: "step__head", children: [
      /* @__PURE__ */ jsx("span", { className: "step__dot", children: i < current ? /* @__PURE__ */ jsx("span", { className: "ic", "aria-hidden": "true", children: "check" }) : i + 1 }),
      i < items.length - 1 && /* @__PURE__ */ jsx("span", { className: "step__bar", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "step__label", children: s })
  ] }, i)) });
}
function Spinner({ size }) {
  return /* @__PURE__ */ jsx("span", { className: cx("spinner", size === "lg" && "spinner--lg"), "aria-hidden": "true", children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ jsx("i", {}, i)) });
}
function ButtonContent({ children, loading }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: "btn__label", children }),
    /* @__PURE__ */ jsx("span", { className: "btn__spin", "aria-hidden": !loading, children: /* @__PURE__ */ jsx(Spinner, {}) })
  ] });
}
const ALERT_ICON = { info: "info", success: "check_circle", warning: "warning", danger: "error" };
function Alert({ tone = "info", title, children, actions, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cx("alert", `alert--${tone}`, className), role: tone === "danger" ? "alert" : void 0, children: [
    /* @__PURE__ */ jsx("span", { className: "ic", "aria-hidden": "true", children: ALERT_ICON[tone] }),
    /* @__PURE__ */ jsxs("div", { children: [
      title && /* @__PURE__ */ jsx("p", { className: "alert__title", children: title }),
      /* @__PURE__ */ jsx("div", { className: "alert__body", children }),
      actions && /* @__PURE__ */ jsx("div", { className: "alert__actions", children: actions })
    ] })
  ] });
}
function Ring({ value, max = 100, size = 64, label, tone, animate = true, ariaLabel }) {
  const [shown, setShown] = useState(animate ? 0 : value);
  useEffect(() => {
    if (!animate || reduced()) return setShown(value);
    let raf = 0;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 900);
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, animate]);
  const r = 27;
  const len = 2 * Math.PI * r;
  return /* @__PURE__ */ jsxs("div", { className: cx("ring", tone && `ring--${tone}`), style: { width: size, height: size }, role: "img", "aria-label": ariaLabel ?? `${value} / ${max}`, children: [
    /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 64 64", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("circle", { className: "ring__track", cx: "32", cy: "32", r }),
      /* @__PURE__ */ jsx("circle", { className: "ring__val", cx: "32", cy: "32", r, strokeDasharray: len, strokeDashoffset: len * (1 - shown / max) })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "ring__label", style: size < 64 ? { fontSize: Math.max(10, Math.round(size * (String(value).length > 2 ? 0.27 : 0.34))) } : void 0, children: label ?? shown })
  ] });
}
function Thinking({ label, startedAt, done = false }) {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    if (!startedAt || done) return;
    const t = window.setInterval(() => setSec(Math.floor((Date.now() - startedAt) / 1e3)), 250);
    return () => window.clearInterval(t);
  }, [startedAt, done]);
  return /* @__PURE__ */ jsxs("span", { className: cx("thinking", done && "is-done"), role: "status", children: [
    /* @__PURE__ */ jsx("span", { className: "dotgrid", "aria-hidden": "true", children: Array.from({ length: 9 }, (_, i) => /* @__PURE__ */ jsx("i", {}, i)) }),
    /* @__PURE__ */ jsx("span", { className: cx("shimmer", done && "is-settled"), children: label }),
    startedAt !== void 0 && /* @__PURE__ */ jsx("span", { className: "thinking__time", children: `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}` })
  ] });
}
function notify(o, feel = "light") {
  void lds().then((d) => {
    d.toast({ duration: 3200, ...o });
    d.haptic(feel);
  });
}
function reject(el) {
  if (!el) return;
  void lds().then((d) => d.shake(el));
}
function closeModal(el, done) {
  void lds().then((d) => d.closeModal(el, done));
}
function useReveal(key) {
  useEffect(() => {
    let stop = () => {
    };
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
function useOutside(ref, active, close) {
  useEffect(() => {
    if (!active) return;
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close();
    };
    document.addEventListener("pointerdown", h);
    return () => document.removeEventListener("pointerdown", h);
  }, [ref, active, close]);
}
function useKeepVisible(listRef, active, open) {
  useEffect(() => {
    if (open) listRef.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [listRef, active, open]);
}
function OptionRow({ o, i, lid, selected, active, onEnter, onPick }) {
  return /* @__PURE__ */ jsxs("li", { id: `${lid}-${i}`, "data-i": i, role: "option", "aria-selected": selected, className: cx("menu__item", active && "is-hover", selected && "is-selected"), onPointerEnter: onEnter, onPointerDown: onPick, children: [
    /* @__PURE__ */ jsxs("span", { className: "select__text", children: [
      o.label,
      o.sub && /* @__PURE__ */ jsx("small", { children: o.sub })
    ] }),
    selected && /* @__PURE__ */ jsx("span", { className: "ic ic--sm menu__check", "aria-hidden": "true", children: "check" })
  ] });
}
function Select({ id, value, options, onChange, label, labelledBy, icon, placeholder, className }) {
  const uid = useId();
  const tid = id ?? `sel-${uid}`;
  const lid = `${tid}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef(null);
  const str = useStrings(wrap);
  const btn = useRef(null);
  const list = useRef(null);
  const typed = useRef({ s: "", t: 0 });
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
  const pick = (i) => {
    const o = options[i];
    if (o) onChange(o.value);
    setOpen(false);
    btn.current?.focus();
  };
  const onKey = (e) => {
    const n = options.length;
    if (!open && ["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      return show();
    }
    if (!open) return;
    if (e.key === "ArrowDown") setActive((a) => Math.min(n - 1, a + 1));
    else if (e.key === "ArrowUp") setActive((a) => Math.max(0, a - 1));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(n - 1);
    else if (e.key === "Enter" || e.key === " ") pick(active);
    else if (e.key === "Tab") return setOpen(false);
    else if (e.key === "Escape") setOpen(false);
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
  return /* @__PURE__ */ jsxs("div", { className: cx("select", className), ref: wrap, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        id: tid,
        ref: btn,
        className: cx("control select-trigger", !chosen && "is-placeholder"),
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        "aria-controls": lid,
        "aria-label": label,
        "aria-labelledby": labelledBy ? `${labelledBy} ${tid}` : void 0,
        "aria-activedescendant": open ? `${lid}-${active}` : void 0,
        onClick: () => open ? setOpen(false) : show(),
        onKeyDown: onKey,
        children: [
          icon && /* @__PURE__ */ jsx("span", { className: "ic", "aria-hidden": "true", children: icon }),
          /* @__PURE__ */ jsx("span", { className: "select__value", children: chosen?.label ?? placeholder ?? str("choose") }),
          /* @__PURE__ */ jsx("span", { className: "ic", "aria-hidden": "true", children: "expand_more" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("ul", { className: cx("menu select__menu", open && "is-open"), role: "listbox", id: lid, ref: list, "aria-labelledby": labelledBy, "aria-label": label, tabIndex: -1, children: options.map((o, i) => /* @__PURE__ */ jsx(
      OptionRow,
      {
        o,
        i,
        lid,
        selected: o.value === value,
        active: i === active,
        onEnter: () => setActive(i),
        onPick: (e) => {
          e.preventDefault();
          pick(i);
        }
      },
      o.value
    )) })
  ] });
}
function Combobox({
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
  clearLabel
}) {
  const uid = useId();
  const iid = id ?? `cbx-${uid}`;
  const lid = `${iid}-list`;
  const labelOf = (v) => options.find((o) => o.value === v)?.label ?? v;
  const [text, setText] = useState(labelOf(value));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [remote, setRemote] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrap = useRef(null);
  const list = useRef(null);
  const input = useRef(null);
  const str = useStrings(wrap);
  const clearText = clearLabel ?? str("clear");
  useEffect(() => setText(labelOf(value)), [value]);
  useOutside(wrap, open, () => {
    setOpen(false);
    setText(labelOf(value));
  });
  const q = text.trim().toLowerCase();
  const query = q === labelOf(value).toLowerCase() ? "" : q;
  useEffect(() => {
    if (!loadOptions || !open) return;
    if (query.length < minChars) return setRemote([]);
    const ac = new AbortController();
    setLoading(true);
    const t = setTimeout(
      () => loadOptions(query, ac.signal).then(setRemote, () => {
      }).finally(() => setLoading(false)),
      180
    );
    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [query, open, loadOptions, minChars]);
  const results = useMemo(() => loadOptions ? remote : options.filter((o) => !query || `${o.label} ${o.sub ?? ""}`.toLowerCase().includes(query)).slice(0, 80), [loadOptions, remote, options, query]);
  useKeepVisible(list, active, open);
  const pick = (o) => {
    onChange(o.value);
    setText(o.label);
    setOpen(false);
  };
  const needsChars = !!loadOptions && query.length < minChars;
  const showing = open && (results.length > 0 || !needsChars && !loading && query.length > 0);
  useEffect(() => {
    if (showing) void lds().then((d) => d.fitLayer(list.current));
  }, [showing]);
  return /* @__PURE__ */ jsxs("div", { className: "select combobox", ref: wrap, children: [
    /* @__PURE__ */ jsxs("div", { className: cx("control combobox__control", showing && "is-open"), children: [
      icon && /* @__PURE__ */ jsx("span", { className: "ic", "aria-hidden": "true", children: icon }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: iid,
          ref: input,
          role: "combobox",
          "aria-expanded": showing,
          "aria-controls": lid,
          "aria-autocomplete": "list",
          "aria-activedescendant": showing && results[active] ? `${lid}-${active}` : void 0,
          "aria-label": label,
          value: text,
          placeholder,
          autoComplete: "off",
          onChange: (e) => {
            setText(e.target.value);
            setOpen(true);
            setActive(0);
            if (!e.target.value) onChange("");
          },
          onFocus: (e) => {
            setOpen(true);
            e.target.select();
          },
          onKeyDown: (e) => {
            if (e.key === "ArrowDown") setOpen(true), setActive((a) => Math.min(results.length - 1, a + 1));
            else if (e.key === "ArrowUp") setActive((a) => Math.max(0, a - 1));
            else if (e.key === "Enter" && showing && results[active]) pick(results[active]);
            else if (e.key === "Escape") {
              setOpen(false);
              setText(labelOf(value));
            } else return;
            e.preventDefault();
          }
        }
      ),
      loading && /* @__PURE__ */ jsx(Spinner, {}),
      !value && !loading && /* @__PURE__ */ jsx("button", { type: "button", tabIndex: -1, className: "control__btn combobox__arrow", "aria-hidden": "true", onClick: () => input.current?.focus(), children: /* @__PURE__ */ jsx("span", { className: "ic", children: "expand_more" }) }),
      value && !loading && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "control__btn",
          "aria-label": label ? `${clearText} ${label}` : clearText,
          onClick: () => {
            onChange("");
            setText("");
            input.current?.focus();
          },
          children: /* @__PURE__ */ jsx("span", { className: "ic", "aria-hidden": "true", children: "close" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: cx("menu select__menu", showing && "is-open"), role: "listbox", id: lid, ref: list, "aria-label": label, children: [
      results.map((o, i) => /* @__PURE__ */ jsx(
        OptionRow,
        {
          o,
          i,
          lid,
          selected: o.value === value,
          active: i === active,
          onEnter: () => setActive(i),
          onPick: (e) => {
            e.preventDefault();
            pick(o);
          }
        },
        o.value
      )),
      !results.length && !needsChars && !loading && query.length > 0 && /* @__PURE__ */ jsx("li", { className: "select__empty", role: "presentation", children: emptyText ?? str("noMatch") })
    ] })
  ] });
}
function Chart({ config, id, className }) {
  const ref = useRef(null);
  const key = JSON.stringify(config);
  useEffect(() => {
    let live = true;
    lds().then((m) => {
      if (live && ref.current) m.drawChart(ref.current, config);
    });
    return () => {
      live = false;
    };
  }, [key]);
  return /* @__PURE__ */ jsx("div", { ref, id, className: cx(!config.type || config.type === "xy" ? "chart" : void 0, className) });
}
export {
  AccordionItem,
  Alert,
  ButtonContent,
  Chart,
  Combobox,
  Ring,
  Segmented,
  Select,
  Spinner,
  Steps,
  Switch,
  Tabs,
  Thinking,
  closeModal,
  notify,
  reject,
  useReveal
};
