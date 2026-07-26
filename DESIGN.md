---
name: Roshan Shah Portfolio
description: A cinematic builder's portfolio where finance, AI, and hardware meet, lit like a mission-control panel at midnight.
colors:
  telemetry-gold: "#D4AF37"
  signal-amber: "#FBBF24"
  scanline-cyan: "#00D9FF"
  deep-space-blue: "#3B82F6"
  void-black: "#09090B"
  panel-charcoal: "#18181B"
  instrument-white: "#EDEDED"
  muted-zinc: "#71717A"
  hairline: "#FFFFFF1A"
  glass-fill: "#FFFFFF05"
  destructive: "#EF4444"
typography:
  display:
    class: "t-display"
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 11vw, 8.5rem)"
    fontWeight: 800
    fontStretch: "112%"
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  display-split:
    class: "t-display-split"
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 6rem)"
    fontWeight: 800
    fontStretch: "112%"
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  headline:
    class: "t-headline"
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 1.9375rem)"
    fontWeight: 700
    fontStretch: "105%"
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    class: "t-title"
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    class: "t-body"
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 450
    lineHeight: 1.65
    letterSpacing: "0.005em"
    measure: "68ch"
  meta:
    class: "t-meta"
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 450
    lineHeight: 1.55
    letterSpacing: "0.005em"
  label:
    class: "t-label"
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 550
    fontStretch: "87.5%"
    lineHeight: 1.4
    letterSpacing: "0.14em"
    textTransform: "uppercase"
  tag:
    class: "t-tag"
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 450
    fontStretch: "87.5%"
    lineHeight: 1.4
    letterSpacing: "0.02em"
  eyebrow:
    class: "t-eyebrow"
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 550
    fontStretch: "87.5%"
    lineHeight: 1.4
    letterSpacing: "0.32em"
    textTransform: "uppercase"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.signal-amber}"
    textColor: "{colors.signal-amber}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-ghost:
    backgroundColor: "{colors.glass-fill}"
    textColor: "{colors.instrument-white}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  chip-focus:
    backgroundColor: "{colors.signal-amber}"
    textColor: "{colors.signal-amber}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  chip-personality:
    backgroundColor: "{colors.scanline-cyan}"
    textColor: "{colors.scanline-cyan}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  card:
    backgroundColor: "{colors.glass-fill}"
    textColor: "{colors.instrument-white}"
    rounded: "{rounded.sm}"
    padding: "16px"
  resume-pill:
    backgroundColor: "{colors.void-black}"
    textColor: "{colors.telemetry-gold}"
    rounded: "{rounded.full}"
    padding: "0 12px"
---

# Design System: Roshan Shah Portfolio

## 1. Overview

**Creative North Star: "Mission Control at Midnight"**

The page reads like an instrument panel in a dark room: a near-black field with a live 3D starfield behind it, and content lit by two signal colors, a telemetry gold and a scanline cyan. It is a builder's portfolio for founders and engineers, so the craft of the page is itself the evidence. Type goes cinematic and large (the hero name fills the viewport), motion is scroll-driven, and an optional guided tour walks a visitor through the work like a flight director narrating a sequence.

Bold is the brief, but never loud for its own sake. Every effect earns attention or comprehension; the moment a flourish fights readability it is cut. The register is cinematic-but-disciplined: maximal ambition, minimal gimmick.

This system explicitly rejects the generic SaaS landing template (no cream/navy kit, no hero-metric blocks, no identical feature-card grids), the stiff corporate resume (no LinkedIn-style bullet walls), and crypto/AI neon futurism (no gradient text, no overhyped "next-gen" framing). It also rejects decoration that outshouts the content: glassmorphism is not a default here.

The signature to protect is the blue space theme itself: the deep near-black field, the live 3D starfield, and the blue atmospheric glow. It is clean and it is the identity. Everything else (the gold/amber and cyan accents, the type) sits on top of that field and must never flatten or fight it.

**Key Characteristics:**
- The blue space field is the hero: near-black zinc base (`#09090B`) with a live 3D starfield and blue atmospheric glow. Preserve it.
- Two-signal accent system layered on top: gold/amber for work, cyan for personality and interaction.
- Oversized Archivo display type, expanded on its width axis, against small condensed Martian Mono labels.
- Motion is choreographed but exponential and calm (no bounce, no elastic).
- Content leads; effects support; the space field stays.

