# TactasAI Style System

Use `src/styles/global.css` as the source of truth for brand styling.

## Layout

- Use `.tactas-container` for the standard 1240px content width.
- Use `.tactas-container-narrow` for article-style layouts.
- Use `.tactas-page`, `.tactas-section`, `.tactas-section-soft`, and `.tactas-section-white` for page and section surfaces.

## Tokens

Prefer semantic Tailwind tokens instead of raw hex utilities:

- Backgrounds: `bg-tactas-bg`, `bg-tactas-bg-soft`, `bg-tactas-bg-raised`
- Text: `text-tactas-ink`, `text-tactas-ink-strong`, `text-tactas-muted`, `text-tactas-muted-soft`
- Lines: `border-tactas-line`, `border-tactas-line-soft`, `border-tactas-line-strong`
- Brand actions: `bg-tactas-primary`, `text-tactas-accent-strong`, `border-tactas-accent-line`
- Status: `text-tactas-success`, `text-tactas-warning`, `text-tactas-danger`

Raw hex values should be limited to complex gradients, SVG stops, and domain-specific diagram signal colors.

## Components

Use the shared primitives before inventing one-off classes:

- `.tactas-kicker`
- `.tactas-display`
- `.tactas-lead`
- `.tactas-card`
- `.tactas-surface`
- `.tactas-chip`
- `.tactas-eyebrow-pill`
- `.tactas-button-primary`
- `.tactas-button-secondary`

The wiring diagram tool keeps a separate dark tool surface, but its colors live in `src/wiring-diagram-tool/app/globals.css` and `src/wiring-diagram-tool/lib/diagram-theme.ts`.
