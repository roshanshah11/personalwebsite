---
name: Roshan Shah Portfolio
description: A copperplate star atlas rendered live. Engraved serif type and hairline rules over a real 3D starfield, with one brass accent and nothing else.
colors:
  background-dark: "#050810"
  background-light: "#070B15"
  ink: "#E9E5DA"
  dim: "#8695AC"
  faint: "#707F99"
  brass: "#C9A227"
  brass-light: "#D8B65A"
  brass-dark: "#A8871F"
  rule: "#96AFD738"
  hair: "#96AFD721"
  destructive: "#AE3A2B"
typography:
  display:
    class: "t-display"
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Times New Roman, serif"
    fontSize: "clamp(2.25rem, 10.5vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.045em"
    textTransform: "uppercase"
  display-split:
    class: "t-display-split"
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Times New Roman, serif"
    fontSize: "clamp(2.5rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.045em"
    textTransform: "uppercase"
  headline:
    class: "t-headline"
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Times New Roman, serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.15rem)"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "0.005em"
  title:
    class: "t-title"
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Times New Roman, serif"
    fontSize: "1.3rem"
    fontWeight: 500
    lineHeight: 1.22
    letterSpacing: "0.005em"
  quote:
    class: "t-quote"
    fontFamily: "Cormorant Garamond, Garamond, Georgia, serif"
    fontSize: "1.495rem"
    fontStyle: "italic"
    fontWeight: 300
    lineHeight: 1.42
    letterSpacing: "0.005em"
  gloss:
    class: "t-gloss"
    fontFamily: "Cormorant Garamond, Garamond, Georgia, serif"
    fontStyle: "italic"
    fontWeight: 300
    lineHeight: 1.38
    letterSpacing: "0.005em"
  body:
    class: "t-body"
    fontFamily: "EB Garamond, Garamond, Georgia, serif"
    fontSize: "1.09rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "0"
    measure: "62ch"
  meta:
    class: "t-meta"
    fontFamily: "EB Garamond, Garamond, Georgia, serif"
    fontSize: "0.94rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  label:
    class: "t-label"
    fontFamily: "EB Garamond, Garamond, Georgia, serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.14em"
    textTransform: "uppercase"
  tag:
    class: "t-tag"
    fontFamily: "EB Garamond, Garamond, Georgia, serif"
    fontSize: "0.94rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  eyebrow:
    class: "t-eyebrow"
    fontFamily: "EB Garamond, Garamond, Georgia, serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.14em"
    textTransform: "uppercase"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "32px"
components:
  rule-group:
    borderTop: "{colors.rule}"
    padding: "16px 0 0 0"
  link-inline:
    textColor: "{colors.ink}"
    hoverTextColor: "{colors.brass}"
    borderBottom: "{colors.hair}"
    padding: "6px 0"
  resume-pill:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.brass}"
    rounded: "{rounded.full}"
    padding: "0 12px"
---

# Design System: Roshan Shah Portfolio

## 1. Overview

**Creative North Star: "A Copperplate Star Atlas, Rendered Live"**

The reference is print, and specifically the engraved celestial atlas: Bode's *Uranographia* (1801), Hevelius's *Firmamentum Sobiescianum* (1690), Bayer's *Uranometria* (1603). Those plates set a real sky in engraved type, separated everything with hairline rules, and used exactly one metallic ink. The page does the same thing over a live 3D starfield instead of paper.

That reference is the whole defense against looking generated. Nobody has done this on the web, so it cannot be pattern-matched to a template. The failure mode this replaced was the opposite: near-black with amber and cyan, wide-tracked uppercase monospace eyebrows in nine places, and rounded glass cards, which is the single most common look an image model produces when asked for "developer portfolio."

Bold is still the brief. The boldness is now spent on the type and the emptiness around it rather than on effects.

**Key Characteristics:**
- The blue space field is the hero: the shader's own near-black (`#050810`) with a live 3D starfield. Preserve it. The palette is sampled *off* that field, not chosen beside it.
- Three serifs, no monospace anywhere, and oldstyle figures site-wide.
- One accent (brass), spent sparingly. There is no second signal color.
- Structure comes from hairline rules and the grid, never from cards, borders-on-all-sides, or fills.
- Motion is choreographed and calm (no bounce, no elastic).

## 2. Colors

