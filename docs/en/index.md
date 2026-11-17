# Introduction

https://lampung.kartadinata.app/docs/en/

Lampung Design System (LDS) is an open design system for building public-service websites and apps quickly, with a consistent look. One token file feeds CSS, JavaScript, shadcn/ui and Flutter; components are plain CSS classes; interactive behaviors live in one optional JavaScript module.

A community project, not an official product

LDS is built and maintained by an open source community. No government agency runs or endorses it. Its green and gold are inspired by the regional emblem and the siger crown, not official insignia.

## Who it is for

- **Local governments and their agencies** that need to ship digital services without redesigning buttons and forms every time.
- **Developers** who want tested components from one command, whatever the framework.
- **Designers** who need tokens, type and page patterns that already pass contrast checks.
- **Small businesses, communities and anyone** building for people in Lampung and beyond.

## Start with one command

```
npx lampung-ds@latest init
```

The CLI knows Next.js, Vite, TanStack Start, React Router, Astro, Laravel, plain HTML and Flutter. Per-framework guides are in [Installation](guide/instalasi.md); every command is in [CLI](guide/cli.md).

## What is in the box

- `tokens/tokens.json`: one source for color (light and dark), type, space, radius, depth and motion.
- `css/lds.css`: tokens and every component. Light by default; `data-theme="dark"` or `"system"` on any element switches it.
- `js/lds.js`: optional behaviors through `data-lds-*` attributes: layers, sheets with momentum, menus, toasts, steppers, OTP, data tables, kanban, calendars, maps, charts and aksara Lampung.
- `react/`, `dist/shadcn/`, the Flutter package `lampung_design_system` and the `lampung-ds` CLI.
- [179 components and recipes](components/index.md), each with usage, live examples, code, motion and accessibility.
- [Examples](../examples/en/index.md) of city services built only from the system: an operations dashboard, a citizen app and a public portal.

## Rules that keep it looking like itself

- White canvas. Group with `--bg-fill`, never with a shadow. Shadows only on things that float.
- One Lampung green accent for the primary action, the selection and links. Siger gold only for identity and ornament.
- Aksara Lampung as a quiet accent, always with its Latin reading.
- Type moves as a set: size, weight and tracking together.
- Enter on a spring, leave faster, and always start from where the element is now.
- Every interactive element is at least 44 × 44, keyboard reachable, with a visible focus ring.

## Guides

- [Installation](guide/instalasi.md): Pick your framework. The lampung-ds CLI sets everything up: it installs the package, imports the CSS, puts the lds class on <html> and

- [CLI](guide/cli.md): lampung-ds sets Lampung Design System up in your project. Pick a framework and the CLI installs lampung-design-system, imports the styleshee

- [Theming and color](guide/tema.md): Light and dark, accent presets with a local story, and how to use an agency's own color without breaking contrast.

- [Writing](guide/penulisan.md): How to write interface copy for public services in Indonesian: clear to every citizen, polite without padding, and always telling people wha

- [Accessibility](guide/aksesibilitas.md): Public services must work for every citizen, including people with disabilities and people on old phones or small screens. LDS carries part

- [For designers](guide/desainer.md): Where the LDS design sources live, which fonts to install, the seven decisions behind the look, and how to hand a design to developers witho

- [Contributing](guide/kontribusi.md): LDS is a community open source project. Anyone can report a problem, propose a component, improve a translation or send code. This page expl

- [Release notes](guide/catatan-rilis.md): What is new in each version of Lampung Design System.
