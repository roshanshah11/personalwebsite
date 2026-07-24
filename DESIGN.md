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
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 12vw, 9rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.1em"
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

**Key Characteristics:**
- Near-black zinc base (`#09090B`) with a live starfield, not flat dark-mode blue.
- Two-signal accent system: gold/amber for work, cyan for personality and interaction.
- Oversized Space Grotesk display type against small JetBrains Mono labels.
- Motion is choreographed but exponential and calm (no bounce, no elastic).
- Content leads; effects support.

## 2. Colors

A near-black instrument field carrying two saturated signals plus a structural blue glow. This is a Committed strategy: the dark surface dominates, and the two accents do deliberate, non-interchangeable work.

### Primary
- **Telemetry Gold** (`#D4AF37`): the identity accent. Section headings, the resume pill, the tour controls, and the primary "work" signal. Warmer and more metallic than the brighter amber.
- **Signal Amber** (`#FBBF24`): the brighter, higher-chroma partner to gold. Used for inline emphasis (the highlighted name), primary contact button, and the work-focus chips (robotics, drone tech, trading).

### Secondary
- **Scanline Cyan** (`#00D9FF`): the interaction and personality signal. Program subtitles, the profile scan-line, and the personality chips (finance + ai, tabla, poker). Also the cyan hover accent on ghost buttons.

### Tertiary
- **Deep Space Blue** (`#3B82F6`): structural glow only (the `--color-primary` token, focus glows, particle field). Not a content color; it lives in the atmosphere, not the copy.

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

## 3. Typography

**Display Font:** Space Grotesk (with ui-sans-serif, system-ui fallback)
**Body Font:** Space Grotesk (same family, lighter weights)
**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** One geometric sans doing the heavy lifting at every size, paired with a mono that only ever appears in small uppercase labels. The contrast is scale and case, not family: a wall of Space Grotesk from 9rem down to 0.875rem, punctuated by tiny mechanical mono tags.

### Hierarchy
- **Display** (700, `clamp(3rem, 12vw, 9rem)`, line-height 0.95, tracking -0.04em): the hero name only. Fills the first screen; tight tracking makes the scale feel engineered, not shouted.
- **Headline** (700, `clamp(1.875rem, 5vw, 3rem)`, line-height 1.1): section titles (Experience, Projects), rendered in Telemetry Gold.
- **Title** (700, 0.875rem, line-height 1.3): card headers (school name, role, project title) in Instrument White.
- **Body** (400, 0.875rem–1rem, line-height 1.6): bio and descriptions in a gray-300 tint. Cap measure at 65–75ch.
- **Label** (700, 0.625rem, tracking 0.1em, UPPERCASE): JetBrains Mono category tags (LANGUAGES, SKILLS, INTERESTS) in Signal Amber.

### Named Rules
**The Uppercase-Mono Label Rule.** Uppercasing is reserved for JetBrains Mono micro-labels and the logotype-style hero. Prose is never uppercased, and in the personal copy it stays lowercase and casual, first person, concrete over label.

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
- **Style:** `rounded-full`, `padding: 6px 12px`, JetBrains-adjacent small type, an 8%-accent fill with a 25%-accent border and full-accent text.
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
- **Do** keep the base near-black (`#09090B`) with the live starfield; let depth come from the background field and 1px hairlines, not shadows.
- **Do** use the Two-Signal system exactly: gold/amber for work, cyan for personality and interaction. Pair color with label or position so it never depends on color alone.
- **Do** go oversized on the Space Grotesk display type with tight negative tracking (-0.04em); scale is the drama.
- **Do** keep personal prose lowercase, first person, and concrete, and reserve uppercase for JetBrains Mono micro-labels.
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
