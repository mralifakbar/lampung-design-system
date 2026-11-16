// Types for js/lds.js. Every function is safe to import during server rendering; the ones that
// touch the DOM only run in the browser.

export type ThemeMode = 'light' | 'dark' | 'system';
export type HapticKind = 'light' | 'medium' | 'success' | 'error';

export interface ToastOptions {
  title: string;
  body?: string;
  icon?: string;
  /** Label of the action button, for example "Undo". */
  action?: string;
  /** Runs on the action. Return { title, icon } to change the toast in place instead of closing it. */
  onAction?: () => void | { title?: string; icon?: string };
  /** Milliseconds before it leaves; the clock pauses while the stack is hovered or focused. */
  duration?: number;
  /** Element that holds (or will hold) the .toaster; defaults to document.body. */
  container?: Element;
}
export type ToastHandle = (() => void) & { update?: (o: { title?: string; icon?: string }) => void };

/** Wires every [data-lds-*] element under root. Safe to call again after rendering new markup. */
export function init(root?: Element | Document): void;

export function swapTheme(apply: () => void): void;
export function setTheme(mode: ThemeMode, root?: Element): void;
export function restoreTheme(root?: Element, fallback?: ThemeMode): ThemeMode;

export function openLayer(id: string, from?: Element | null): void;
export function closeLayer(id: string | Element | null): void;
export function closeMenus(): void;

export function openModal(el: HTMLDialogElement | null | undefined): void;
/** Plays the exit (.is-closing), then closes a native .modal or calls done for an in-place .overlay. */
export function closeModal(el: Element | null | undefined, done?: () => void): void;

export function toast(o: ToastOptions): ToastHandle;
export function setLoading(button: Element, on: boolean): void;
export function setRoll(el: Element, value: number | string): void;
export function otpError(wrap: Element): void;
export function morphText(el: Element, next: string): void;
export function shake(el: Element): void;
export function haptic(kind?: HapticKind): void;
export function likeRevert(btn: Element): void;
export function resetHints(keys?: string[]): void;
export function thinkingDone(el: Element, label?: string): void;
export function uploadProgress(drop: Element, pct: number): void;
export function uploadReset(drop: Element): void;

/** Watches [data-lds-reveal] under root, including markup added later. Returns a stop function. */
export function observeReveal(root?: Element | Document): () => void;
/** Moves .shell__hl to the link with aria-current="page"; call after changing it outside the DOM observer. */
export function placeShellHighlight(shell: Element): void;
/** Writes text into el word by word, each word fading in; resolves when done. Instant with reduced motion. */
/** Says text through one shared polite live region (copied, saved, sorted). */
export function announce(text: string): void;
/** Puts a slide-to-confirm back to its start. */
export function slideReset(track: Element | null | undefined): void;
/** true when a navigation starts, false when the page is in: the bar runs to the end and fades. */
export function navProgress(el: Element | null | undefined, running: boolean): void;
/** Moves `to` from where `from` is to its own place (or back with { back: true }); `from` hides during the flight. */
/** Keeps a floating layer inside the screen and its clipping container: swaps sides, then shifts what still overflows. */
export function fitLayer(el: Element | null | undefined): void;
/** Scales a .device frame to fit its parent's width and the window height (never above 1). */
export function fitDevice(el: Element | null | undefined): void;
/** Slides the .navstack__view with this id (or element) in over the current screen of its .navstack. */
export function pushView(id: string | Element, from?: Element | null): void;
/** Pops the top screen of a .navstack (pass the stack or any element inside it). */
export function popView(target: Element): void;
/** Pops every pushed screen of a .navstack back to its first one. */
export function popToRoot(target: Element): void;
/** Runs a pull-to-refresh on a [data-lds-refresh] scroller without the gesture. */
export function startRefresh(scroller: Element | null | undefined): void;
export function flip(from: Element | null | undefined, to: Element | null | undefined, opts?: { back?: boolean }): Promise<void>;
export function streamText(el: Element, text: string, opts?: { wordMs?: number }): Promise<void>;

