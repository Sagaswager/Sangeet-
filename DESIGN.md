# Intellitech Semantic Design System (DESIGN.md)

This specification documents the semantic design principles, color calibration, typographic hierarchy, component behaviors, and motion choreography for the **Intellitech B2B Agent Delivery Node** workspace.

---

## 1. Visual Atmosphere
- **Mood / Theme**: Editorial, laboratory-grade, research-focused. A combination of classic high-end typography with raw, structured technical panels.
- **Density Score**: **5 / 10** ("Balanced Workspace Layout") — Generous white space, distinct spacing rhythms, and structured editorial divisions.
- **Variance Score**: **7 / 10** ("Offset Asymmetric Composition") — Structured asymmetrical split layouts, offset grids, and negative space boundaries rather than typical symmetrical columns.
- **Motion Intensity**: **6 / 10** ("Fluid and Weighty Springs") — Heavy-weight spring dynamics, cascade staggered mountings, and highly tactile touch/click feedback loop.

---

## 2. Color Calibration

The color space is calibrated around absolute neutral backgrounds with a singular high-contrast visual focus. The traditional "purple-blue neon" or "glowing tech gradient" aesthetic is strictly banned.

| Semantic Name | Hex Code | Purpose / Functional Role |
| :--- | :--- | :--- |
| **Paper White** | `#ffffff` | Primary base cards, dialog backgrounds, input text boxes. |
| **Bone Mist** | `#f0f7f6` | Ambient background canvas, page backgrounds, content wrappers. |
| **Bark (Ink)** | `#17150e` | Deep primary typographic color, heavy CTA buttons, dark terminal backgrounds. |
| **Ash** | `#e2e2e2` | Structural borders, card outlines, subtle dividers. |
| **Chartreuse Pop** | `#cccc25` | High-frequency functional accents (badges, toggle indicators, success highlights). |
| **Periwinkle Wash** | `#9fa6ff` | Muted cool wash, utilized for secondary interactive focus. |
| **Sage / Moss** | `#9ac192` / `#6c8853` | Soft biological green tones for status, successful bookings, and custom accents. |

---

## 3. Typographic Architecture

Typography is the core of our brand identity. We leverage distinct editorial font pairing to create tension and structure.

- **Primary Sans (UI / Body)**: `Outfit` paired with clean, responsive geometric structure, responsive letter-tracking, and generous line-heights.
- **Display Serif (Headlines)**: `Playfair Display` for classical display headings.
  - *Tracking*: `-0.03em` (tight tracking for large scale serifs).
  - *Weight*: Light/Medium (`400`/`500`).
- **Technical Monospace**: `JetBrains Mono` for code telemetry logs, terminal output lines, ID tags, and numeric metrics.
  - *Sizing*: Small scale (`10px` to `12px`), slightly wider tracking (`0.05em`).

---

## 4. Component Behaviors & Micro-interactions

Every component is built as a responsive, reactive physical object.

- **CTA Buttons**: 
  - Tactile physical press feedback (`whileTap={{ scale: 0.97 }}`).
  - Soft hover float (`whileHover={{ scale: 1.02, y: -1 }}`).
  - Standard focus outlines are hidden in favor of subtle border tinting.
- **Interactive Cards**:
  - Elevate on hover with smooth spring translation (`whileHover={{ y: -6, scale: 1.01 }}`).
  - Shadows are tinted to match the background hues (`shadow-none` paired with explicit borderline borders).
- **Form Fields (Inputs)**:
  - Input labels are always placed directly above the field in monospace uppercase tracking.
  - Focused state transitions smoothly with a custom border accent transition.
- **Overlay Drawers & Modals**:
  - Always wrapped in `<AnimatePresence>` to orchestrate seamless entrance and exit cycles.
  - Backdrops transition via a smooth opacity curve (`initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}`).
  - Panels slide in using Weighty Springs (`type: "spring", damping: 26, stiffness: 220`).

---

## 5. Layout Principles
- **Grid Systems**: Explicit CSS grid systems over flexbox hacks to maintain strict desktop-to-mobile alignment.
- **Anti-Overlapping Constraints**: Text elements never overlap. Every absolute layout elements are securely clamped inside safe-bounds.
- **No Filler Text**: No unnecessary bouncers, "scroll-down" prompts, or floating arrows. Elements command attention purely on content value.
- **Touch Targets**: Tap targets on mobile screens are strictly clamped at a minimum of `44px` height and width.

---

## 6. Motion Philosophy (Framer Motion)
- **Spring Parameters**:
  - Weighty/Default Spring: `stiffness: 100, damping: 20`.
  - Responsive Panel Spring: `stiffness: 220, damping: 26`.
- **Cascade Orchestration**:
  - Card grids mount with staggered delays (cascade cascade) to create a premium flow-like entrance reveal.
- **Hardware Acceleration**:
  - We animate exclusively on `transform` (`scale`, `x`, `y`, `rotate`) and `opacity`. Never animate layout reflow properties like `height`, `width`, `top`, or `left`.

---

## 7. Explicit Anti-Patterns (Banned AI Clichés)
- **NO Purple/Blue Glowing Gradients** (No "cyberpunk slop").
- **NO Bouncing Arrow Icons** encouraging scrolling.
- **NO Emojis** inside headings or professional copy.
- **NO Centered Symmetrical Columns** for everything — force asymmetric layouts.
- **NO Inter Font** — too generic and overused; replaced with high-personality geometric sans-serifs like `Outfit`.
- **NO Visual Double Slashes (`//`)** as structural delimiters in copy or headings — replaced with elegant geometric bullet dividers (`•`) or clean em-dashes (`—`).