A near-black field with one metallic ink. This is a **single-accent** strategy, and that is a deliberate reversal: the previous system ran two saturated signals (amber and cyan) and the result read as *themed* rather than designed. A second saturated hue is what made the old page look generated.

### Ground
- **Background Dark** (`#050810`): the base. This is the shader's own near-black, sampled from the starfield rather than picked to sit beside it, so nothing reads as pasted on top of the sky. `--color-background-black` aliases it.
- **Background Light** (`#070B15`): the barely-lifted variant, for the rare surface that must separate from the field.

### Ink
- **Ink** (`#E9E5DA`): primary text, warm bone. Never pure `#fff`: white on a blue-black ground glares and flattens the serif's stroke contrast, which on a Didone is the entire face.
- **Dim** (`#8695AC`): secondary text, biased toward the starfield's blue instead of sitting dead-grey beside it. 6.6:1 on ground.
- **Faint** (`#707F99`): labels, dates, metadata. 4.94:1 on ground.

### Accent
- **Brass** (`#C9A227`), with `#D8B65A` light and `#A8871F` dark: the only accent. Brass because the starfield already contains a warm point of light, so the accent belongs to the image instead of arguing with it. It is also the target of the palette remap: `--color-amber-300/400/500` now resolve to the brass ramp, and `--color-primary` and `--color-accent-gold` both point at brass, so the fifteen components that reached for amber by name landed here without being edited.

### Structure
- **Rule** (`rgba(150,175,215,0.22)`): the primary hairline. Section divisions, column dividers, list separators.
- **Hair** (`rgba(150,175,215,0.13)`): the secondary hairline, for divisions inside an already-ruled group.

### Named Rules

**The One-Accent Rule.** Brass is the only accent, and it is spent, not applied. If three brass things are visible at once, two of them are wrong. It marks the single most important item in a group and nothing else. There is no second signal color; do not reintroduce one.

**The Contrast-Floor Rule.** `faint` and `gray-500` carry real content (every job date, every section label, the footer credits), not decoration, so they must clear 4.5:1 against `ground`. Anything quieter than `#707F99` on this ground fails AA and disappears in daylight. Quiet is a design goal; absent is a bug.

**The Space-Field-Is-Sacred Rule.** The blue space field (near-black base + live 3D starfield) is the signature and stays. Do not swap it for a flat dark background, a different hue, or a busier pattern. New surfaces sit on top of it as ruled planes; they never cover it edge to edge and they never get an opaque fill.

**The No-Literal-Colors Rule.** Never write a color as a hex or `rgba()` literal in a component. The palette is retired and replaced at the token layer (`@theme` in `globals.css`), which rewrites utility classes but **cannot reach a literal in an inline style**. Three components once hardcoded `#FBBF24` and `rgba(212,175,55,…)`; they survived a full palette change untouched and kept flashing the retired hue. Use `var(--color-brass)` in inline styles, or a Tailwind utility.

## 3. Typography

**Display:** Bodoni Moda (variable, `opsz` 6-96, `wght` 400-900, with Didot / Bodoni 72 / Times New Roman fallback)
**Text:** EB Garamond (variable, `wght` 400-800, with Garamond / Georgia fallback)
**Italic display:** Cormorant Garamond (variable italic, `wght` 300-700, with Garamond / Georgia fallback)

**There is no monospace.** Tracked-out uppercase mono was the loudest generated-template tell on the previous page, used in nine separate places. Tailwind's preflight is explicitly overridden so `code`, `kbd`, `samp` and `pre` do not reintroduce it.

**Character:** Three faces from one period argument, not three faces chosen for contrast. Bodoni Moda is a Didone: hairline serifs, extreme stroke contrast, letterforms cut for copperplate title pages. It carries the name and every heading and does nothing else, because at label size its thins disappear. EB Garamond does all the reading. Cormorant Garamond is a display Garamond, much lighter and sharper, which falls apart below about 16px, which is exactly why it is confined to large italic subtitles and captions.

### Hierarchy

Every role is a class in `globals.css`, not a stack of Tailwind utilities. Use the class; override only color and spacing alongside it.