## 2. Colors

A near-black instrument field carrying two saturated signals plus a structural blue glow. This is a Committed strategy: the dark surface dominates, and the two accents do deliberate, non-interchangeable work.

### Primary
- **Telemetry Gold** (`#D4AF37`): the identity accent. Section headings, the resume pill, the tour controls, and the primary "work" signal. Warmer and more metallic than the brighter amber.
- **Signal Amber** (`#FBBF24`): the brighter, higher-chroma partner to gold. Used for inline emphasis (the highlighted name), primary contact button, and the work-focus chips (robotics, drone tech, trading).

### Secondary
- **Scanline Cyan** (`#00D9FF`): the interaction and personality signal. Program subtitles, the profile scan-line, and the personality chips (finance + ai, tabla, poker). Also the cyan hover accent on ghost buttons.

### Tertiary
- **Deep Space Blue** (`#3B82F6`): the signature atmosphere (the `--color-primary` token, the starfield particles, focus and text glows). This is the blue of the space theme and the thing that makes the site feel clean and distinct. It carries the mood, so it stays out of copy and buttons rather than being diluted into them.

### Neutral
- **Void Black** (`#09090B`, zinc 950): the base background under the 3D field.
- **Panel Charcoal** (`#18181B`, zinc 900): raised surfaces and secondary panels.
- **Instrument White** (`#EDEDED`): primary text. Never pure `#fff`.
- **Muted Zinc** (`#71717A`): labels, metadata, de-emphasized text.
- **Hairline** (`#FFFFFF1A`, white at 10%): the default border on cards, pills, and chips.
- **Glass Fill** (`#FFFFFF05`, white at 2%): the barely-there card fill that reads as surface without a hard edge.

### Named Rules
**The Two-Signal Rule.** Gold/amber marks work and focus; cyan marks personality and interaction. Never swap the two, and never rely on color alone to carry the distinction (pair with position, label, or icon), so it survives color-blindness.

**The Blue-Stays-Behind Rule.** Deep Space Blue belongs to the atmosphere: glows, particles, focus rings. It is forbidden as a text or button color, so it never competes with the two content signals.

**The Space-Field-Is-Sacred Rule.** The blue space field (near-black base + live 3D starfield + blue glow) is the signature and stays. Do not swap it for a flat dark background, a different hue, or a busier pattern. New surfaces sit on top of it as faint hairline planes; they never cover it edge to edge.

## 3. Typography

**Display / Body Font:** Archivo (variable, `wght` 100-900 and `wdth` 62-125, with ui-sans-serif, system-ui fallback)
**Label/Mono Font:** Martian Mono (variable, `wght` 100-800 and `wdth` 75-112.5, with ui-monospace fallback)

**Character:** One grotesque carries every proportional size, and the display contrast comes from its *width* axis rather than a second family. The hero name runs expanded to 112% like a stamped nameplate; body copy runs at normal width; the skeleton never changes. Martian Mono is the instrument voice: condensed to 87.5% so tracked caps stay compact, and never used above 0.75rem. Two families, nine roles, one 1.25 ratio.

### Hierarchy

Every role is a class in `globals.css`, not a stack of Tailwind utilities. Use the class; override only color and spacing alongside it.