/* ---------- Data charts ---------- */
export interface ValueFormat { prefix?: string; suffix?: string; decimals?: number; /** Axis ticks read 12.4k (on by default from 10,000); tooltips and tables keep the full value. false turns it off. */ compact?: boolean }
/** 1 to 4 picks --series-n; 'neutral' is the Other series; 'muted' recedes it. Defaults to the series' position. */
export type SeriesColor = 1 | 2 | 3 | 4 | 'neutral' | 'muted';
export interface ChartSeries { name: string; values: number[]; kind?: 'area' | 'line' | 'bar'; color?: SeriesColor; /** Comparison or previous period: a thinner dashed line. */ dashed?: boolean }
export interface XYChartConfig {
  type?: 'xy';
  /** Takeaway sentence: becomes the accessible name and the caption of the hidden data table. */
  label: string;
  /** Short x labels (thinned to fit the width). */ x: string[];
  /** Long x labels for the tooltip and the table ("Tue 12 Nov"); defaults to x. */ xFull?: string[];
  xName?: string;
  series: ChartSeries[];
  /** Default kind for series without one. */ kind?: 'area' | 'line' | 'bar';
  /** Stack areas and bars (negative values stack below zero). */ stacked?: boolean;
  /** Step edges instead of straight segments between points. */ step?: boolean;
  y?: { min?: number; max?: number; ticks?: number; hide?: boolean };
  format?: ValueFormat;
  /** Dashed reference lines: a target, an average, a limit. */ refs?: { value: number; label?: string }[];
  /** Index of the one bar that answers the question; the others recede. Single bar series only. */ highlight?: number;
  /** Adds a Total row to the tooltip. */ total?: boolean;
  /** false hides the legend (it toggles series when there are two or more). */ legend?: boolean;
  /** Plot height in px (default 220). */ height?: number;
  /** false skips the grow-in on first view. */ animate?: boolean;
  /** Named datasets a range control can switch to (data-lds-chart-for). */ sets?: Record<string, Partial<XYChartConfig>>;
}
export interface Segment { name: string; value: number; color?: SeriesColor }
export interface DonutConfig { type: 'donut'; label?: string; segments: Segment[]; center?: string; unit?: string; format?: ValueFormat; size?: number; thin?: boolean; sets?: Record<string, Partial<DonutConfig>> }
export interface GaugeConfig { type: 'gauge'; label: string; value?: number; max?: number; tone?: 'success' | 'warning' | 'danger'; /** Ticks shared by parts instead of one value. */ segments?: Segment[]; ticks?: number; center?: string; unit?: string; format?: ValueFormat; minLabel?: string; maxLabel?: string; sets?: Record<string, Partial<GaugeConfig>> }
export type ChartConfig = XYChartConfig | DonutConfig | GaugeConfig;
export interface ChartHandle { el: Element; type: string; config: ChartConfig; update(next: Partial<ChartConfig>): void; toggle?(series: number, show?: boolean): void }
/** Draws a chart from data into el; calling it again (or handle.update) animates from what is on screen. */
export function drawChart(el: Element, config: ChartConfig): ChartHandle | null;
/** Formats a number the way charts do: thousands separators, prefix and suffix, optional compact k and M. */
export function formatValue(value: number, format?: ValueFormat): string;

// [dash-foundation] App shell rail, selection, data table, trend delta, event calendar, date range
/** Classic-script helper for <head>: marks <html data-shell-rail> when the sidebar was left folded, so it paints folded. */
export function restoreRail(root?: Element): void;
/** Folds (true) or unfolds the app shell sidebar to its icons on wide screens and remembers the choice. */
export function setRail(shell: Element | null | undefined, on: boolean): void;
/** Re-reads [data-lds-select] checkboxes of a [data-lds-selection] container (after rows changed). */
export function selectionRefresh(box: Element | null | undefined): void;
/** Re-reads the rows of a [data-lds-table] after they were added or removed, then filters, sorts and pages again. */
export function tableRefresh(root: Element | null | undefined): void;
/** Recomputes the group checkboxes (checked, mixed, disabled) of a check matrix after code changed its cells. */
export function matrixRefresh(table: Element | null | undefined): void;
/** Shows the loading or error rows (tr.dtable__state[data-state]) of a data table, or its data with "ready". */
export function tableState(root: Element | null | undefined, mode: 'loading' | 'error' | 'ready'): void;
export interface DeltaOptions { goodWhen?: 'up' | 'down'; unit?: string; note?: string; digits?: number; }
/** Rewrites a .delta for a new change: arrow direction, good or bad color, signed value and the screen reader sentence. */
export function setDelta(el: Element | null | undefined, change: number, opts?: DeltaOptions): void;
export interface CalendarEvent { id: string; title: string; start: string; end?: string; allDay?: boolean; tone?: 1 | 2 | 3 | 4; where?: string; [key: string]: unknown; }
export interface EventCalendarHandle {
  set(events: CalendarEvent[]): void;
  go(date: string): void;
  view(name: 'month' | 'week' | 'agenda'): void;
  filter(fn?: (e: CalendarEvent) => boolean): void;
  today(): void;
  readonly events: CalendarEvent[];
}
/** Renders (once) the event calendar in el (.evcal[data-lds-events]) and returns its handle; later calls return the same handle. */
export function eventCalendar(el: Element | null | undefined, opts?: { events?: CalendarEvent[] }): EventCalendarHandle | null;
export interface DateRangeHandle { readonly start: string; readonly end: string; set(start: string, end: string): void; }
/** Wires a .daterange[data-lds-daterange] (init() does this) and returns its handle. */
export function dateRange(box: Element | null | undefined): DateRangeHandle | null;

// [pages-2] Route schematic
export interface RouteStop { name: string; sub?: string }
export interface RouteConfig { label?: string; mode?: 'flight' | 'road' | 'sea' | 'rail'; /** Stops counted from 0; 1.4 is 40 % of the way from the second stop to the third. */ position?: number; stops: RouteStop[]; /** false skips the draw-in. */ animate?: boolean }
export interface RouteHandle { config: RouteConfig; update(next: Partial<RouteConfig>): RouteHandle | null }
/** Draws a route schematic into el (.route): stops on a line, the travelled part in the accent, the vehicle where it is. */
export function drawRoute(el: Element | null | undefined, config: RouteConfig): RouteHandle | null;