| Class | Face | Size | Weight | Leading | Tracking | Use |
|---|---|---|---|---|---|---|
| `t-display` | Bodoni | `clamp(2.25rem, 10.5vw, 8rem)` | 400 | 0.9 | +0.045em | Hero name only, uppercase |
| `t-display-split` | Bodoni | `clamp(2.5rem, 8vw, 6rem)` | 400 | 0.9 | +0.045em | Name in two lockups, uppercase |
| `t-headline` | Bodoni | `clamp(1.6rem, 2.6vw, 2.15rem)` | 500 | 1.14 | 0.005em | Section titles, in Ink |
| `t-title` | Bodoni | 1.3rem | 500 | 1.22 | 0.005em | Card headers: school, company, project |
| `t-quote` | Cormorant italic | 1.495rem | 300 | 1.42 | 0.005em | The footer pull quote, and nothing else |
| `t-gloss` | Cormorant italic | inherit | 300 | 1.38 | 0.005em | Subtitles, captions, asides |
| `t-body` | Garamond | 1.09rem | 400 | 1.62 | 0 | Prose. Pair with `.measure` (62ch) |
| `t-meta` | Garamond | 0.94rem | 400 | 1.55 | 0 | Roles, sub-lines, captions, links |
| `t-label` | Garamond | 0.78rem | 500 | 1.45 | 0.14em | UPPERCASE micro-labels, dates, categories |
| `t-tag` | Garamond | 0.94rem | 400 | 1.75 | 0 | Skills, tech stacks, list items |
| `t-eyebrow` | Garamond | 0.78rem | 500 | 1.45 | 0.14em | Hero and intro only |

Two utilities compose with the above: `.measure` caps a column at 62ch, and `.t-num` opts an element back into `lining-nums tabular-nums` for anything that must align in a column.

**The scale is 13 / 15 / 17.5 / 21px**, then two fluid display steps. Every step is about 1.17x larger than the previous system's, because Garamond's x-height is markedly shorter than Archivo's: matched rem sizes are not matched reading sizes.

### Named Rules

**The Positive-Tracking Rule.** Display runs **positive** tracking (+0.045em), the opposite sign from the wide grotesque that used to sit here. A Didone set large and tight closes its counters and its hairlines collide. Letterspaced open, it reads as a plate title. Never set `t-display` negative.

**The Oldstyle-Figures Rule.** `font-variant-numeric: oldstyle-nums` is set once on `body` and inherited everywhere. This is the single change that does the most work on a page this full of years and grades: 2026, 3.92 and 4.00 stop sitting at cap height like tabulated data and drop into the line like the words around them. Anything that genuinely needs to align in a column opts back out with `.t-num`.

Note the keyword is **plural**. `oldstyle-num` parses as nothing, the browser drops the declaration silently, and the page paints lining figures with no error and no visual warning that the rule is dead. This exact typo shipped once.

**The No-Mono Rule.** No monospace anywhere, and no uppercase above 0.14em tracking. The 0.32em eyebrow tracking that used to exist was never a design decision; it was damage control for setting mono in caps. Garamond carries a label at 0.14em and stops looking like a system readout.

**The Optical-Size Rule.** Bodoni Moda must be loaded with `axes: ["opsz"]`. Without it, `next/font` pins the optical-size axis at the 11pt text master and `font-optical-sizing: auto` on `.t-display` silently does nothing, so the hero name at up to 128px renders with text-weight hairlines. On a Didone, the hairline *is* the face.

**The Uppercase Rule.** Uppercasing is reserved for the hero lockup (`t-display`) and micro-labels (`t-label`, `t-eyebrow`). Prose is never uppercased, and in the personal copy it stays lowercase and casual, first person, concrete over label.

**The Font-Variables-On-`html` Rule.** The `next/font` variables must be set on the `<html>` element, not `<body>`. Tailwind declares `--font-sans: var(--font-garamond), ...` on `:root`; if the font variables sat one level lower, that inner `var()` would be unresolvable at `:root` and the whole token would compute to the guaranteed-invalid value, silently falling back to `system-ui`.

**The Font-Shim-Parity Rule.** The design-system bundle does not run `next/font`. Whenever a face or a `--font-*` variable changes in `layout.tsx`, `.design-sync/fonts/fonts.css` must change with it, or `--type-display` computes to the invalid value and every preview card photographs in the browser default face.

## 4. Elevation

This system is flat, and more so than the one it replaced. Depth comes from the live 3D starfield behind everything, and separation comes from hairline rules. There are no cards. There is no fill. `rounded` is `0` everywhere except the two floating controls, which stay pills.

