// Generated from react/index.tsx by scripts/build-react.mjs. Edit the source, then run npm run build:react.
import { type ReactNode } from 'react';
export type TabItem<T extends string> = {
    value: T;
    label: ReactNode;
    count?: number | string;
};
/** Underlined section tabs; the ink glides to the selected tab. For switching a value, use Segmented. */
export declare function Tabs<T extends string>({ value, onChange, items, label, align, className }: {
    value: T;
    onChange: (v: T) => void;
    items: TabItem<T>[];
    label: string;
    align?: 'fill' | 'start';
    className?: string;
}): import("react").JSX.Element;
/** Segmented control: two to four options, one thumb sliding on a spring. */
export declare function Segmented<T extends string>({ value, options, onChange, label, size, className }: {
    value: T;
    options: {
        value: T;
        label: ReactNode;
    }[];
    onChange: (v: T) => void;
    label: string;
    size?: 'md' | 'lg';
    className?: string;
}): import("react").JSX.Element;
/** One accordion item; put several inside <div className="acc"> (or "acc acc--fill"). */
export declare function AccordionItem({ title, sub, children, defaultOpen, id }: {
    title: ReactNode;
    sub?: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
    id?: string;
}): import("react").JSX.Element;
/** Switch with an optional second line; the thumb stretches once as it lands. */
export declare function Switch({ checked, onChange, children, sub, size, disabled }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    children: ReactNode;
    sub?: ReactNode;
    size?: 'sm';
    disabled?: boolean;
}): import("react").JSX.Element;
/** Horizontal steps; everything before `current` is done. */
export declare function Steps({ items, current, label }: {
    items: ReactNode[];
    current: number;
    label?: string;
}): import("react").JSX.Element;
export declare function Spinner({ size }: {
    size?: 'lg';
}): import("react").JSX.Element;
/** Inside a .btn: the label swaps to a spinner without changing the width. Add .is-loading to the button too. */
export declare function ButtonContent({ children, loading }: {
    children: ReactNode;
    loading?: boolean;
}): import("react").JSX.Element;
export type Tone = 'info' | 'success' | 'warning' | 'danger';
/** Inline alert with an optional title and actions. Danger is announced. */
export declare function Alert({ tone, title, children, actions, className }: {
    tone?: Tone;
    title?: ReactNode;
    children: ReactNode;
    actions?: ReactNode;
    className?: string;
}): import("react").JSX.Element;
/** Progress ring; the number counts up once (instantly with reduced motion). */
export declare function Ring({ value, max, size, label, tone, animate, ariaLabel }: {
    value: number;
    max?: number;
    size?: number;
    label?: ReactNode;
    tone?: 'success' | 'warning' | 'danger';
    animate?: boolean;
    ariaLabel?: string;
}): import("react").JSX.Element;
/** Work in progress: dot-grid wave, shimmering label, honest elapsed time (pass startedAt as Date.now()). */
export declare function Thinking({ label, startedAt, done }: {
    label: ReactNode;
    startedAt?: number;
    done?: boolean;
}): import("react").JSX.Element;
/** Toast plus a light haptic where supported. */
export declare function notify(o: {
    title: string;
    body?: string;
    icon?: string;
    action?: string;
    onAction?: () => void;
    duration?: number;
}, feel?: 'light' | 'success' | 'error'): void;
/** A refused input: shake it once and buzz. Put the reason in text next to it as well. */
export declare function reject(el: Element | null | undefined): void;
/** Plays a .modal or .overlay exit, then closes it (native dialog) and calls done. */
export declare function closeModal(el: Element | null | undefined, done?: () => void): void;
/** Reveal [data-lds-reveal] elements as they scroll in. Pass a key that changes per route to re-scan. */
export declare function useReveal(key?: string): void;
export type Option = {
    value: string;
    label: string;
    sub?: string;
};
/**
 * Select: a .select-trigger opening a listbox below it. Arrows, Home/End, Enter or Space picks,
 * Escape closes, typing jumps to the first option that starts with the letters.
 */
export declare function Select({ id, value, options, onChange, label, labelledBy, icon, placeholder, className }: {
    id?: string;
    value: string;
    options: Option[];
    onChange: (v: string) => void;
    label?: string;
    labelledBy?: string;
    icon?: string;
    placeholder?: string;
    className?: string;
}): import("react").JSX.Element;
/**
 * Combobox: an input that filters a listbox as you type. With `loadOptions`, options come from
 * a server (debounced, aborted when the query changes); otherwise `options` filter in the browser.
 * Says so when nothing matches.
 */
export declare function Combobox({ id, value, options, loadOptions, onChange, label, icon, placeholder, minChars, emptyText, clearLabel, }: {
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
}): import("react").JSX.Element;
/** Area, line, bar, combo, donut or gauge chart drawn from data by drawChart. React owns the config;
 *  a new config animates from what is on screen. Range controls: keep the period in state and pass a new config. */
export declare function Chart({ config, id, className }: {
    config: import('../js/lds.js').ChartConfig;
    id?: string;
    className?: string;
}): import("react").JSX.Element;
