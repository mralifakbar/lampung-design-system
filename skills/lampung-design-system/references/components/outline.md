# Outline

Group: Navigation. Docs page: `docs/components/outline.html`.

An "On this page" list of the headings of one long page, with an ink line that follows the section in view. The list on the right of this page is one.

## Use it when
- A long page with four or more sections people jump between: documentation, a service guide, regulations, a long report.
- Wide screens with room for a third column beside the content.

## Use something else when
- Moving between pages of the app: use [App shell](app-shell.md).
- A list of sections that each replace the content: use [Sidebar](sidebar.md).
- Sibling sections where only one shows at a time: use [Tabs](tabs.md).
- A short page with two or three sections: use [Sections](sections.md). Let the headings do the work.

## Where it goes
A sticky column to the right of the content on wide screens (about 200 to 220 px), starting level with the page title. Hide it below about 1100 px; on phones the page headings are enough, or put the same links at the top of the page.

## Anatomy
| Part | What it is |
|---|---|
| `nav.toc[data-lds-toc]` | Required. The list with `aria-label="On this page"`; a 1.5 px rail on its left. |
| `.toc__ink` | The 1.5 px strong line on the rail that slides to the current link; first child, `aria-hidden`. |
| `a[href="#id"]` | Required. One link per section heading id. `aria-current="true"` marks the section in view. |

## Markup

**Follows the section in view.** Scroll the text on the right or pick a link: the ink slides to the section nearest the top of the window.
```html
<nav class="toc" data-lds-toc aria-label="On this page">
  <span class="toc__ink" aria-hidden="true"></span>
  <a href="#intro">Introduction</a>
  <a href="#grading">Requirements</a>
  <a href="#office-hours">Service hours</a>
</nav>
<!-- later in the page -->
<h2 id="intro">Introduction</h2> …
```

**Static state.** The same list without the script, for a server-rendered page that knows the current section.
```html
<nav class="toc" aria-label="On this page" style="width: 200px;">
  <a href="#ol2" aria-current="true">Usage</a>
  <a href="#ol2">Examples</a>
  <a href="#ol2">Accessibility</a>
</nav>
```

## States
| State | How |
|---|---|
| `aria-current="true"` | Strong text at weight 500; the ink sits beside it. |
| `hover` | Text darkens to strong over `--d-fast`. |

## Motion and microinteractions
- Ink: translates and resizes to the current link on `--spring-smooth` over `--d-smooth` (560 ms), so a fast scroll through several sections reads as one glide.
- Only one thing moves; the links change color, they do not slide or scale.
- Reduced motion: the ink moves in 120 ms linear. Use `scroll-behavior: smooth` on the page only under `prefers-reduced-motion: no-preference`.

## Accessibility
- `<nav aria-label="On this page">` with plain links to heading ids, in document order.
- `aria-current="true"` (not `page`) marks the section in view, because the page itself does not change.
- Give headings a `scroll-margin-top` equal to any sticky header so a jump does not hide the heading.

## Do
- Link only the `<h2>` level, or `<h2>` and `<h3>` at most.
- Use the exact heading text as the link text.

## Don't
- Use the outline as the main navigation.
- Show it on phones as a fixed column; it steals the width the text needs.

## Behavior (plain HTML)
`data-lds-toc` on `.toc` watches the elements its `a[href^="#"]` links point to (looked up by id in the document) with an IntersectionObserver whose bottom margin is -60 % of the window, marks the topmost visible section with `aria-current="true"`, and moves and sizes `.toc__ink`. It marks the first section on init.

## Related
[Sections](sections.md) · [Sidebar](sidebar.md) · [App shell](app-shell.md) · [Prose](prose.md)
