# Design Brief: Under 25 ADYPU

## Tone & Intent
Luxury youth innovation hub — bold, futuristic, aspirational. Premium deep blue authority paired with rich gold vibrancy. Dark mode primary (premium feel), light mode secondary. Glassmorphism cards with soft shadows; no harsh neon or garish gradients.

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | `0.42 0.23 264` | `0.70 0.21 86` | Buttons, text hierarchy, active states (primary blue / gold swap in dark) |
| Accent | `0.70 0.21 86` | `0.70 0.21 86` | Gold accents, glows, highlights, borders (consistent across modes) |
| Background | `0.98 0.01 0` | `0.12 0.01 264` | Full-page bg (near-white / very dark blue) |
| Card | `0.96 0.02 0` | `0.18 0.02 264` | Slightly elevated surface (glass effect) |
| Text (Foreground) | `0.15 0.02 0` | `0.95 0.01 0` | Body text (dark charcoal / near-white) |
| Muted | `0.92 0.02 0` | `0.22 0.02 264` | Disabled states, secondary hierarchy |
| Border | `0.88 0.02 264` | `0.25 0.02 264` | Dividers, card borders (subtle blue tint) |

## Typography
- **Display:** General Sans (bold, geometric, futuristic) — headings, hero taglines, section titles
- **Body:** DM Sans (clean, minimal, legible) — body copy, descriptions, navigation
- **Mono:** Geist Mono (tech-forward) — code, data, technical text

## Elevation & Depth
- **Subtle shadow:** `0 2px 8px rgba(0,0,0,0.08)` — card hover, inputs
- **Elevated shadow:** `0 8px 24px rgba(0,0,0,0.12)` — modals, dropdowns, lifted cards
- **Gold glow:** `0 0 20px rgba(212, 175, 55, 0.3)` — button hover, accent highlights
- **Glassmorphism:** `backdrop-blur-md` + `bg-white/8` (light) or `bg-blue/8` (dark) + thin border (`rgba(255,255,255,0.12)` / `rgba(212,175,55,0.1)`)

## Structural Zones

| Zone | Background | Treatment | Purpose |
|------|------------|-----------|---------|
| Navigation | `bg-background/80` | Sticky, semi-transparent, minimal border | Top anchor; always accessible |
| Hero | Gradient overlay on image | `bg-primary/20` overlay + gold logo center | Maximum visual impact; emotional hook |
| Content Sections | Alternating `bg-background`, `bg-muted/30` | Glass cards, rounded borders, soft shadows | Clear information hierarchy |
| Gallery | `bg-background` | Grid layout, blue tint overlays, gold accent borders | Showcase; hover lift animation |
| Form (Registration) | `bg-card` | Glass effect, gold CTA button | Clear conversion point |
| Footer | `bg-muted/50` with top border | Icons in gold/white, links minimal | Closing; social + contact |

## Component Patterns
- **Buttons:** Gold gradient primary (hover: lift 2–4px + enhanced glow); blue secondary (minimal style)
- **Cards:** Glass card utility — rounded, subtle border, backdrop blur; hover state adds shadow-elevated
- **Form inputs:** `bg-input` with border, focus ring is accent (gold)
- **Navigation links:** Minimal; hover underline in accent gold
- **Text highlights:** Gold accent color for emphasis; no highlights on body text
- **Testimonial cards:** Glass style with left accent bar (gold)

## Motion & Interaction
- **Fade-in on scroll:** `.fade-in` utility — `opacity-0` → `opacity-100`, `duration-700`
- **Fade-in up:** `.fade-in-up` utility — content slides up gently
- **Button hover:** Lift (translate-y -1 px) + enhanced shadow + glow pulse
- **Card hover:** Shadow elevation, subtle scale (1.02)
- **Parallax:** Hero image moves slower than text on scroll (use transform: translateY)
- **Loading animation:** Float pulse on logo/spinner

## Spacing & Rhythm
- **Margins:** `4px` (xs), `8px` (sm), `16px` (md), `24px` (lg), `32px` (xl), `48px` (2xl)
- **Padding:** Card padding `20px` (mobile) → `24px` (desktop)
- **Gap (grid/flex):** `16px` default, `24px` for section separations
- **Type scale:** Heading (32px–48px bold), Subheading (24px–28px semi-bold), Body (16px regular), Caption (12px–14px)

## Signature Detail
Gold gradient buttons with dual-layer glow (shadow + backdrop); combined with glassmorphism card backgrounds and dark blue premium backdrop, creates a "luxury tech" aesthetic distinct from generic startup templates.

## Constraints
- No bootstrap blue, no default Tailwind shadows
- No purple gradients or warm amber/sage palettes (reserved for other projects)
- No full-page gradient backgrounds — use layered depth instead
- Dark mode is primary; light mode is supported variant
- Mobile-first responsive (`sm:`, `md:`, `lg:` breakpoints)
- All animations <300ms except entrance sequences (700ms fade-in)

## Exports
- Colors: OKLCH tokens in `:root` and `.dark` blocks (index.css)
- Animations: `float`, `glow-pulse` keyframes in Tailwind config
- Utilities: `.button-gold`, `.glass-card`, `.fade-in`, `.fade-in-up` in index.css
- Typography: @font-face declarations for General Sans, DM Sans, Geist Mono
