# Prashant Kashyap — Portfolio Site

**Live:** [kashyaprashant.com](https://kashyaprashant.com)  
**Role:** Senior UX Designer · Oracle Communications, Pune  
**Contact:** prashantkashyap91@outlook.com · [LinkedIn](https://linkedin.com/in/kashyaprashant/)

A hand-crafted, fully static portfolio site targeting Senior/Principal UX roles. Built across 7 sessions with a bespoke design system, two switchable visual themes, a load animation, and a hidden Snake easter egg that gates the Terminal theme.

---

## Table of Contents

- [Project Overview](#project-overview)
- [File Structure](#file-structure)
- [Pages & Content](#pages--content)
  - [Core Case Studies](#core-case-studies)
  - [Also Pages — Beyond the Four](#also-pages--beyond-the-four)
- [Design System](#design-system)
  - [Atelier Theme (Default)](#atelier-theme-default)
  - [Terminal Theme (Unlockable)](#terminal-theme-unlockable)
  - [Typography](#typography)
  - [Spacing Scale](#spacing-scale)
- [Shared JavaScript Modules](#shared-javascript-modules)
  - [theme.js — Theme Engine & Snake Easter Egg](#themejs--theme-engine--snake-easter-egg)
  - [animations.js — Load Animation](#animationsjs--load-animation)
  - [hero-backgrounds.js — Hero Background Swap](#hero-backgroundsjs--hero-background-swap)
- [Image System](#image-system)
  - [Image Layout Patterns](#image-layout-patterns)
  - [Image Inventory](#image-inventory)
  - [Transparent vs. Solid Images](#transparent-vs-solid-images)
- [CSS Architecture](#css-architecture)
  - [Critical Overrides](#critical-overrides)
  - [Spotlight Hover Effect](#spotlight-hover-effect)
- [Deployment](#deployment)
- [Remaining Work](#remaining-work)
- [Session History](#session-history)

---

## Project Overview

- **14 pages total:** `index`, `about`, `cv`, `pursuits`, `game` + 4 case studies + 8 also-pages
- **Pure static HTML/CSS/JS** — no framework, no build step, no dependencies beyond Google Fonts
- **Zero external runtime libraries** — all interactivity is vanilla JS
- **Two visual themes** — Atelier (warm editorial) and Terminal (phosphor CRT), switchable via nav
- **Terminal theme is gated** — only unlocked by winning the Snake easter egg
- **Responsive** — breakpoints at 720px for image grids, fluid typography throughout

---

## File Structure

```
Portfolio_Site/
├── index.html                    # Landing page with load animation
├── about.html                    # Biography, career timeline
├── cv.html                       # Résumé (printable via window.print())
├── pursuits.html                 # Side projects: Prajati, Tube Stage, Exaltic
├── game.html                     # Full-page Snake game (Terminal unlock flow)
│
├── case-studies/                 # Primary showcase (4 deep case studies)
│   ├── asap.html                 # Oracle ASAP — product launch platform
│   ├── unified-assurance.html    # Oracle UA — network assurance dashboard
│   ├── project-xd.html           # Project XD — with Figma prototype button
│   └── kexplora.html             # Kexplora — NDTV Top 20 honoured project
│
├── also-pages/                   # "Beyond the Four" — 8 additional projects
│   ├── 01-launchx.html           # Oracle LaunchX — telecom product management
│   ├── 02-brm-sms.html           # Oracle BRM-SMS — suspended records worklist
│   ├── 03-afcs.html              # Oracle AFCS — financial close data catalog
│   ├── 04-siemens-element.html   # Siemens Element DS — design system components
│   ├── 05-krystal-ai.html        # Krystal AI — AI sales intelligence platform
│   ├── 06-kenya-police.html      # Kenya Police — offline-first mobile operations
│   ├── 07-purple-style.html      # Purple Style Labs — luxury fashion app
│   └── 08-traveller.html         # Traveller — co-passenger social app
│
├── images/                       # All UI screenshots and mockups (28 images)
│   ├── launchx-dashboard.png
│   ├── PM_Initiative-Offerings_Summary.png
│   ├── brm-sms-worklist.png
│   ├── brm-sms-settings.png
│   ├── afcs-catalog.png
│   ├── afcs-inbox.png
│   ├── afcs-issue-detail.png
│   ├── afcs-profile-admin.png        # Available, not yet displayed
│   ├── element-theme.png
│   ├── element-file-uploader.png
│   ├── element-spinner.png
│   ├── krystal-dashboard.png
│   ├── 2187883B-D55C-417D-9E27-E606048C789E.png  # Krystal Fig 02
│   ├── kenya-showcase.png            # Transparent — device mockup
│   ├── kenya-assigned-job.png
│   ├── kenya-job-detail.png
│   ├── kenya-complaint.png           # Available, not yet displayed
│   ├── kenya-dashboard.png           # Available, not yet displayed
│   ├── purple-showcase.png           # Transparent — device mockup
│   ├── purple-showcase-detail2.png
│   ├── purple-member-visit.png
│   ├── purple-showcase-detail.png    # Available, not yet displayed
│   ├── purple-style-prefs.png        # Available, not yet displayed
│   ├── purple-wardrobe.png           # Available, not yet displayed
│   ├── traveller-showcase.png        # Transparent — device mockup
│   ├── traveller-destination-overview.png
│   ├── traveller-journey-overview.png
│   ├── traveller-journey.png         # Available, not yet displayed
│   ├── traveller-passengers.png      # Available, not yet displayed
│   ├── traveller-chat.png            # Available, not yet displayed
│   ├── profile-photo.png             # Transparent — ready for about.html
│   ├── Tube Stage Image.png          # Pursuits — not yet integrated
│   ├── Exaltic.png                   # Pursuits — not yet integrated
│   └── Prajati.png                   # Pursuits — not yet integrated
│
└── shared/                       # Site-wide CSS and JS (loaded on every page)
    ├── tokens.css                # CSS custom properties — both themes
    ├── theme.js                  # Theme engine, Konami code, Snake game
    ├── animations.js             # First-visit load animation
    └── hero-backgrounds.js       # Landing page hero background swap on theme change
```

---

## Pages & Content

### Core Case Studies

These four are the primary portfolio showcase, each with full narrative depth, process documentation, and role/timeline/platform metadata.

| File | Project | Company | What it covers |
|------|---------|---------|----------------|
| `asap.html` | ASAP | Oracle | End-to-end product launch platform for telecom operators |
| `unified-assurance.html` | Unified Assurance | Oracle | Network assurance and fault management dashboard |
| `project-xd.html` | Project XD | Oracle | Includes a "View in Figma" prototype button for interviews |
| `kexplora.html` | Kexplora | — | NDTV Top 20 recognised product |

**Project XD Figma Button**
A call-to-action linking to the Figma prototype is placed after the project metadata grid, before the quick-map stats section. If other case studies gain Figma links, use the same `.case-btn` CSS pattern already defined in that file.

---

### Also Pages — Beyond the Four

Eight supplementary projects with standardised structure. All DRAFT flags removed as of Session 7. Content is final.

| # | File | Project | Core design decision |
|---|------|---------|---------------------|
| 01 | `01-launchx.html` | LaunchX (Oracle) | Journey-based navigation for 5 PM personas; unified end-to-end workflow |
| 02 | `02-brm-sms.html` | BRM-SMS (Oracle) | Status-driven worklist with urgency signals; bulk batch resolution |
| 03 | `03-afcs.html` | AFCS (Oracle) | Data Catalog as nav spine; source + lineage + freshness as first-class UI |
| 04 | `04-siemens-element.html` | Siemens Element DS | Progress as a behaviour family; File Uploader with failure as primary state |
| 05 | `05-krystal-ai.html` | Krystal AI | Explicit "why" for every AI recommendation; 5-minute skim optimised |
| 06 | `06-kenya-police.html` | Kenya Police | Offline-first core assumption; icon+label nav after user testing |
| 07 | `07-purple-style.html` | Purple Style Labs | Lifestyle framing over product catalog; editorial pacing |
| 08 | `08-traveller.html` | Traveller (Mobisoft) | Consent-first discovery; journey as primary context over user profiles |

**Standard block order inside each also-page:**
```
1. image-slot (Fig 01)      ← always above Context
2. Context block
3. Goal block
4. My role block
5. Key decisions block
6. image-pair OR image-row  ← Fig 02 + 03, after Key decisions
7. Impact block
8. Takeaway block
9. Tools & methods block
```

---

## Design System

All design tokens live in `shared/tokens.css` and are consumed as CSS custom properties across all 14 pages.

### Atelier Theme (Default)

The primary editorial theme. Warm off-white background, charcoal type, red accent.

| Token | Value | Role |
|-------|-------|------|
| `--plastic-cream` | `#FAF7F0` | Page background |
| `--plastic-cream-deep` | `#F2EEE4` | Panels, cards |
| `--plastic-charcoal` | `#1A1814` | Primary text |
| `--ink-mid` | `#4A4640` | Secondary text |
| `--ink-muted` | `#7A756D` | Tertiary text, captions |
| `--ink-faint` | `#9E998F` | Placeholder, disabled |
| `--ink-hairline` | `rgba(26,24,20,0.10)` | Borders |
| `--ink-rule` | `rgba(26,24,20,0.06)` | Dividers |
| `--pixel-red` | `#E8513D` | Accent, CTA, figure numbers |
| `--pixel-red-soft` | `rgba(232,81,61,0.06)` | Accent hover fills |

### Terminal Theme (Unlockable)

Phosphor-green CRT aesthetic. Unlocked by winning the Snake game. Persisted in `localStorage`.

| Token | Value | Role |
|-------|-------|------|
| `--plastic-cream` | `#0A0E0B` | Page background (near black) |
| `--plastic-cream-deep` | `#12181A` | Panels |
| `--plastic-charcoal` | `#C8E6D0` | Primary text |
| `--ink-mid` | `#7FDBA8` | Secondary text (phosphor green) |
| `--ink-muted` | `#5A9873` | Tertiary |
| `--pixel-red` | `#FF5F5F` | Accent (terminal red) |

Applied via `[data-theme="terminal"]` attribute on `<html>`. CRT scanline overlay is rendered via `body::before` — visible only in Terminal theme.

### Typography

| Role | Font | Fallback |
|------|------|---------|
| Display / headings | Fraunces | Georgia, serif |
| Body copy | Inter | sans-serif |
| Mono / captions / code | JetBrains Mono | Courier New, monospace |

In Terminal theme, all three fonts switch to JetBrains Mono for full monospaced feel.

### Spacing Scale

```
--s-1: 4px    --s-5: 24px    --s-9:  96px
--s-2: 8px    --s-6: 32px    --s-10: 128px
--s-3: 12px   --s-7: 48px    --s-11: 160px
--s-4: 16px   --s-8: 64px    --s-12: 192px
```

Spacing tokens are identical in both themes.

---

## Shared JavaScript Modules

### theme.js — Theme Engine & Snake Easter Egg

Handles all theme switching logic and the Snake game that gates Terminal access.

**Theme switching flow:**
- Nav has a hardcoded `#pkThemeBtn` button on every page
- If Terminal is **not** unlocked → button navigates to `game.html`
- If Terminal is **unlocked** → button toggles Atelier ↔ Terminal
- Theme state persisted in `localStorage` under key `pk-theme`
- Unlock state persisted under key `pk-terminal-unlocked`
- **Critical guard:** if Terminal is set but not unlocked (e.g. after partial localStorage clear), it reverts to Atelier on load

**Konami Code:**
- `↑ ↑ ↓ ↓ ← → ← → B A` opens the Snake overlay from any page
- This is a secondary entry point alongside `game.html`

**Snake game mechanics:**
- 4 pellets, each labelled with a case study acronym (ASAP, UA, XD, KEXP)
- Eat all 4 → Terminal theme unlocks, `pk-terminal-unlocked = 'true'` written to localStorage
- Game speed increases with each pellet eaten (tickMs decreases by 8ms, floor 70ms)
- Supports arrow keys and touch swipe
- Win on landing page → reloads the page in Terminal mode (replays load animation)
- Win on other pages → shows success message with close button

**Important:** `.nav__theme-btn` CSS must live in `shared/tokens.css` only — never in page-level `<style>` blocks. Theme button is hardcoded HTML in every nav, not dynamically injected.

**Public API exposed on `window.__pkTheme`:**
```js
window.__pkTheme.setUnlocked()
window.__pkTheme.setTheme(theme)    // 'atelier' | 'terminal'
window.__pkTheme.applyTheme(theme)
window.__pkTheme.getTheme()
window.__pkTheme.isUnlocked()
window.__pkTheme.updateThemeBtn()
```

---

### animations.js — Load Animation

Runs once on first visit to the landing page (gated by `localStorage['pk-loaded-once']`).

**Animation sequence:**
1. Dot falls from top of screen
2. Bounces 3 times with decreasing height (48% → 23% → 8%)
3. Transforms into a blinking cursor
4. Types out "Prashant Kashyap" character by character
5. Collapses to a period, breathes briefly
6. Tucked into the top-nav wordmark position
7. Page content reveals

**Theme-aware:** reads `pk-theme` from localStorage before starting. Atelier uses warm earth gradient; Terminal uses phosphor colour journey.

**`prefers-reduced-motion`:** respected — animation is skipped entirely if user has reduced motion set.

**Testing:** `window.__pkReplayLoad()` available in console to replay without clearing localStorage.

---

### hero-backgrounds.js — Hero Background Swap

Manages the animated background on `index.html` (landing page).

On theme change, `window.__pkSwapHeroBackground(theme)` is called by `theme.js` to swap the hero background between Atelier and Terminal palettes without a page reload.

---

## Image System

All images are stored in the `images/` folder at the project root. Referenced from `also-pages/` as `../images/filename.png` and from root-level pages as `images/filename.png`.

### Image Layout Patterns

There are three distinct layout patterns used across also-pages. These must not be mixed up.

---

#### Pattern A — `image-slot` (Full-width, single image)

Used for Fig 01 on every page. Always placed **above** the Context block.

```html
<div class="image-slot">
  <div class="image-slot__frame">
    <img src="../images/filename.png" alt="Description">
  </div>
  <div class="image-slot__caption">
    <span class="number">Fig. 01</span> · Caption text.
  </div>
</div>
```

---

#### Pattern B — `image-pair` (Two images side by side, own captions)

Used for Fig 02 + Fig 03 on **Kenya, Purple, Traveller**. Each image gets its own caption. Captions must never span across both columns.

```html
<div class="image-pair">
  <div class="image-pair__item">
    <div class="image-slot__frame">
      <img src="../images/fig02.png" alt="Description">
    </div>
    <div class="image-slot__caption">
      <span class="number">Fig. 02</span> · Caption for this image only.
    </div>
  </div>
  <div class="image-pair__item">
    <div class="image-slot__frame">
      <img src="../images/fig03.png" alt="Description">
    </div>
    <div class="image-slot__caption">
      <span class="number">Fig. 03</span> · Caption for this image only.
    </div>
  </div>
</div>
```

---

#### Pattern C — `image-row` (Two images side by side, `image-slot--half`)

Used for Fig 02 + Fig 03 on **Siemens Element DS only**.

```html
<div class="image-row">
  <div class="image-slot image-slot--half">
    <div class="image-slot__frame">
      <img src="../images/fig02.png" alt="Description">
    </div>
    <div class="image-slot__caption"><span class="number">Fig. 02</span> · Caption.</div>
  </div>
  <div class="image-slot image-slot--half">
    <div class="image-slot__frame">
      <img src="../images/fig03.png" alt="Description">
    </div>
    <div class="image-slot__caption"><span class="number">Fig. 03</span> · Caption.</div>
  </div>
</div>
```

---

**Critical:** `image-pair` and `image-row` blocks must be **inside** `<div class="container">`. If they fall outside, they stretch to full viewport width and break alignment of all subsequent sections. This is the most common layout bug from automated file edits — always verify container nesting after any modification.

---

### Image Inventory

| Page | Fig 01 | Fig 02 | Fig 03 |
|------|--------|--------|--------|
| LaunchX | `launchx-dashboard.png` | `PM_Initiative-Offerings_Summary.png` | — |
| BRM-SMS | `brm-sms-worklist.png` | `brm-sms-settings.png` | — |
| AFCS | `afcs-catalog.png` | `afcs-inbox.png` | `afcs-issue-detail.png` |
| Siemens Element | `element-theme.png` | `element-file-uploader.png` | `element-spinner.png` |
| Krystal AI | `krystal-dashboard.png` | `2187883B-D55C-417D-9E27-E606048C789E.png` | — |
| Kenya Police | `kenya-showcase.png` | `kenya-assigned-job.png` | `kenya-job-detail.png` |
| Purple Style | `purple-showcase.png` | `purple-showcase-detail2.png` | `purple-member-visit.png` |
| Traveller | `traveller-showcase.png` | `traveller-destination-overview.png` | `traveller-journey-overview.png` |

---

### Transparent vs. Solid Images

**Device mockups with transparent backgrounds** (use as-is on `#FAF7F0` background):
- `kenya-showcase.png`, `purple-showcase.png`, `traveller-showcase.png`
- `launchx-dashboard.png`, `brm-sms-worklist.png`, `afcs-catalog.png`
- `profile-photo.png`

**Direct UI screenshots with solid backgrounds** (no processing needed):
- BRM-SMS, AFCS, Krystal AI, Element DS screen captures

**Do not** run ImageMagick `-fuzz -transparent black` on device mockup images. The fuzz threshold also removes dark parts of device bodies (keyboard keys, device frames), corrupting the image. If background removal is needed, it must be done manually in Figma or Photoshop and exported as a transparent PNG.

**Do not** add background colour fills to transparent PNG images in code. Transparent images should render directly on the page background (`#FAF7F0` in Atelier, `#0A0E0B` in Terminal).

---

## CSS Architecture

### Critical Overrides

Some also-pages were built from a template that included `aspect-ratio: 16/9` on `.image-slot__frame`. This crops images that aren't 16:9. The fix is already applied on Kenya, Purple, and Traveller pages — if any page shows cropped images, add this block before `</style>`:

```css
/* Override fixed aspect-ratio — let images set their own height */
.image-slot__frame:has(img) {
  aspect-ratio: unset;
  background: transparent;
  border: none;
  display: block;
  overflow: visible;
}
.image-slot__frame:has(img) img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
}
.image-pair__item .image-slot__frame {
  aspect-ratio: unset;
  background: transparent;
  border: none;
  display: block;
  overflow: visible;
}
.image-pair__item .image-slot__frame img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: unset;
  border-radius: 4px;
}
```

### Spotlight Hover Effect

A mouse-tracking radial spotlight is applied to all image frames:

```css
.image-slot__frame {
  position: relative;
  border-radius: 4px;
  --mouse-x: 50%;
  --mouse-y: 50%;
  --spotlight-color: rgba(232, 81, 61, 0.12);
}
.image-slot__frame::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(
    circle 400px at var(--mouse-x) var(--mouse-y),
    var(--spotlight-color), transparent 80%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: 1;
}
.image-slot__frame:hover::before { opacity: 1; }
```

```js
const spotlightFrames = document.querySelectorAll('.image-slot__frame');
spotlightFrames.forEach(frame => {
  frame.addEventListener('mousemove', (e) => {
    const rect = frame.getBoundingClientRect();
    frame.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    frame.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});
```

---

## Deployment

This is a **100% static site** — no server-side logic, no build step required.

**Recommended hosts:** Netlify, Vercel, Cloudflare Pages

**Deployment steps:**
1. Upload the `Portfolio_Site/` folder contents to your host's root
2. Point the custom domain `kashyaprashant.com` at the deployment
3. No environment variables or server configuration needed

**CV / PDF export:**  
`cv.html` uses `window.print()` to trigger the browser's print dialog. `cv.pdf` does not exist as a committed file — it is generated by Prashant printing to PDF from his browser. The Download PDF button works correctly as-is.

**.gitignore recommendation:**
```
.DS_Store
__MACOSX/
*.pdf
.claude/
```

---

## Remaining Work

| Task | File(s) | Notes |
|------|---------|-------|
| Profile photo | `about.html` | `profile-photo.png` exists in `images/`; needs placing in the About page sidebar |
| Pursuits page images | `pursuits.html` | `Tube Stage Image.png`, `Exaltic.png`, `Prajati.png` in `images/` — not yet integrated |
| AFCS third image | `03-afcs.html` | `afcs-profile-admin.png` available; could replace or supplement `afcs-inbox.png` as Fig 02 |
| Figma links | Other case studies | If Figma prototypes exist for ASAP / UA / Kexplora, use the `.case-btn` pattern from `project-xd.html` |

---

## Session History

| Session | What was built |
|---------|---------------|
| 1 | Identity, positioning, About page, Atelier design tokens |
| 2 | Case study narratives (4), also-pages scaffolded with DRAFT flags |
| 3 | Terminal theme, `tokens.css`, `theme.js`, Snake game |
| 4 | Nav cleanup, hardcoded theme button, relative path fixes |
| 5 | Animation system (5 iterations), DotField + Threads backgrounds |
| 6 | Handoff document written |
| 7 | All 8 also-pages: DRAFT flags removed, 28 UI images integrated, image layout system built, Figma button added to Project XD |

---

*Last updated: April 23, 2026 — after Session 7. Portfolio is content-complete for the "Beyond the Four" section. Core case studies remain the primary showcase.*