// [map] Map
/** [latitude, longitude] in degrees. */
export type LatLng = [number, number];
export interface MapMarker {
  at: LatLng;
  /** origin: ringed disc; destination: pin; stop: small dot (done fills it); point: accent dot. Default point. */
  kind?: 'origin' | 'destination' | 'stop' | 'point';
  label?: string; sub?: string;
  /** Returned in the lds:mapselect event when the marker is clicked. */
  id?: string;
  icon?: string; done?: boolean; open?: boolean; selected?: boolean;
  tone?: 'warning' | 'danger'; size?: 'sm';
}
export interface MapVehicle { icon?: string; label?: string; sub?: string; id?: string; tone?: 'warning' | 'danger'; size?: 'sm'; selected?: boolean; open?: boolean; /** Keep the vehicle at the end of a finished route. */ arrived?: boolean }
export interface MapRoute {
  path: LatLng[];
  /** 0 to 1 of the length: the travelled part is drawn in the accent, the rest dashed. */
  progress?: number;
  /** Each leg follows the great circle, lifted into a gentle bow (flights). */
  arc?: boolean;
  thin?: boolean;
  /** A vehicle marker at the progress point, turned along the line. */
  vehicle?: MapVehicle;
}
export interface MapConfig {
  /** Accessible name of the map. */
  label: string;
  /** Text for screen readers; by default a sentence per marker. */
  summary?: string;
  markers?: MapMarker[];
  routes?: MapRoute[];
  /** A fixed view instead of fitting every route and marker. */
  center?: LatLng; zoom?: number;
  /** false keeps the current view on update. */
  fit?: boolean;
  /** 'markers' fits only the markers and vehicles, not whole routes (overviews). */
  fitTo?: 'all' | 'markers';
  fitMaxZoom?: number; padding?: number; minZoom?: number; maxZoom?: number;
  /** Tile URL with {z} {x} {y} (and optional {s}). Default: OpenStreetMap. */
  tiles?: string;
  /** HTML for the attribution corner; keep the provider's required credit. */
  attribution?: string;
  /** 'modifier' zooms on Ctrl or Cmd plus wheel only (maps inside a scrolling page); false never. */
  scrollZoom?: boolean | 'modifier';
  /** false skips the draw-in and the flight to a new view. */
  animate?: boolean;
}
export interface MapHandle {
  readonly el: Element;
  readonly config: MapConfig;
  readonly view: { center: LatLng; zoom: number };
  /** Merges and redraws; flies to fit the new routes unless fit is false. */
  update(next: Partial<MapConfig>): MapHandle;
  fit(opts?: { animate?: boolean }): void;
  zoomIn(): void;
  zoomOut(): void;
  flyTo(center: LatLng, zoom?: number): void;
  destroy(): void;
}
/** Draws a slippy map into el (.map) with routes and markers; calling it again on the same element updates it. Fires lds:mapselect ({ id, marker, kind, element }) when a marker is clicked. */
export function drawMap(el: Element | null | undefined, config: MapConfig): MapHandle | null;

declare const lds: {
  init: typeof init; setTheme: typeof setTheme; swapTheme: typeof swapTheme; restoreTheme: typeof restoreTheme;
  openLayer: typeof openLayer; closeLayer: typeof closeLayer; closeMenus: typeof closeMenus;
  toast: typeof toast; setLoading: typeof setLoading; setRoll: typeof setRoll; otpError: typeof otpError;
  morphText: typeof morphText; shake: typeof shake; haptic: typeof haptic; likeRevert: typeof likeRevert;
  resetHints: typeof resetHints; thinkingDone: typeof thinkingDone; uploadProgress: typeof uploadProgress;
  uploadReset: typeof uploadReset; openModal: typeof openModal; closeModal: typeof closeModal;
  observeReveal: typeof observeReveal; placeShellHighlight: typeof placeShellHighlight; streamText: typeof streamText; announce: typeof announce; slideReset: typeof slideReset; navProgress: typeof navProgress; flip: typeof flip; fitLayer: typeof fitLayer; fitDevice: typeof fitDevice; pushView: typeof pushView; popView: typeof popView; popToRoot: typeof popToRoot; startRefresh: typeof startRefresh; drawChart: typeof drawChart; formatValue: typeof formatValue;
  restoreRail: typeof restoreRail; setRail: typeof setRail; selectionRefresh: typeof selectionRefresh; tableRefresh: typeof tableRefresh; matrixRefresh: typeof matrixRefresh; tableState: typeof tableState; setDelta: typeof setDelta; eventCalendar: typeof eventCalendar; dateRange: typeof dateRange; drawRoute: typeof drawRoute; drawMap: typeof drawMap;
};
export default lds;