| Class | Size | Weight | Width | Leading | Tracking | Use |
|---|---|---|---|---|---|---|
| `t-display` | `clamp(3rem, 11vw, 8.5rem)` | 800 | 112% | 0.92 | -0.045em | Hero name only |
| `t-display-split` | `clamp(2.5rem, 8vw, 6rem)` | 800 | 112% | 0.92 | -0.045em | Intro splash, name in two lockups |
| `t-headline` | `clamp(1.5rem, 2.6vw, 1.9375rem)` | 700 | 105% | 1.05 | -0.02em | Section titles, in Telemetry Gold |
| `t-title` | 1.25rem | 700 | normal | 1.3 | -0.01em | Card headers: school, company, project |
| `t-quote` | 1.25rem serif italic | 400 | normal | 1.45 | 0.01em | The footer pull quote, and nothing else |
| `t-body` | 1rem | 450 | normal | 1.65 | 0.005em | Prose. Pair with `.measure` (68ch) |
| `t-meta` | 0.875rem | 450 | normal | 1.55 | 0.005em | Roles, sub-lines, captions, links |
| `t-label` | 0.75rem mono | 550 | 87.5% | 1.4 | 0.14em | UPPERCASE micro-labels, dates, categories |
| `t-tag` | 0.75rem mono | 450 | 87.5% | 1.4 | 0.02em | Skills, tech stacks, chips (not uppercased) |
| `t-eyebrow` | 0.75rem mono | 550 | 87.5% | 1.4 | 0.32em | Hero and intro only, twice on the page |

Two utilities compose with the above: `.measure` caps a column at 68ch, and `.t-num` sets `tabular-nums` so dates and counters do not jitter.

**Fluid where cinematic, fixed where readable.** Display uses `clamp()` because it is the page's cinematic moment and must fill a viewport. Everything at reading size is a fixed rem step (12 / 14 / 16 / 20), so card layouts stay spatially predictable across breakpoints. Headline is fluid but tightly bounded, because it must hold a ratio to the fixed steps under it at every width.

**Light-on-dark compensation.** Light type on a near-black field loses perceived weight and gains apparent tightness, so prose compensates on all three axes at once: line-height 1.65, tracking +0.005em, and a real body weight of 450 (available because Archivo is variable).

### Named Rules
**The Uppercase-Mono Label Rule.** Uppercasing is reserved for Martian Mono micro-labels (`t-label`, `t-eyebrow`) and the logotype-style hero. Prose is never uppercased, and in the personal copy it stays lowercase and casual, first person, concrete over label. Mono that names a term rather than a heading (skills, tech stacks) uses `t-tag` and keeps its natural case.

**The No-Gaps Rule.** Every adjacent pair in the reading ladder (label through headline) sits between 1.2x and 1.6x apart: 12, 14, 16, 20, 31. Nothing may skip a tier. `t-headline` was originally 32-48px, which put it 2.4x above `t-title` and 3x above body; the result was that any section with a heading shouted next to the About section, which has none. Only `t-display` is allowed to break the ladder, because it lives alone on the hero with nothing beside it to compare against.

Note the correct fix direction: when a heading and a paragraph feel mismatched, bring the heading down to the ladder rather than pushing the paragraph up. The intro's copy is deliberately quiet, lowercase, and first-person, and enlarging it would contradict its tone.

**The Width-Not-Family Rule.** Display contrast comes from Archivo's `wdth` axis, never from importing a third face. Only three widths exist: 112% (display), 105% (headline), and 87.5% (mono labels). Everything else is normal width.

The single exception is `t-quote`, the footer pull quote, which is a serif italic. It earns the exception because it is the one place on the page carrying someone else's words, and the change of voice is the point. It is a system serif, so it costs no webfont, and it appears exactly once. A second use of a third face anywhere else is a bug.

**The Font-Variables-On-`html` Rule.** The `next/font` variables must be set on the `<html>` element, not `<body>`. Tailwind declares `--font-sans: var(--font-archivo), ...` on `:root`; if the font variables sat one level lower, that inner `var()` would be unresolvable at `:root` and the whole token would compute to the guaranteed-invalid value, silently falling back to `system-ui`.

## 4. Elevation

This system is nearly flat. Depth does not come from drop shadows stacked on cards; it comes from the live 3D starfield behind everything and from tonal layering (Void Black base, Glass Fill surfaces, Hairline borders). Cards sit on the background as faint 2%-white planes with a 1px hairline, not as lifted objects. Shadows appear only on genuinely floating controls (the resume pill, the tour button) to separate them from scrolling content.

### Shadow Vocabulary
- **Floating control** (`box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3)`, Tailwind `shadow-lg`): fixed-position controls (resume pill, play-tour button) only.
- **Accent glow** (`box-shadow`/`filter: blur` in Telemetry Gold or Deep Space Blue at low opacity): a response to hover on interactive elements, never a resting state.

