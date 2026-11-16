const cfg = (o) => JSON.stringify(o).replace(/'/g, '&#39;');

const CGK = [-6.1256, 106.6559], SIN = [1.3644, 103.9915];
const flight = {
  label: 'Air freight from Jakarta to Singapore, 65 percent of the way',
  routes: [{ path: [CGK, SIN], progress: 0.65, arc: true, vehicle: { icon: 'flight', label: 'Flight 884', sub: 'Lands 08:45' } }],
  markers: [
    { at: CGK, kind: 'origin', label: 'Jakarta CGK', sub: 'Left 06:10' },
    { at: SIN, kind: 'destination', label: 'Singapore SIN', sub: 'Lands 08:45' },
  ],
};
const road = [[-6.9175, 107.6191], [-6.94, 107.75], [-7.03, 107.89], [-7.06, 108.08], [-7.3274, 108.2207], [-7.33, 108.35], [-7.37, 108.54], [-7.30, 108.76], [-7.52, 109.06], [-7.4245, 109.2302], [-7.51, 109.29], [-7.61, 109.51], [-7.67, 109.65], [-7.72, 109.91], [-7.71, 110.01], [-7.86, 110.16], [-7.7956, 110.3695]];
const truck = {
  label: 'Road freight from Bandung to Yogyakarta, past Tasikmalaya, next stop Purwokerto',
  routes: [{ path: road, progress: 0.36, vehicle: { icon: 'local_shipping', label: 'Truck D 8812 KL', sub: 'Next: Purwokerto 06:30' } }],
  markers: [
    { at: road[0], kind: 'origin', label: 'Bandung', sub: 'Loaded 15 Nov, 21:00' },
    { at: road[4], kind: 'stop', done: true, label: 'Tasikmalaya', sub: 'Passed 16 Nov, 01:40' },
    { at: road[9], kind: 'stop', label: 'Purwokerto', sub: 'Due 06:30' },
    { at: road[16], kind: 'destination', label: 'Yogyakarta', sub: 'Due 10:15' },
  ],
};
const centres = {
  label: 'Exam centres in Bandung',
  scrollZoom: 'modifier',
  markers: [
    { at: [-6.8915, 107.6107], label: 'Dago centre', sub: '120 seats, 2 sessions left' },
    { at: [-6.9147, 107.6098], label: 'Braga centre', sub: '80 seats, full' },
    { at: [-6.9389, 107.6229], label: 'Buah Batu centre', sub: '96 seats, 5 sessions left' },
    { at: [-6.8721, 107.5841], label: 'Setiabudi centre', sub: '60 seats, 1 session left' },
    { at: [-6.9447, 107.5774], label: 'Kopo centre', sub: '140 seats, 8 sessions left' },
  ],
};
const swap = (o) => `this.closest('.docs-col').querySelector('.map')._ldsMap.handle.update(${cfg(o).replace(/"/g, '&quot;')})`;

export default {
  title: 'Map',
  group: 'Data display',
  order: 23.5,
  summary: 'A small slippy map over OpenStreetMap tiles: routes with the travelled part in the accent, the vehicle where it is, and pins for the places that matter. It draws only the tiles in view and always credits the map data in the corner.',
  when: [
    'Showing where a shipment, a driver or a flight is right now, on real geography, beside its details.',
    'A handful of places people choose between by where they are: exam centres, pickup points, branches.',
    'An overview of everything moving at once, where a click on a vehicle opens its record.',
  ],
  whenNot: [
    ['The stops of one trip in order, read at a glance without geography, or in a tight list row', 'route-schematic', 'It needs no tiles and no network, and reads the same at any width.'],
    ['The history of one record with times and people', 'timeline'],
    ['An address people only need to read or copy', 'key-value', 'Write the address; link to a full map app if they need directions.'],
  ],
  where: 'In the detail of a record, full width of its column, about 280 to 400 px tall (`--map-h`); in a drawer or on a phone 240 to 280 px. An overview map sits at the top of a page, full width. Never inside a card that already has a ring; the map has its own.',
  anatomy: [
    ['.map[data-lds-map]', 'Required. The box; set its height with `--map-h` (default 320 px). `drawMap` (or the hook) fills it from a config.'],
    ['.map__view', 'Generated. The focusable surface (`role="region"`, `aria-roledescription="map"`, named by `label`), described by a text summary of every marker.'],
    ['.map__tiles', 'Generated. The raster tiles in view; dimmed in dark by the `--map-tiles` filter token.'],
    ['svg.map__lines', 'Generated. Per route: `.map__casing` (a soft halo), `.map__track` (dashed, the part still ahead) and `.map__done` (accent, the part travelled).'],
    ['button.map__marker', 'Generated. One per marker: `--origin` (ringed disc), `--destination` (pin), `--stop` (dot, `.is-done` filled), `--point` (accent dot), `--vehicle` (ringed disc with the mode icon and a caret toward where it heads). `.map__label` shows on hover and focus.'],
    ['.map__controls', 'Generated. Zoom in, zoom out, and show everything.'],
    ['.map__attr', 'Generated. Required by the tile provider: "© OpenStreetMap contributors" linking to the copyright page. Never hide it.'],
    ['.map__status', 'Generated. "Loading map" while the first tiles arrive; when tiles fail, a note and Try again.'],
  ],
  examples: [
    {
      title: 'A flight under way',
      desc: 'The leg follows the great circle, bowed gently so it reads as a flight. The travelled part draws in on first view, then the plane settles, turned along its path. Drag, scroll, pinch or use the buttons; focus the map and use the arrow keys and plus or minus.',
      stage: 'block',
      replay: true,
      html: `<div class="map" style="--map-h: 340px;" data-lds-map='${cfg(flight)}'></div>`,
    },
    {
      title: 'A road trip with stops',
      desc: 'A truck route through road waypoints. Passed stops fill, the caret on the truck points the way it is heading, and each place says when in its label.',
      stage: 'block',
      html: `<div class="map" style="--map-h: 360px;" data-lds-map='${cfg(truck)}'></div>`,
    },
    {
      title: 'Several places, fitted',
      desc: 'Without routes, the map fits every marker with room for the pins. Inside a scrolling page, `scrollZoom: "modifier"` leaves the wheel to the page and zooms only with Ctrl or Cmd held, with a short hint.',
      stage: 'block',
      html: `<div class="map" style="--map-h: 300px; max-width: 560px;" data-lds-map='${cfg(centres)}'></div>`,
    },
    {
      title: 'Switching records: fly to fit',
      desc: 'Calling `drawMap` again on the same element (or `handle.update`) flies the map out and back in to fit the new route, then draws the travelled part. Any drag or key stops the flight where it is.',
      stage: 'block',
      html: `<div class="docs-col" style="gap: 12px;"><div class="cluster" style="--gap: 8px;"><button class="btn btn--secondary btn--sm" type="button" onclick="${swap(flight)}">Jakarta to Singapore</button><button class="btn btn--secondary btn--sm" type="button" onclick="${swap(truck)}">Bandung to Yogyakarta</button></div><div class="map" style="--map-h: 320px;" data-lds-map='${cfg(flight)}'></div></div>`,
      code: `<div class="map" style="--map-h: 320px;" data-lds-map='{"label":"Air freight from Jakarta to Singapore","routes":[{"path":[[-6.1256,106.6559],[1.3644,103.9915]],"progress":0.65,"arc":true,"vehicle":{"icon":"flight","label":"Flight 884"}}],"markers":[{"at":[-6.1256,106.6559],"kind":"origin","label":"Jakarta CGK"},{"at":[1.3644,103.9915],"kind":"destination","label":"Singapore SIN"}]}'></div>

<script type="module">
  import { drawMap } from 'lampung-design-system/js';
  const map = drawMap(el, config);          // or let init() read data-lds-map
  list.addEventListener('click', (e) => {
    const s = shipments[e.target.closest('[data-id]').dataset.id];
    map.update({ label: s.label, routes: s.routes, markers: s.markers });   // flies to fit
  });
  el.addEventListener('lds:mapselect', (e) => openShipment(e.detail.id));   // a marker was clicked
</script>`,
    },
  ],
  variants: [
    ['routes[].arc', 'Each leg follows the great circle, lifted into a gentle bow. For flights.'],
    ['routes[].progress', '0 to 1 of the length. The travelled part is solid accent, the rest dashed muted. 1 means arrived: no vehicle unless `vehicle.arrived`.'],
    ['routes[].thin', 'Thinner lines for an overview with many routes.'],
    ['markers[].kind', '`origin`, `destination`, `stop` (`done: true` fills it), `point`. Vehicles come from `routes[].vehicle`.'],
    ['tone: "warning" | "danger"', 'On a vehicle or point: the ring and caret take the status color. Say the status in its label too.'],
    ['size: "sm", selected', 'Smaller vehicles for an overview; `selected: true` fills the chosen one with the accent and sets `aria-pressed`.'],
    ['fitTo: "markers"', 'Fit only the markers and vehicles, not every whole route. For overviews where routes run far beyond where things are now.'],
    ['scrollZoom', '`true` (default) the wheel zooms; `"modifier"` only with Ctrl or Cmd, for maps inside a scrolling page; `false` never.'],
    ['tiles, attribution', 'Another tile server (`{z}/{x}/{y}` URL) and its required credit.'],
  ],
  states: [
    ['loading', 'Lines and markers draw at once on the quiet fill; tiles fade in as they arrive. After 300 ms without any tile, "Loading map" shows in the corner.'],
    ['tile error', 'When every tile in view fails, the corner says so and offers Try again; the routes and markers stay usable on the plain fill.'],
    ['empty', 'With no markers and no routes, the map shows the world at zoom 2. Usually show an empty state instead of the map.'],
    ['focus', 'The whole box gets the focus ring; a focused marker rings its pin and shows its label.'],
    ['dragging', 'The cursor turns to grabbing; marker clicks are ignored after a drag.'],
  ],
  motion: [
    'First view: the travelled part draws in over 1 s (ease out), then the vehicle fades and settles from 0.6 on `--spring-smooth`.',
    'Fitting a new route flies: the map zooms out and back in on the way when the target is far (480 to 1300 ms, ease in out). Any pointer, wheel or key stops it where it is.',
    'A flick keeps panning and slows on its own (exponential decay, time constant 325 ms). Buttons and keys zoom one level in 320 ms around the center; arrows pan 80 px (240 with Shift) in 200 ms.',
    'Tiles fade in over `--d-standard`; the previous zoom level stays underneath until the new one is in, so the map never flashes blank.',
    'Reduced motion: no draw-in, no flight, no momentum; the view jumps.',
  ],
  a11y: [
    'The map surface is focusable, named by `label` and described by a sentence per marker ("Origin: Jakarta CGK, Left 06:10. Now: Flight 884, Lands 08:45 …") plus how to use the keys.',
    'Arrow keys pan, plus and minus zoom, Home or 0 shows everything. The zoom and fit buttons are real buttons with names; zoom buttons disable at the limits.',
    'Markers are buttons with a full name (kind, place, time); their visual labels are hidden from assistive tech to avoid double reading.',
    'Nothing lives only on the map: keep the route, the status and the times in the record next to it.',
    'The attribution link stays visible and reachable by keyboard.',
  ],
  do: [
    'Give every route a vehicle label and every place a time or status.',
    'Use `scrollZoom: "modifier"` when the map sits in a page that scrolls.',
    'Keep the attribution; use your own tile server for heavy traffic.',
  ],
  dont: [
    'Put two maps of the same thing side by side, or a route schematic right next to the map.',
    'Color vehicles by status alone; the label says it.',
    'Animate the vehicle along the line in a loop; it stands where the trip is.',
  ],
  js: '`data-lds-map` with a JSON config is drawn by `init()`. From code: `drawMap(el, { label, routes: [{ path, progress, arc, vehicle }], markers: [{ at, kind, label, sub, id }] })` returns a handle with `update(next)`, `fit()`, `zoomIn()`, `zoomOut()`, `flyTo(center, zoom)`, `view` and `destroy()`. A marker click fires `lds:mapselect` with `{ id, marker, kind, element }`. Tiles default to `https://tile.openstreetmap.org/{z}/{x}/{y}.png`; no extra library, no API key.',
  related: ['route-schematic', 'timeline', 'key-value', 'status-dot'],
};
