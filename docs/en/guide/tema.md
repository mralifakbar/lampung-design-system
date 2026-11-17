# Theming and color

https://lampung.kartadinata.app/docs/en/guide/tema

Light and dark, accent presets with a local story, and how to use an agency's own color without breaking contrast.

## Light, dark and system

One attribute sets it all: `data-theme="light"`, `"dark"` or `"system"` on `<html>` or any element. Components read only tokens, so they switch by themselves. Call `restoreTheme()` before first paint so the saved choice applies without a flash; buttons with `data-lds-theme` switch the theme after `init()`. Details in [Theming](../components/theming.md).

```
<html lang="en" class="lds" data-theme="light">
<script type="module">
  import { init, restoreTheme, setTheme } from 'lampung-design-system/js';
  restoreTheme(document.documentElement, 'light');
  init();
  // setTheme('dark') from your settings
</script>
```

## Accent presets

Lampung green is the default accent. When a service needs another feel, LDS ships two presets with a local story. Put `data-accent` on `<html>` or one part of a page; only the accent roles change (primary button, selection, links, focus ring, first chart series), in light and dark, and every pairing is contrast tested.

| Preset | Attribute | Story |
| --- | --- | --- |
| Lampung green | `(none)` | The green of the regional emblem. Default. |
| Bay blue | `data-accent="teluk"` | The water of Teluk Lampung, the bay in front of Bandar Lampung. |
| Coffee brown | `data-accent="kopi"` | Lampung robusta coffee, roasted dark. |

Business permit applicationIn review

An officer is checking your documents. Expected in 3 working days.

[Contact an officer](#tema-stage)

## An agency's own color

An agency with its own identity color overrides only the accent roles after `lds.css`. Leave the other tokens alone: neutrals, status colors and gold are already balanced. Compute contrast for every pair in both themes; white on the accent and `--accent-text` on the canvas must be at least 4.5:1.

```
/* Your agency's accent, in both themes. Check every pair before shipping:
   python3 skills/antislop-human/contrast-check.py "#FFFFFF" "#1F5E3A" */
:root,
[data-theme="light"] {
  --accent: #1F5E3A;
  --accent-hover: #1A5233;
  --accent-pressed: #15452B;
  --accent-text: #1A5233;
  --accent-tint: #E9F2EC;
  --accent-tint-strong: #D3E5D9;
  --accent-ring: rgba(31, 94, 58, 0.24);
  --focus: #1F5E3A;
}
[data-theme="dark"] {
  --accent: #27744A;
  --accent-hover: #2B7C50;
  --accent-pressed: #1F5E3A;
  --accent-text: #8FD3AC;
  --accent-tint: rgba(80, 180, 120, 0.15);
  --accent-tint-strong: rgba(80, 180, 120, 0.25);
  --accent-ring: rgba(143, 211, 172, 0.35);
  --focus: #8FD3AC;
}
```

In Flutter, pass colors through `LdsColors.copyWith`:

```
MaterialApp(
  theme: LdsTheme.build(Brightness.light,
      colors: LdsColors.light.copyWith(accent: const Color(0xFF0B5CAD), accentText: const Color(0xFF0A4F96))),
  darkTheme: LdsTheme.build(Brightness.dark,
      colors: LdsColors.dark.copyWith(accent: const Color(0xFF1767C0), accentText: const Color(0xFF84B8F2))),
);
```

## Siger gold

Gold (`--gold`, `--gold-text`, `--gold-tint`) stays the same in every preset because it is identity, not action. Use it for the aksara band, identity badges (`badge--gold`) and small highlights. Never for buttons, links or the selected state.

## What not to do

- Use the regional coat of arms or an agency logo on a site that agency does not run.
- Recolor status colors (success, warning, danger) to match the accent: status colors carry their own meaning.
- Write dark-mode selectors in project CSS. Use tokens and dark mode follows.
