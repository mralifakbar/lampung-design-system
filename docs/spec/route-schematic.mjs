const cfg = (o) => JSON.stringify(o).replace(/'/g, '&#39;');

export default {
  title: 'Route schematic',
  group: 'Data display',
  order: 23,
  status: 'new',
  summary: 'The stops of one trip on a line: the part already travelled in the accent, the vehicle where it is now, and the place and time under each stop. A diagram, not a map, so it stays honest and readable at any width.',
  when: [
    'Tracking one shipment, delivery or trip through a few known stops: warehouse, hub, port, customer.',
    'The detail of a transfer or a booking with a layover: where it left, where it is, what comes next.',
    'A route people need at a glance beside the details, where a street map would add noise and loading time.',
  ],
  whenNot: [
    ['The history of one record with times and people, not places', 'timeline'],
    ['A fixed sequence of steps in a form', 'steps'],
    ['How far a value is toward a goal', 'target-bar'],
  ],
  where: 'At the top of a shipment or trip detail, full width of its column. Two to six stops. Under about 104 px per stop it turns vertical, stops listed down the left with their words beside them.',
  anatomy: [
    ['.route[data-lds-route]', 'Required. The fill box; `drawRoute` (or the hook) fills it from a config. `role="group"` named by `label`.'],
    ['svg.route__svg', 'Generated, hidden from assistive tech. `.route__track` (dotted, the whole way), `.route__done` (accent, the travelled part), `.route__dot` per stop (`.is-done`, `.is-next`).'],
    ['ol.route__stops > li.route__stop', 'Generated. One per stop: `.route__name` and `.route__sub` (time, code, status), plus the state in words for screen readers.'],
    ['.route__vehicle', 'Generated while under way. A ringed disc with the mode icon on the current leg; a flight turns along its arc.'],
  ],
  examples: [
    {
      title: 'A flight under way',
      desc: 'Air freight from Jakarta to Singapore, 65 % of the way. The arc draws in once, then the plane settles on it, turned along the curve.',
      stage: 'block',
      replay: true,
      html: `<div class="route" style="max-width: 560px;" data-lds-route='${cfg({ label: 'Air freight from Jakarta to Singapore, 65 percent of the way, landing at 08:45.', mode: 'flight', position: 0.65, stops: [{ name: 'Jakarta CGK', sub: 'Left 06:10' }, { name: 'Singapore SIN', sub: 'Lands 08:45' }] })}'></div>`,
    },
    {
      title: 'A road trip with stops',
      desc: 'Four stops by truck. Passed stops fill, the next one is marked in the accent, and the words under each say when.',
      stage: 'block',
      replay: true,
      html: `<div class="route" style="max-width: 640px;" data-lds-route='${cfg({ label: 'Road freight from Bandung to Yogyakarta, past Tasikmalaya, next stop Purwokerto.', mode: 'road', position: 1.4, stops: [{ name: 'Bandung', sub: 'Loaded 15 Nov, 21:00' }, { name: 'Tasikmalaya', sub: 'Passed 16 Nov, 01:40' }, { name: 'Purwokerto', sub: 'Due 06:30' }, { name: 'Yogyakarta', sub: 'Due 10:15' }] })}'></div>`,
    },
    {
      title: 'Narrow: vertical',
      desc: 'In a narrow column the same route runs down the left, so long place names never squeeze. A delivered route has no vehicle; every stop is filled.',
      stage: 'block',
      html: `<div class="route" style="max-width: 300px;" data-lds-route='${cfg({ label: 'Sea freight from Tanjung Priok to Singapore, delivered.', mode: 'sea', position: 2, stops: [{ name: 'Tanjung Priok, Jakarta', sub: 'Sailed 13 Nov, 18:00' }, { name: 'Batam anchorage', sub: 'Passed 15 Nov, 07:20' }, { name: 'Port of Singapore', sub: 'Delivered 15 Nov, 21:15' }] })}'></div>`,
      code: `<div class="route" data-lds-route='{"label":"Sea freight from Tanjung Priok to Singapore, delivered.","mode":"sea","position":2,"stops":[{"name":"Tanjung Priok, Jakarta","sub":"Sailed 13 Nov, 18:00"},{"name":"Batam anchorage","sub":"Passed 15 Nov, 07:20"},{"name":"Port of Singapore","sub":"Delivered 15 Nov, 21:15"}]}'></div>

<script type="module">
  import { drawRoute } from 'lampung-design-system/js';
  // the truck reported a new position: the travelled part and the vehicle move there
  drawRoute(el, { ...config, position: 1.8 });
</script>`,
    },
  ],
  variants: [
    ['mode: "flight"', 'Each leg is an arc and the plane turns along it.'],
    ['mode: "road" | "sea" | "rail"', 'Straight legs; the truck, ship or route icon.'],
    ['position', 'Where the vehicle is, counted in stops from 0 (1.4 is 40 % from the second stop to the third). The last index means arrived: no vehicle.'],
    ['.is-vertical', 'Set by the script when a stop gets under about 104 px; stops run down the left.'],
  ],
  states: [
    ['under way', 'Passed dots filled, the next dot ringed in the accent and its name in accent text, the vehicle on the current leg.'],
    ['arrived', 'Every dot filled, no vehicle, the last stop says when it arrived.'],
    ['delayed or on hold', 'Say it in the stop words ("Held at customs since 14:20") and with a badge beside the route; the schematic keeps its colors.'],
    ['loading', 'A `.skel` block of the same height in the fill box.'],
  ],
  motion: [
    'First view: the travelled legs draw in one after another over about 1.1 s in total, then the vehicle fades and settles from 0.6 on `--spring-smooth`. Dots fill as the line reaches them.',
    'Calling `drawRoute` again (another shipment, a new position) draws the travelled part in again from the start.',
    'Resizing relays the stops at once, without animation.',
    'Reduced motion: drawn at once, the vehicle simply appears.',
  ],
  a11y: [
    'The box is a group named by `label`, which should say the trip and where it is in one sentence.',
    'The stops are a real ordered list; each item ends with its state in words (Passed, Next stop, Ahead, Arrived).',
    'The drawing and the vehicle are `aria-hidden`; nothing lives only in the picture.',
  ],
  do: [
    'Write a time or status under every stop.',
    'Keep it to the stops people care about; two to six.',
    'Pair it with a [timeline](timeline) when the events between stops matter.',
  ],
  dont: [
    'Draw coastlines, countries or roads around it; it is a schematic.',
    'Loop the vehicle along the line; it stands where the trip is.',
    'Color stops by status alone; the words carry it.',
  ],
  js: '`data-lds-route` with a JSON config is drawn by `init()`. From code: `drawRoute(el, { label, mode, position, stops: [{ name, sub }] })` returns `{ config, update(next) }`; it redraws on resize.',
  related: ['timeline', 'steps', 'key-value', 'status-dot'],
};
