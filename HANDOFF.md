# Portfolio Project — Handoff Document

**For: continuing work in a new Claude conversation, or for Prashant himself months from now.**

This document captures everything needed to understand and continue the portfolio project without loss of context.

---

## 1. Who this is for

**Prashant "Gappu" Kashyap** — Senior UX Designer at Oracle Communications, Pune, India. 13 years experience. Preferred shortname "Gappu."

**Current positioning:** "Senior UX, enterprise software" (matches actual Oracle title — not over-reaching to Principal).

**Career arc (anchors for content):**
- QuadNode (2012) → Amura (2013) → Conexstra (2014) → Mobisoft → InfoBeans → Concurrent: Exaltic Nutrition co-founder 2016-2019 → McDermott 2019 → Siemens Smart Buildings 2020-2022 → **Oracle Communications May 2022-present**
- Also: Prajati (animal education, 2018-present), Tube Stage (tech YouTube, Sep 2025+), "Echoes of Innovation" publication (Dec 2023)
- Education: BE Electrical (Pune Vidhyarthi Griha's), IxDF UX program 2019-2022, HFI CUA certification 2022
- Honors: NDTV Top 20 for Kexplora, 3 InfoBeans awards
- Contact: `prashantkashyap91@outlook.com`, linkedin.com/in/kashyaprashant/
- Domain: `kashyaprashant.com`

**Goal:** Deploy a polished portfolio at kashyaprashant.com suitable for Senior/Principal UX roles.

---

## 2. What's been built

A complete static HTML portfolio. **Delivered as `portfolio-package.zip` (~125KB).**

### Structure (17 pages + shared system)

```
portfolio-package/
├── README.md
├── index.html                     ← landing (has load animation + hero BG)
├── about.html                     ← practice-focused direction (locked)
├── cv.html                        ← full CV, Print→PDF for cv.pdf
├── pursuits.html                  ← Exaltic · Prajati · Tube Stage · Echoes
├── game.html                      ← Snake unlock page
├── case-studies/
│   ├── asap.html                  ← ASAP · Oracle (in engineering)
│   ├── unified-assurance.html     ← UA · Oracle (in flight)
│   ├── project-xd.html            ← XD · McDermott (shipped)
│   └── kexplora.html              ← Kexplora · Conexstra (NDTV Top 20)
├── also-pages/                    ← 8 "Beyond the four" projects
│   ├── 01-launchx.html            ← Oracle
│   ├── 02-brm-sms.html            ← Oracle BRM Suite
│   ├── 03-afcs.html               ← Oracle AFCS
│   ├── 04-siemens-element.html    ← Siemens Smart Buildings
│   ├── 05-krystal-ai.html         ← Krystal AI
│   ├── 06-kenya-police.html       ← Public sector
│   ├── 07-purple-style.html       ← Purple Style Labs
│   └── 08-traveller.html          ← Mobisoft
└── shared/
    ├── tokens.css                 ← Atelier + Terminal tokens + load overlay CSS
    ├── theme.js                   ← theme state + Konami + Snake overlay
    ├── animations.js              ← first-visit load animation
    └── hero-backgrounds.js        ← DotField (Atelier) + Threads (Terminal)
```

---

## 3. Design system (locked)

### Atelier theme (default)
| Token | Value | Purpose |
|---|---|---|
| `--plastic-cream` | `#FAF7F0` | background |
| `--plastic-cream-deep` | `#F2EEE4` | panels, cards |
| `--plastic-charcoal` | `#1A1814` | primary text |
| `--ink-mid` | `#4A4640` | secondary text |
| `--ink-muted` | `#7A756D` | tertiary text |
| `--ink-faint` | `#9E998F` | hints |
| `--pixel-red` | `#E8513D` | accent |
| Display | Fraunces (variable, opsz+italic) | headlines |
| Body | Inter | paragraphs |
| Mono | JetBrains Mono | metadata, labels |

### Terminal theme (unlockable via Snake)
| Token | Value | Purpose |
|---|---|---|
| bg | `#0A0E0B` | phosphor-tube black |
| bg-deep | `#12181A` | panels |
| text primary | `#7FDBA8` | phosphor-green |
| text secondary | `#5A9873` | muted phosphor |
| accent | `#FF5F5F` | terminal-red |
| All typography | JetBrains Mono | |
| CRT scanline | opacity 0.03 | subtle overlay |

### Load animation stage palettes

**Atelier (5-stage warm earth gradient):**
- Stage 0: bg `#1A1410` + dot `#E8513D` (pixel-red)
- Stage 1: bg `#2D1B13` + dot `#C95A3C` (dark cocoa)
- Stage 2: bg `#5A3A28` + dot `#E8513D` (terracotta)
- Stage 3: bg `#FAF7F0` + dot `#E8513D` (plastic-cream — matches landing)
- Reveal: same as stage 3, seamless transition

**Terminal (5-stage phosphor journey):**
- Stage 0: bg `#0A0E0B` + dot `#7FDBA8` (phosphor)
- Stage 1: bg `#0F1A14` + dot `#5A9873` (deep phosphor)
- Stage 2: bg `#1A2B22` + dot `#7FDBA8` (forest-dark)
- Stage 3: bg `#0A0E0B` + dot `#FF5F5F` (terminal-red as period)
- Reveal: stays on `#0A0E0B` (Terminal landing)

### Spacing scale
4px base — `--s-1` through `--s-12` (4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192).

---

## 4. The animation system (detailed)

Three JS modules in `shared/`. Each is self-contained and initializes on DOMContentLoaded.

### `animations.js` — First-visit load animation

**Trigger:** Only runs when `<body>` has class `pk-landing` (index.html only).

**Phases:**
1. **Fall** (600ms) — dot drops from top, gravity ease
2. **3 bounces** (~800ms) — each bounce: squash (90/80/70ms) → up (180/130/70ms) → down (140/100/60ms). Heights diminish: 48%, 23%, 8% of fall distance. Color shift on each squash moment.
3. **Cursor transform** (200ms) — dot becomes tall thin blinking cursor (4px wide, 62% of name height)
4. **Typing** (~1s) — cursor moves right 75ms per letter position, blinks 70ms at each pause. Letter appears at 40% of each move.
5. **Period settle** (~300ms) — cursor morphs back to round dot at end of name, breath-pulses once (scale 1 → 1.3 → 1, 280ms)
6. **Tuck to nav** (750ms) — whole stage translates + scales to nav wordmark. Background fades to landing color at 55% through tuck.

**Palette source:** Reads `localStorage.getItem('pk-theme')` at start. Uses Atelier or Terminal palette accordingly.

**Cache:** After first successful run, sets `localStorage.setItem('pk-loaded-once', 'true')`. Subsequent page loads skip animation.

**Manual replay:** `window.__pkReplayLoad()` from console.

**Reduced motion:** If `prefers-reduced-motion: reduce`, skips animation entirely.

### `hero-backgrounds.js` — Hero background renderer

**Trigger:** Only runs when `#pkHeroCanvas` element exists (index.html only).

**Atelier (dot field):** Ported verbatim from reactbits DotField.
- 1.5px dots on 14px spacing grid
- Cursor radius 500px (large reach)
- Bulge strength 67 (position shift toward cursor, not velocity)
- **Engagement-gated:** dots only react when cursor moves fast enough. `mouse.speed/5` targetEngagement with 0.06 lerp-in. Slow cursor = zero reaction.
- Warm cream/white radial glow (`rgba(255, 252, 245, 0.55)`) under cursor, opacity tied to engagement
- Linear gradient fill (plastic-charcoal 0.55 → ink-mid 0.45) for dot visibility

**Terminal (Threads):** Actual reactbits Threads shader, loaded via dynamic import.
- OGL library from `cdn.jsdelivr.net/npm/ogl@1.0.11/+esm`
- Fragment shader: 40 horizontal lines, Perlin noise perturbation, mouse-interactive
- Phosphor-green color `(0.498, 0.859, 0.659)`
- If OGL fails to load → falls back to DotField gracefully

**Swap:** `window.__pkSwapHeroBackground(theme)` tears down current and builds new. Called by theme.js on toggle.

### `theme.js` — Theme state + Snake game

**Finds** hardcoded `#pkThemeBtn` in every page's nav (except game.html). Wires click handler.

**Before Snake win:**
- Button label: "▮ Terminal" with blinking cursor
- Click action: navigate to `game.html` (relative path, resolves from any page depth)

**After Snake win:**
- Button label toggles "Atelier" / "Terminal"
- Click action: swap theme + call `__pkSwapHeroBackground`
- Blinking animation stops (unlocked state)

**Konami code** listener active on every page: `↑↑↓↓←→←→BA` → opens Snake overlay.

**Snake game (shared logic between overlay + `game.html`):**
- 4 case-study pellets: ASAP (red), UA (coral), XD (green), KEXP (amber)
- Arrow keys + touch swipe
- Eat all 4 → unlock Terminal
- Speed increases with each pellet

**localStorage keys:**
- `pk-loaded-once` — load animation cache
- `pk-terminal-unlocked` — Snake win flag
- `pk-theme` — current theme choice (`'atelier'` or `'terminal'`)

---

## 5. Content anti-fabrication protocol

**CRITICAL:** Any content Claude drafted without solid source has a DRAFT flag (dashed red border + "DRAFT · REPLACE WITH YOUR WORDS" label).

### DRAFT blocks (need Prashant's replacement)

All 8 Also pages have three DRAFT sections each: **Context, Key Decisions, Takeaway.** ~24 DRAFT blocks total.

### Unverified claims (need verification, NOT flagged as DRAFT)

These are reflections Claude drafted that Prashant didn't explicitly confirm:

1. **case-studies/project-xd.html** — "What I got wrong" section claims Prashant ignored engineers for 6 weeks
2. **case-studies/kexplora.html** — "Stay longer" reflection about what he'd change
3. **case-studies/unified-assurance.html** — "Start with sales, not PM" reflection
4. **pursuits.html (Exaltic)** — says "two friends and I co-founded" — Prashant's LinkedIn just says "co-founded"
5. **pursuits.html (Echoes)** — claims ideas from the publication "showed up in UA Ask Oracle" work

### Verified content (from LinkedIn/screenshots, safe)

- All 10 role tenures and dates
- NDTV Top 20 for Kexplora (2015)
- 3 InfoBeans awards
- IxDF UX program (2019-2022)
- HFI CUA certification
- IPL partnership claim for Exaltic (directly from Prashant's LinkedIn job description)
- Prajati podcast with Anish Andheria (verified)

---

## 6. Design decisions locked across 5 sessions

### Session 1-2: Structure
- Direction A "practice-focused" About page (vs 3 other drafts)
- 4 main case studies + 8 Also pages layout
- Pursuits page with 4 ventures (Exaltic, Prajati, Tube Stage, Echoes)
- Oracle Communications listed as current employer, not Principal-level framing

### Session 3: Theme system
- Terminal = Level 1 skin (palette + font swap, same layouts), not a full redesign
- Konami code primary unlock path
- Snake game as earning mechanic
- 4 case-study pellets color-coded

### Session 4: Nav + discoverability
- Theme toggle **hardcoded HTML in every nav**, not dynamically injected (this was a bug fix)
- Before unlock: button navigates to `game.html`
- After unlock: button toggles themes
- Pursuits **removed** from top nav of every page — only reachable via landing CTA
- Pursuits on landing = prominent `.deep-cta` button (not inline link)
- Beyond the four CTA **removed** from About page — only CV CTA remains

### Session 5: Animations (5 iterations)
- **v1-v2:** Claude's guesses at reactbits behavior (wrong)
- **v3:** Real spring physics but too bouncy
- **v4:** Close but still wrong tuning
- **v5:** Prashant pasted actual reactbits DotField + Threads source — Claude ported verbatim. **This is what works.**
- Load animation: Flow A (bounce → cursor typing) with warm-earth palette (dark → cocoa → terracotta → cream)
- Cursor typing: hybrid movement (smooth between letters, blinks at pauses)
- Dot field glow: warm near-white (NOT dark charcoal — that was a bug)
- Dot field visibility: ramped up gradient opacity to 0.55/0.45 (was too faint at 0.22/0.16)
- Atelier stage 3 background: plastic-cream (was dusty-brown which broke cohesion)

---

## 7. What's pending (Prashant's work)

### Priority 1: Content on 8 Also pages
Each has 3 DRAFT sections. Open each, replace with his real writing. Order suggestion:

1. `also-pages/01-launchx.html` (Oracle — has context from his day job)
2. `also-pages/02-brm-sms.html` (Oracle)
3. `also-pages/03-afcs.html` (Oracle)
4. `also-pages/04-siemens-element.html` (Siemens, 2020-2022)
5. `also-pages/05-krystal-ai.html`
6. `also-pages/06-kenya-police.html` (2016-2017)
7. `also-pages/07-purple-style.html` (2015-2016)
8. `also-pages/08-traveller.html` (Mobisoft)

### Priority 2: Verify unverified reflections (section 5 above)

### Priority 3: Add real images (~40 slots)
All image placeholders use dashed borders. Priority:
1. Prashant's photo on About
2. ASAP screenshots (targeting table is the signature visual)
3. UA screenshots (6-surface architecture diagram)
4. XD screenshots (before/after split — Excel vs globe view)
5. Kexplora screenshots (5-event timeline 2014-2015)
6. Pursuits visuals: Exaltic product, Prajati Instagram grid, Tube Stage banner, Echoes cover

### Priority 4: Export CV PDF
Open `cv.html` → Print → Save as PDF → save as `cv.pdf` in package root. "Download PDF" button links to `/cv.pdf`.

### Priority 5: Deploy
Static host: Netlify drop, Vercel CLI, Cloudflare Pages, or GitHub Pages. Point `kashyaprashant.com` at it.

---

## 8. Known gotchas + architectural notes

**OGL CDN dependency:** Terminal Threads imports from `cdn.jsdelivr.net`. If blocked, graceful fallback to DotField. For production robustness, vendor OGL locally (copy `ogl.min.js` to `shared/` and change import path).

**localStorage state doesn't survive "clear site data":** This is browser security by design. If user clears everything, theme unlock resets, load animation runs again. Claude explored workarounds (cookies, etc.) — none are reliable. Accept it.

**Load animation only runs on landing:** `pk-landing` body class gates this. Intentional — don't run on every page.

**Theme button is hardcoded, not JS-injected:** This was a Session 4 fix after Prashant noticed the button wasn't reliably appearing. Do not go back to dynamic injection.

**Integration scripts in `.build-scripts/`:** Excluded from the shipped zip. Not needed at runtime.

**Relative paths:** All internal links use relative paths (`case-studies/asap.html`, `../index.html` etc.). Works offline, works on static hosts, will need updating if/when migrating to Next.js routing.

**Contact email:** `prashantkashyap91@outlook.com` (NOT `hello@kashyaprashant.com` — that's a Claude hallucination from early sessions).

**No GitHub link** on landing — Prashant has no public portfolio repo. Don't add one back.

---

## 9. How to continue the work (for new Claude conversation)

### If you're Prashant pulling this into Claude Code:

First prompt for Claude Code:
> "Read the README.md and this handoff document. Then walk me through the file structure. I want to understand how shared/ works before making changes."

Then:
> "Start a local dev server so I can preview the portfolio."

For content work (iterate per page):
> "Open also-pages/01-launchx.html. Show me the three DRAFT sections. I'm going to paste my real content for Context, Key Decisions, and Takeaway. Replace those exactly, keep everything else untouched."

For image work:
> "I have screenshots at ./screenshots/. Walk me through integrating real images into the ASAP case study — replace the dashed placeholder frames with real `<img>` tags pointing to my files."

When ready to deploy:
> "Deploy this to Cloudflare Pages (or Netlify, or Vercel). Walk me through the CLI flow."

### If you're a new Claude conversation with Prashant:

1. Read this entire handoff document first
2. Verify you understand the animation system by reading `shared/animations.js` and `shared/hero-backgrounds.js`
3. Do NOT rebuild the animation system. It took 5 iterations to get right and is now faithful to reactbits.
4. Do NOT add features without asking. Snake, Terminal theme, dual animations — this portfolio has plenty. More features = more surfaces to break.
5. DO help with: content replacement on DRAFT blocks, image integration, deployment, Next.js migration if requested.
6. Respect the anti-fabrication protocol. Any content you draft must be flagged DRAFT. Never invent claims about Prashant's work or intent.
7. Prashant appreciates: honest flags, admitted mistakes, concrete recommendations, proportional scope.
8. Prashant dislikes: over-engineering, feature creep, ambiguous answers, half-done work.

---

## 10. Session-by-session summary (what happened)

**Session 1** — Identity, positioning, About page drafts (4 directions), Direction A locked, Atelier tokens locked.

**Session 2** — Case study narratives: ASAP, UA, XD, Kexplora. Also pages 01-08 built with DRAFT flags. Landing page assembled.

**Session 3** — Terminal theme designed. tokens.css + theme.js + Snake game. All 14 pages Terminal-enabled. First zip delivered.

**Session 4** — Navigation cleanup: hardcoded theme button (bug fix), removed Pursuits from top nav, added Pursuits CTA button on landing, removed Beyond CTA from About. Email updated. GitHub link removed. All absolute paths rewritten to relative.

**Session 5** — Animation system built across 5 iterations (v1-v5). Load animation with warm-earth palette + cursor typing. Reactbits DotField (Atelier) + Threads (Terminal) integrated. Final integration pass on all 17 pages. Zip rebuilt.

**Session 6 (current)** — This handoff document.

---

## 11. Things to definitely NOT do

### CRITICAL GOTCHA #1 — Theme state must be guarded

**The #1 recurring bug in this project:** the theme button lets you toggle to Terminal without first playing Snake, because `pk-theme` in localStorage gets out of sync with `pk-terminal-unlocked`.

**The guard that MUST stay in `theme.js`:**
```js
(function enforceThemeGuard() {
  const unlocked = localStorage.getItem(STORAGE_KEYS.unlocked) === 'true';
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  if (savedTheme === 'terminal' && !unlocked) {
    localStorage.setItem(STORAGE_KEYS.theme, 'atelier');
  }
})();
applyTheme(getTheme());
```

This runs on every page load, wrapped in an IIFE so it executes immediately before `applyTheme()`. If a user has `pk-theme=terminal` but not `pk-terminal-unlocked=true`, it forces theme back to atelier. DO NOT remove this guard.

Related bug: old inline `<script>` blocks from Session 1 had duplicate Konami handlers that interfered with `theme.js`. If any page shows weird theme behavior, grep for `const konami` or `konami-armed` in the HTML — that's stale code and must be removed.

### CRITICAL GOTCHA #2 — `.nav__theme-btn` CSS MUST live in `shared/tokens.css`

**Do NOT inject `.nav__theme-btn` CSS into individual page `<style>` blocks.** An earlier attempt did this and broke because case studies (using `.nav__back`) and also-pages have different nav CSS contexts than the landing page. Some pages got the styling, others didn't — button appeared as a blue underlined link in Safari on case studies.

The rule:
- `.nav__theme-btn`, `.nav__theme-blink`, `@keyframes nav-blink`, and the `html[data-theme="terminal"]` overrides for these MUST live in `shared/tokens.css` — one source of truth.
- Every page automatically gets the styling because every page links `tokens.css`.
- If you ever notice the theme button looks wrong on a specific page, check `tokens.css` has these rules, don't add them to the page's inline CSS.

### CRITICAL GOTCHA #3 — `cv.pdf` doesn't exist until Prashant creates it

**The CV page's primary button must use `window.print()`, NOT link to `cv.pdf`.** The `cv.pdf` file is something Prashant generates himself via browser print. Until he does that, any `<a href="cv.pdf">` link is broken. The working pattern:

```html
<button onclick="window.print()" class="header-btn header-btn--primary">
  <span class="header-btn__icon">↓</span>
  <span>Save as PDF</span>
</button>
```

Browser print dialog lets users save as PDF themselves — works on every OS, no file needed.

### DON'T:

1. **Don't rebuild the animation system.** It's faithful to reactbits. If something feels off, tune parameters, don't rewrite.
2. **Don't add new easter eggs.** Snake + Konami + Terminal theme + two hero animations is already a lot.
3. **Don't remove the DRAFT flags** without replacing with verified content.
4. **Don't invent content.** If Prashant hasn't verified a claim, it stays DRAFT or gets removed.
5. **Don't migrate to Next.js without asking.** Static HTML works. Migration is optional future work.
6. **Don't add more pages.** 17 is the right number.
7. **Don't change the theme unlock mechanic.** Snake-to-win is locked as a design decision.
8. **Don't revert hardcoded theme button back to dynamic injection.**
9. **Don't change case study reflection claims** that Prashant marked unverified without asking him.
10. **Don't recommend deployment services he's not asked about.** Netlify / Vercel / Cloudflare Pages are the three good options.

---

## 12. Final file locations

**Canonical deliverable:** `portfolio-package.zip` (~125KB)

**Source of truth after unzip:** `portfolio-package/` folder

**Individual file copies in outputs:** Duplicates of files already in the zip. Safe to ignore/delete. They exist only because I copied them for quick inspection.

**Animation test files (v1 through v5):** Historical drafts from Session 5 iteration. Not needed for production. The final logic is already integrated into `shared/animations.js` and `shared/hero-backgrounds.js`.

---

*Handoff doc written April 23, 2026 after five sessions totaling roughly 40 hours of collaborative design and code work. The portfolio is now a polished specification ready for content completion and deployment.*

*— Claude, ending Session 6*