### Named Rules
**The Depth-From-Background Rule.** Surfaces are flat at rest. If an element needs to feel lifted, it is because it floats above scroll (fixed position), not because it is a content card. Content cards never get more than a 1px hairline.

## 5. Components

### Buttons
- **Shape:** pill for floating actions (`rounded-full`), gently rounded for inline actions (8px, `rounded-lg`).
- **Primary (contact / UChicago email):** Signal Amber text on a 20%-amber fill with a 30%-amber border, `padding: 8px 16px`. Reads as lit, not filled.
- **Ghost (Gmail, LinkedIn, GitHub, Resume):** Instrument White text on Glass Fill with a Hairline border. Hover shifts the border to cyan or gold and lifts the fill to white-at-10%.
- **Resume pill (floating):** Telemetry Gold on Void Black, `rounded-full`, Hairline border, `shadow-lg`. Compacts to a 44px icon-only circle below 768px; expands to a labeled 160px pill on desktop.

### Chips
- **Style:** `rounded-full`, `padding: 6px 12px`, `t-tag` type, an 8%-accent fill with a 25%-accent border and full-accent text.
- **Variants:** focus chips carry Signal Amber (work: robotics, drone tech, trading); personality chips carry Scanline Cyan (finance + ai, tabla, poker). The color IS the taxonomy (see the Two-Signal Rule). Mobile-only; desktop uses the labeled skills columns instead.

### Cards / Containers
- **Corner Style:** 8px (`rounded-lg`).
- **Background:** Glass Fill (2% white). No opaque panel.
- **Shadow Strategy:** none; see Elevation. Hairline border does the separation.
- **Border:** 1px Hairline (`#FFFFFF1A`).
- **Internal Padding:** 16px.

### Navigation
- No persistent chrome nav. Wayfinding is scroll plus the guided tour. The two fixed controls (resume top-right, tour bottom-right) are the only always-present affordances; both shrink to compact icons under 768px so they never cover content.

### Signature Component: The Guided Tour
A scroll-choreographed walkthrough (Spotlight, TimelineControls, per-step camera easing) that narrates the portfolio in Roshan's first-person voice. It is the clearest expression of "show the work running": the page demonstrates its own craft rather than claiming it. Tour controls dock to the bottom of the viewport with `env(safe-area-inset-bottom)` padding on mobile.

## 6. Do's and Don'ts

### Do:
- **Do** protect the blue space theme: near-black base (`#09090B`), live 3D starfield, and blue atmospheric glow are the signature and stay. Let depth come from that field and 1px hairlines, not shadows.
- **Do** use the Two-Signal system exactly: gold/amber for work, cyan for personality and interaction. Pair color with label or position so it never depends on color alone.
- **Do** go oversized on the Archivo display type, expanded to 112% with tight negative tracking (-0.045em); scale and width are the drama.
- **Do** reach for the `t-*` classes instead of assembling one-off Tailwind size, weight, and tracking utilities.
- **Do** keep personal prose lowercase, first person, and concrete, and reserve uppercase for Martian Mono micro-labels.
- **Do** ease with exponential curves (`cubic-bezier(0.2, 0.8, 0.2, 1)`); choreograph entrances but never bounce or overshoot.
- **Do** collapse the two floating controls to compact icons below 768px so they never overlap content.

### Don't:
- **Don't** ship the generic SaaS template: no cream/navy kit, no hero-metric block (big number + small label + gradient), no grid of identical icon+heading+text cards.
- **Don't** let it read as a stiff corporate resume: no LinkedIn-style bullet walls with no personality.
- **Don't** drift into crypto/AI neon: no neon-on-black, no `background-clip: text` gradient text (retire the legacy `.text-gradient` util rather than reach for it), no "next-gen" hype copy.
- **Don't** overdesign: glassmorphism is not a default (the `.glass-panel` util is a rare, purposeful exception, never decoration), and no effect may fight readability.
- **Don't** use Deep Space Blue (`#3B82F6`) as a text or button color; it stays in the atmosphere.
- **Don't** put a colored `border-left`/`border-right` stripe on any card or chip; use the full Hairline border or a background tint.
- **Don't** use em dashes in copy; use commas, colons, or periods.
