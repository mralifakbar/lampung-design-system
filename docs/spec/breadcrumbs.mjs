export default {
  title: 'Breadcrumbs',
  group: 'Navigation',
  order: 4,
  summary: 'The path from a section down to the current page, as links with chevrons between them. The last item is the current page and is not a link.',
  when: [
    'A page sits three or more levels deep in a hierarchy people need to climb back up: Services, Permits, Micro business permit.',
    'People land on deep pages from search or a shared link and need to see where they are.',
  ],
  whenNot: [
    ['A single step back on a phone screen', 'phone-bars', 'Use the nav bar back button'],
    ['Progress through an ordered flow (registration, payment)', 'steps'],
    ['The main navigation of the app', 'app-shell'],
    ['A flat site with two levels', 'top-nav', 'The current link in the nav already says where you are'],
  ],
  where: 'At the very top of the content, above the page title, as the first line of the [page header](page-header). Never inside the top bar or the sidebar. On phones keep it if it fits in two lines; otherwise show only the parent with a `chevron_left` back link.',
  anatomy: [
    ['nav[aria-label="Breadcrumb"]', 'Required. The landmark around the list.'],
    ['ol.crumbs', 'Required. The ordered list; wraps onto more lines when narrow.'],
    ['li > a', 'An ancestor page; quiet text with a tint on hover.'],
    ['li > .ic', 'A `chevron_right` separator in its own `<li>`, `aria-hidden`.'],
    ['li > span[aria-current="page"]', 'Required. The current page: strong text, not a link.'],
  ],
  examples: [
    {
      title: 'Service page',
      desc: 'Two ancestors and the current page.',
      html: `<nav aria-label="Breadcrumb">
  <ol class="crumbs">
    <li><a href="#bc">Services</a></li>
    <li><span class="ic" aria-hidden="true">chevron_right</span></li>
    <li><a href="#bc">Permits</a></li>
    <li><span class="ic" aria-hidden="true">chevron_right</span></li>
    <li><span aria-current="page">Micro business permit</span></li>
  </ol>
</nav>`,
    },
    {
      title: 'Starting from home',
      desc: 'An icon-only first crumb keeps a long path short; it still needs a name.',
      html: `<nav aria-label="Breadcrumb">
  <ol class="crumbs">
    <li><a href="#bc" aria-label="Home"><span class="ic" aria-hidden="true">home</span></a></li>
    <li><span class="ic" aria-hidden="true">chevron_right</span></li>
    <li><a href="#bc">Citizen reports</a></li>
    <li><span class="ic" aria-hidden="true">chevron_right</span></li>
    <li><a href="#bc">Roads and bridges</a></li>
    <li><span class="ic" aria-hidden="true">chevron_right</span></li>
    <li><span aria-current="page">Pothole report in Kedaton</span></li>
  </ol>
</nav>`,
    },
  ],
  states: [
    ['hover', 'The link darkens to strong text on a quiet tint over `--d-fast`.'],
    ['focus', 'System focus ring on the link.'],
    ['aria-current="page"', 'Strong text at weight 500, no hover, not focusable.'],
  ],
  motion: [
    'Only color and background ease, over `--d-fast` (160 ms). Nothing moves.',
  ],
  a11y: [
    'A `<nav aria-label="Breadcrumb">` around an `<ol>`, so screen readers announce "list, 3 items" in order.',
    'Separators are `aria-hidden` icons; the current page is a `<span aria-current="page">`.',
    'An icon-only crumb needs an `aria-label`.',
  ],
  do: [
    'Mirror the real hierarchy, not the history of where the person clicked.',
    'Use the same names as the page titles they point to.',
  ],
  dont: [
    'Link the current page to itself.',
    'Use breadcrumbs as the only way back on phones; the back button comes first.',
    'Truncate the middle with an ellipsis menu for fewer than five levels.',
  ],
  related: ['page-header', 'app-shell', 'phone-bars'],
};