The previous system's "faint 2%-white plane with a 1px hairline" was still a box, and boxing every block individually was the tell that the page had been assembled rather than composed. The `.glass-panel` utility is retained under its old name only because a dozen components ask for it; it now renders as a transparent field bounded by a single hairline.

### Shadow Vocabulary
- **Floating control** (`shadow-lg`): fixed-position controls (resume pill, play-tour button) only, to separate them from scrolling content.
- Nothing else casts a shadow. There is no accent glow: a 35px bloom fills exactly the gaps a Didone's stroke contrast lives in.

### Named Rules
**The Rules-Not-Boxes Rule.** Grouping comes from a rule and the grid. Two things side by side under one hairline are already a group; a border around each of them says the same thing twice and adds two more edges to the page. If an element needs to feel separate, give it a rule above it, not a container around it.

## 5. Components

### Links
- **Inline / list:** Ink text, hairline underneath (`border-b border-hair`), 6px vertical padding. Hover and focus shift to Brass.
- **Focus is never color alone.** Keep the ring. `focus-visible:outline-none` with only a color change is invisible to a colour-blind visitor and easy to lose on a dim screen; the contact list shipped that way once. Use `focus-visible:outline focus-visible:outline-1 focus-visible:outline-brass focus-visible:outline-offset-4`.

### Lists
- Ruled, not chipped. Rounded pills in two competing accents became inline lists separated by hairlines: same terms, same order, no containers. Lead items take a Brass marker; the rest take Faint.

### Cards / Containers
- **Corner style:** square. No radius on content.
- **Background:** none. The starfield is the background.
- **Border:** a single rule on one edge, not four.
- **Internal padding:** 16px.

### Portrait
- Squared, hairline-bounded, full colour. Formerly a `rounded-3xl` square with a cyan scan line, an RGB glitch flicker on hover, and a blurred cyan-to-gold glow behind it: three effects, none of which the photograph needed, all of which announced themselves before the face did.

### Navigation
- No persistent chrome nav. Wayfinding is scroll plus the guided tour. The two fixed controls (resume top-right, tour bottom-right) are the only always-present affordances; both shrink to compact icons under 768px so they never cover content.

### Signature Component: The Guided Tour
A scroll-choreographed walkthrough (Spotlight, TimelineControls, per-step camera easing) that narrates the portfolio in Roshan's first-person voice. It is the clearest expression of "show the work running": the page demonstrates its own craft rather than claiming it. Tour controls dock to the bottom of the viewport with `env(safe-area-inset-bottom)` padding on mobile.

## 6. Do's and Don'ts

### Do:
- **Do** protect the blue space theme: the shader's near-black (`#050810`) and the live 3D starfield are the signature and stay. Let depth come from that field and 1px rules, not shadows.
- **Do** spend Brass sparingly. One accent per group, on the item that earns it.
- **Do** set the display face large, uppercase, and **positively** letterspaced; the drama is scale plus air, not weight.
- **Do** reach for the `t-*` classes instead of assembling one-off Tailwind size, weight, and tracking utilities.
- **Do** separate with a rule and the grid instead of a container.
- **Do** keep personal prose lowercase, first person, and concrete.
- **Do** ease with exponential curves (`cubic-bezier(0.2, 0.8, 0.2, 1)`); choreograph entrances but never bounce or overshoot.
- **Do** check contrast against `#050810` before introducing any new text tone.

### Don't:
- **Don't** reintroduce a second accent. Amber-plus-cyan is the specific thing this system was built to remove.
- **Don't** use monospace, anywhere, for anything, including code samples.
- **Don't** write a color as a hex or `rgba()` literal in a component; the token layer cannot reach it.
- **Don't** set display type with negative tracking.
- **Don't** put a rounded border around a content block, or a fill behind it.
- **Don't** ship the generic SaaS template: no cream/navy kit, no hero-metric block, no grid of identical icon+heading+text cards.
- **Don't** drift into neon: no neon-on-black, no `background-clip: text` gradient text, no glow behind serif type.
- **Don't** animate an element horizontally out of its column; it creates viewport overflow that `overflow-x: hidden` then hides from you.
- **Don't** use em dashes in copy; use commas, colons, or periods.
