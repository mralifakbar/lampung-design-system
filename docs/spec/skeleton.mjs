export default {
  title: 'Skeleton',
  group: 'Feedback',
  order: 7,
  summary: 'Grey shapes in the exact layout of the content that is loading, with a soft shine passing over them. When the data lands, nothing moves.',
  when: [
    'A view loads data and you already know its layout: a list of courses, a profile header, a dashboard of cards.',
    'The loading state of the four [data states](data-states) (loading, empty, error, loaded) for any data view.',
  ],
  whenNot: [
    ['A short wait with no known layout, or inside a row or control', 'spinner'],
    ['A button is running its action', 'button'],
    ['Measurable work (upload, export)', 'progress-bar'],
    ['Long work of unknown length where elapsed time matters', 'thinking'],
    ['The data loaded and there is nothing', 'empty-state'],
  ],
  where: 'In place of the real content, in the same container, with the same sizes, gaps and radii: avatar circles where avatars go, two text lines where a title and subtitle go. On phones and wide screens alike; show as many placeholder rows as fit the first screen, not more.',
  anatomy: [
    ['.skel', 'Required. One placeholder shape: `--bg-skeleton` with an 8 px radius. Size it inline (width, height, radius) to match the real element.'],
    ['.skel::after', 'The shine: a light band that crosses every 1.6 s. Automatic.'],
    ['container', 'The real container (a `.list`, a `.card`) with `aria-busy="true"` while loading.'],
  ],
  examples: [
    {
      title: 'List rows',
      desc: 'A square icon and two lines, the same as the loaded row.',
      stage: 'block',
      html: `<div class="list" style="max-width: 420px;" aria-busy="true" aria-label="Loading courses">
  <div class="lrow" aria-hidden="true"><div class="skel" style="width: 30px; height: 30px;"></div><div class="lrow__body"><div class="skel" style="height: 12px; width: 60%;"></div><div class="skel" style="height: 10px; width: 35%; margin-top: 8px;"></div></div></div>
  <div class="lrow" aria-hidden="true"><div class="skel" style="width: 30px; height: 30px;"></div><div class="lrow__body"><div class="skel" style="height: 12px; width: 48%;"></div><div class="skel" style="height: 10px; width: 30%; margin-top: 8px;"></div></div></div>
  <div class="lrow" aria-hidden="true"><div class="skel" style="width: 30px; height: 30px;"></div><div class="lrow__body"><div class="skel" style="height: 12px; width: 66%;"></div><div class="skel" style="height: 10px; width: 40%; margin-top: 8px;"></div></div></div>
</div>`,
    },
    {
      title: 'Profile header',
      desc: 'Circles for avatars, wider bars for headings.',
      stage: 'block',
      html: `<div class="card" style="max-width: 360px;" aria-busy="true" aria-label="Loading profile">
  <div class="docs-row" aria-hidden="true"><div class="skel" style="width: 56px; height: 56px; border-radius: 50%;"></div><div style="flex: 1;"><div class="skel" style="height: 16px; width: 70%;"></div><div class="skel" style="height: 12px; width: 45%; margin-top: 10px;"></div></div></div>
  <div class="skel" style="height: 12px; width: 100%; margin-top: 20px;" aria-hidden="true"></div>
  <div class="skel" style="height: 12px; width: 82%; margin-top: 8px;" aria-hidden="true"></div>
</div>`,
    },
    {
      title: 'Loading, then loaded',
      desc: 'Press the button: the real row replaces the placeholder in the same box, so nothing shifts.',
      stage: 'block',
      html: `<div class="docs-col" style="max-width: 420px;">
  <div class="list" id="sk-l" aria-busy="true"><div class="lrow" aria-hidden="true"><div class="skel" style="width: 30px; height: 30px;"></div><div class="lrow__body"><div class="skel" style="height: 12px; width: 55%;"></div><div class="skel" style="height: 10px; width: 30%; margin-top: 8px;"></div></div></div></div>
  <div class="docs-row"><button class="btn btn--secondary btn--sm" onclick="const l = document.getElementById('sk-l'); l.removeAttribute('aria-busy'); l.innerHTML = '<div class=&quot;lrow lrow--icon&quot;><span class=&quot;lrow__icon&quot;><span class=&quot;ic&quot; aria-hidden=&quot;true&quot;>menu_book</span></span><div class=&quot;lrow__body&quot;><div class=&quot;lrow__title&quot;>Database Systems</div><div class=&quot;lrow__sub&quot;>Week 9 of 14</div></div></div>';">Finish loading</button></div>
</div>`,
      code: `<div class="list" aria-busy="true" aria-label="Loading courses">
  <div class="lrow" aria-hidden="true">
    <div class="skel" style="width: 30px; height: 30px;"></div>
    <div class="lrow__body">
      <div class="skel" style="height: 12px; width: 55%;"></div>
      <div class="skel" style="height: 10px; width: 30%; margin-top: 8px;"></div>
    </div>
  </div>
</div>`,
    },
  ],
  states: [
    ['loading', '`aria-busy="true"` on the container, `.skel` shapes inside it marked `aria-hidden`.'],
    ['loaded', 'Replace the shapes with the content in the same container and remove `aria-busy`.'],
  ],
  motion: [
    'The shine is a gradient band moving with `transform: translateX()` from -100 % to 100 % over 1.6 s on `--ease-inout`, infinite. Only `transform` animates.',
    'Swap to the real content directly, or with a `--d-fast` (160 ms) fade; never slide content in over the skeleton.',
    'Reduced motion: the animation runs once in 1 ms, so the shapes are static grey.',
    'Do not show a skeleton for loads under about 300 ms; render nothing, then the content.',
  ],
  a11y: [
    'The shapes say nothing: `aria-hidden="true"` on each placeholder row.',
    'Mark the region `aria-busy="true"` and give it a name ("Loading courses") so screen reader users know something is coming.',
    'When the content arrives, it is read in the normal flow; do not announce every row.',
  ],
  do: [
    'Copy the real layout: the same sizes, gaps and radii.',
    'Show only what fits the first screen.',
    'Vary line widths a little, like real text.',
  ],
  dont: [
    'Use a generic block that does not match the content; the jump on load defeats the purpose.',
    'Put a spinner on top of a skeleton.',
    'Keep a skeleton when loading failed; show the error state with a retry.',
  ],
  related: ['data-states', 'spinner', 'empty-state', 'list'],
};
