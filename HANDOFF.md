# Portfolio Project — Handoff Document
## Session 7 Update · April 23, 2026

**For: continuing work in a new Claude conversation.**

This document supersedes the previous handoff. It carries forward everything from Sessions 1–6 and adds critical learnings from Session 7 (the "Beyond the Four" image integration session).

---

## 1. Who This Is For

**Prashant "Gappu" Kashyap** — Senior UX Designer at Oracle Communications, Pune, India. 13 years experience.

**Career arc:**
QuadNode (2012) → Amura (2013) → Conexstra (2014) → Mobisoft → InfoBeans → Exaltic co-founder 2016–2019 → McDermott 2019 → Siemens Smart Buildings 2020–2022 → **Oracle Communications May 2022–present**

**Also:** Prajati (animal education, 2018–present), Tube Stage (tech YouTube, Sep 2025+), Echoes of Innovation publication (Dec 2023)

**Education:** BE Electrical (Pune Vidhyarthi Griha's), IxDF UX 2019–2022, HFI CUA 2022

**Honors:** NDTV Top 20 for Kexplora, 3 InfoBeans awards

**Contact:** prashantkashyap91@outlook.com · linkedin.com/in/kashyaprashant/ · kashyaprashant.com

**Goal:** Polished portfolio at kashyaprashant.com for Senior/Principal UX roles.

---

## 2. What Was Built in Session 7

Session 7 was entirely about the **8 "Beyond the Four" also-pages** — replacing DRAFT placeholder blocks with real content, integrating real UI screenshots, and establishing image layout patterns across all pages.

### The final package is `portfolio-package-final.zip` (~24MB)

The size increase from the original 125KB zip is entirely images (28 UI screenshots).

---

## 3. File Structure (unchanged from Session 6)

```
portfolio-package/
├── index.html
├── about.html
├── cv.html
├── pursuits.html
├── game.html
├── case-studies/
│   ├── asap.html
│   ├── unified-assurance.html
│   ├── project-xd.html          ← NEW: Figma link button added
│   └── kexplora.html
├── also-pages/
│   ├── 01-launchx.html
│   ├── 02-brm-sms.html
│   ├── 03-afcs.html
│   ├── 04-siemens-element.html
│   ├── 05-krystal-ai.html
│   ├── 06-kenya-police.html
│   ├── 07-purple-style.html
│   └── 08-traveller.html
├── images/                       ← NEW FOLDER (28 images)
└── shared/
    ├── tokens.css
    ├── theme.js
    ├── animations.js
    └── hero-backgrounds.js
```

---

## 4. Also-Pages: Content Status (ALL DRAFT FLAGS REMOVED)

All 8 also-pages now have verified content. DRAFT flags are gone. Here's what was finalized:

### 01 · LaunchX (Oracle)
- **Context:** Telecom operators launching offerings across fragmented tools. LaunchX = single end-to-end platform for Product Managers.
- **Key decisions:** Unified workflow, role-aware surfaces (5 personas); journey-based navigation not menu-based.
- **Takeaway:** Strong enterprise workflow aligns product structure with how users think about the job to be done.

### 02 · BRM-SMS (Oracle BRM Suite)
- **Context:** BRM suspended records system — CSRs drowning in undifferentiated queues, no priority signals.
- **Key decisions:** Status-driven worklist with urgency signals; bulk actions for batch resolution.
- **Takeaway:** Worklist design = implicit communication of what matters most.

### 03 · AFCS (Oracle AFCS)
- **Context:** Financial close system — finance teams manually tracking reconciliation status across email threads and spreadsheets.
- **Key decisions:** Data Catalog as navigational spine; trust signals (source, lineage, freshness) as first-class UI.
- **Takeaway:** Financial data without provenance is untrustworthy. Transparency is the product.

### 04 · Siemens Element DS
- **Context:** Wide Siemens portfolio had grown with each team designing own components — inconsistent UX within same customer account.
- **Key decisions:** Progress as a behavior family (Spinner/Skeleton/Progress Bar); File Uploader with failure as a first-class state.
- **Takeaway:** Design system components need defensible opinions to survive reinterpretation.

### 05 · Krystal AI
- **Context:** AI-driven sales intelligence platform — sales leaders couldn't act on data fast enough.
- **Key decisions:** Explicit "why" for every AI recommendation; built for 5-minute skimming.
- **Takeaway:** AI without explainability gets ignored.

### 06 · Kenya Police
- **Context:** Paper-and-radio police operations → mobile digitization. Low-end Android, intermittent connectivity, low digital literacy.
- **Key decisions:** Offline-first as core assumption (not exception); icon+label navigation after user testing proved icons alone insufficient.
- **Takeaway:** Design must meet users at their actual digital literacy floor, not the hoped-for floor.

### 07 · Purple Style Labs
- **Context:** Luxury fashion house wanting mobile personal styling. Needed editorial feel, not transactional.
- **Key decisions:** Lifestyle framing over product catalog; editorial pacing over e-commerce rhythms.
- **Takeaway:** Positioning is a design decision before it's a marketing one.

### 08 · Traveller (Mobisoft)
- **Context:** Long-haul travel social app — connecting co-passengers during idle transit time.
- **Key decisions:** Consent-first discovery (opt-in with granular controls); journey as primary context (not user profiles).
- **Takeaway:** In social products with strangers, shared context beats shared interest.

---

## 5. Image System — Everything You Need To Know

### 5.1 Image folder

All images live in `portfolio-package/images/`. Referenced from also-pages as `../images/filename.png`.

### 5.2 Final image mapping (by page)

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

**Additional images in the folder (not currently displayed but present):**
- `profile-photo.png` — Prashant's profile photo (transparent bg), ready for About page
- `afcs-profile-admin.png` — AFCS admin screen (available to add)
- `kenya-complaint.png` — Kenya complaint form
- `traveller-passengers.png`, `traveller-chat.png` — extra Traveller screens
- `purple-style-prefs.png`, `purple-wardrobe.png` — extra Purple screens
- Pursuits images: `Tube Stage Image.png`, `Exaltic.png`, `Prajati.png`

### 5.3 Image backgrounds

- Images with **transparent backgrounds** (device mockups): Kenya, Purple, Traveller showcase images, profile photo. Use as-is — the page background (#FAF7F0) shows through.
- Images with **solid content** (UI screenshots): BRM-SMS, AFCS, Krystal AI, Element DS. These are direct screen captures with no device frame.
- **DO NOT** run ImageMagick `-fuzz` background removal on device mockup images. It corrupts the mockup (learned the hard way in this session — removes dark parts of device body too).

### 5.4 Image layout patterns (CRITICAL — read carefully)

There are **three distinct layout patterns** used across pages. Each has its own CSS class. Getting these mixed up causes the major layout bugs we spent hours fixing.

#### Pattern A: `image-slot` (full-width, single image)
Used for Fig 01 on every page. Always above Context block.

```html
<div class="image-slot">
  <div class="image-slot__frame">
    <img src="../images/filename.png" alt="description">
  </div>
  <div class="image-slot__caption"><span class="number">Fig. 01</span> · Caption text.</div>
</div>
```

#### Pattern B: `image-pair` (two images side by side, each with own caption)
Used for Fig 02 + Fig 03 on Kenya, Purple, Traveller. Each image gets its OWN caption underneath — captions never span across both columns.

```html
<div class="image-pair">
  <div class="image-pair__item">
    <div class="image-slot__frame">
      <img src="../images/fig02.png" alt="description">
    </div>
    <div class="image-slot__caption"><span class="number">Fig. 02</span> · Caption for fig 02 only.</div>
  </div>
  <div class="image-pair__item">
    <div class="image-slot__frame">
      <img src="../images/fig03.png" alt="description">
    </div>
    <div class="image-slot__caption"><span class="number">Fig. 03</span> · Caption for fig 03 only.</div>
  </div>
</div>
```

#### Pattern C: `image-row` (two images side by side)
Used for Fig 02 + Fig 03 on Siemens Element DS only. Uses `image-slot--half` modifier.

```html
<div class="image-row">
  <div class="image-slot image-slot--half">
    <div class="image-slot__frame">
      <img src="../images/fig02.png" alt="description">
    </div>
    <div class="image-slot__caption"><span class="number">Fig. 02</span> · Caption.</div>
  </div>
  <div class="image-slot image-slot--half">
    <div class="image-slot__frame">
      <img src="../images/fig03.png" alt="description">
    </div>
    <div class="image-slot__caption"><span class="number">Fig. 03</span> · Caption.</div>
  </div>
</div>
```

### 5.5 Standard page structure (also-pages)

The correct block order inside `<div class="container">`:

```
1. image-slot (Fig 01) ← ABOVE Context, always
2. block block--context
3. block (Goal)
4. block (My role)
5. block (Key decisions)
6. image-pair OR image-row (Fig 02 + 03) ← AFTER Key decisions, BEFORE Impact
7. block (Impact)
8. block (Takeaway)
9. block (Tools & methods)
```

**CRITICAL:** The `image-pair` and `image-row` blocks MUST be inside `<div class="container">`. If they end up outside the container (a frequent bug from automated edits), they stretch to full viewport width and break all alignment below them.

---

## 6. CSS Rules for Images — Critical Overrides

### 6.1 The `aspect-ratio: 16/9` problem

The base `.image-slot__frame` CSS on some also-pages includes `aspect-ratio: 16/9`. This **crops images** because it forces a fixed height regardless of the actual image dimensions.

**The fix** (in place on Kenya, Purple, Traveller):
```css
/* Override fixed aspect-ratio - let real images set their own height */
.image-slot__frame:has(img) { aspect-ratio: unset; background: transparent; border: none; display: block; overflow: visible; }
.image-slot__frame:has(img) img { width: 100%; height: auto; display: block; border-radius: 4px; }
.image-pair__item .image-slot__frame { aspect-ratio: unset; background: transparent; border: none; display: block; overflow: visible; }
.image-pair__item .image-slot__frame img { width: 100%; height: auto; display: block; object-fit: unset; border-radius: 4px; }
```

If any page shows cropped images, add this CSS block before `</style>`.

### 6.2 Image-pair CSS (Kenya, Purple, Traveller)

```css
.image-pair { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-6); margin: var(--s-7) 0 var(--s-5); width: 100%; }
.image-pair__item { display: flex; flex-direction: column; gap: var(--s-3); min-width: 0; }
.image-pair__item .image-slot__frame { overflow: hidden; border-radius: 4px; }
.image-pair__item .image-slot__frame img { width: 100%; height: auto; display: block; object-fit: contain; }
.image-pair__item .image-slot__caption { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); }
.image-pair__item .image-slot__caption .number { color: var(--pixel-red); font-weight: 500; }
@media (max-width: 720px) { .image-pair { grid-template-columns: 1fr; gap: var(--s-5); } }
```

### 6.3 Image-row CSS (Element DS only)

```css
.image-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-6); margin: var(--s-7) 0 var(--s-5); width: 100%; align-items: start; }
.image-slot--half { margin: 0; min-width: 0; }
.image-slot--half .image-slot__frame { aspect-ratio: unset; background: transparent; border: none; display: block; overflow: visible; }
.image-slot--half .image-slot__frame img { width: 100%; height: auto; display: block; border-radius: 4px; }
@media (max-width: 720px) { .image-row { grid-template-columns: 1fr; gap: var(--s-5); margin: var(--s-6) 0; } }
```

### 6.4 Spotlight hover effect (on all image frames)

All also-pages have this mouse-tracking spotlight effect:

```css
.image-slot__frame { position: relative; border-radius: 4px; --mouse-x: 50%; --mouse-y: 50%; --spotlight-color: rgba(232, 81, 61, 0.12); }
.image-slot__frame::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle 400px at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%); opacity: 0; transition: opacity 0.5s ease; pointer-events: none; z-index: 1; }
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

## 7. Figma Link Button (Project XD Case Study)

A "View detailed process in Figma" button was added to `case-studies/project-xd.html` for use during interviews.

**Location:** After the meta-grid (Role/Team/Timeline/Platform/Status), before the quick-map stats section.

**URL:** `https://www.figma.com/proto/64KGt6giqA9bsp2BFGAVbl/Portfolio?node-id=25822-1506&t=BYvf4vGQwRfBChri-0&scaling=contain&content-scaling=fixed&starting-point-node-id=25822%3A1506`

**Button CSS:**
```css
.case-actions { margin-top: var(--s-6); padding-top: var(--s-6); border-top: 1px solid var(--ink-hairline); }
.case-btn { display: inline-flex; align-items: center; gap: var(--s-3); padding: var(--s-4) var(--s-5); text-decoration: none; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.2s ease; background: var(--plastic-charcoal); color: var(--plastic-cream); border: 1px solid var(--plastic-charcoal); }
.case-btn:hover { background: var(--pixel-red); border-color: var(--pixel-red); color: var(--plastic-cream); }
```

**Button HTML:**
```html
<div class="case-actions">
  <a href="[FIGMA_URL]" target="_blank" rel="noopener noreferrer" class="case-btn">
    <span class="case-btn__icon">→</span>
    <span>View detailed process in Figma</span>
  </a>
</div>
```

If Prashant has Figma links for other case studies, the same pattern applies.

---

## 8. Profile Photo

`profile-photo.png` is in `portfolio-package/images/` — transparent background, ready to use.

It has NOT been integrated into `about.html` yet. The About page has a placeholder for it. When adding:
- Use as `<img src="../images/profile-photo.png">` from about.html (which is at root level, so just `images/profile-photo.png`)
- The spotlight hover CSS should be applied to it as well (same `.image-slot__frame` pattern)

---

## 9. Lessons Learned the Hard Way This Session

These are mistakes made and fixed — don't repeat them.

### 9.1 NEVER use ImageMagick `-fuzz -transparent black` on device mockups

**What happened:** We tried to auto-remove black backgrounds from device mockup images (laptop, phone). ImageMagick's fuzz setting also removed dark parts of the device body (keyboard keys turned transparent, device borders disappeared).

**The right approach:** If an image has a black background that needs removing, the user must do it manually in Figma/Photoshop. Accept transparent PNG files from the user, use them directly without any processing.

**Images Prashant manually edited** (have clean transparent backgrounds, use as-is):
- `launchx-dashboard.png`, `brm-sms-worklist.png`, `afcs-catalog.png`, `kenya-showcase.png`, `purple-showcase.png`, `traveller-showcase.png`

### 9.2 NEVER add any background color to transparent PNG images

User explicitly requested: if an image has transparent background, render it on the page background (#FAF7F0) — no color fill added by code.

**What went wrong:** We added `#F2EEE4` fill via Python PIL, and then ImageMagick color replacement, both of which broke the transparent mockups.

### 9.3 The container closing too early bug

**The most common and damaging bug in this session.** When automated Python regex edits insert or move content, they sometimes close `</div>` for `.container` early. Then subsequent elements (image-row, image-pair, block divs) land outside the container and render full-width.

**Symptom:** Images stretch to full viewport width. Impact/Takeaway/Tools sections lose their left label column and collapse.

**How to detect:** In browser DevTools, inspect the broken image. If its parent chain goes `body > div.image-row` (skipping `.container`), the container closed early.

**How to fix:** Read the HTML with `view` tool, find the stray `</div>`, remove it, ensure image layout is INSIDE the container.

**Prevention:** Always `view` the file before and after automated edits. Never trust a Python regex edit without verifying the resulting HTML structure.

### 9.4 Duplicate captions from iterative edits

Multiple rounds of Python scripts inserting image slots caused duplicate Fig. 02 and Fig. 03 caption lines. 

**Prevention:** Always search for existing image-slot blocks before inserting new ones. Use `grep -n "Fig\. 0"` to check.

### 9.5 `aspect-ratio: 16/9` is on some base `.image-slot__frame` definitions

Some also-pages were built from a template that included `aspect-ratio: 16/9` on `.image-slot__frame`. This crops any image that isn't 16:9. The fix is the `:has(img)` CSS override. Check for this if images appear cropped.

### 9.6 image-pair captions must NOT span columns

**Wrong** (single caption for both images):
```html
<div class="image-slot__caption">
  <span class="number">Fig. 02</span> · Left caption &nbsp;·&nbsp; <span class="number">Fig. 03</span> · Right caption
</div>
```
This stretches the caption text under the wrong image. Looks terrible.

**Right** (each image-pair__item has its own caption, which naturally constrains to that column's width):
```html
<div class="image-pair__item">
  <img ...>
  <div class="image-slot__caption"><span class="number">Fig. 02</span> · Caption only for this image.</div>
</div>
```

### 9.7 Read the actual HTML before making changes

Many bugs in this session came from Claude making assumptions about file structure based on earlier edits. After any modification, always `view` the affected section of the file before making the next change. Stale mental models of file content = broken HTML.

---

## 10. What Prashant Wants / How He Works

Learned from working together this session:

- **He catches everything.** Don't cut corners on visual quality — he will screenshot and show you exactly what's wrong.
- **Screenshots are his primary feedback mechanism.** When something's wrong, he'll send a screenshot. Match what you see in the screenshot to the HTML to diagnose.
- **He knows exactly what he wants.** When he says "Fig 02 and Fig 03 side by side", he means visually side by side with proper layout, not a hack.
- **Cropped images are unacceptable.** Images must show at their natural dimensions. Never force a fixed-height container on a content image.
- **Caption width = image width.** A caption must never be wider than the image it describes.
- **He will not accept half-baked work.** If something isn't right, fix it completely.
- **He tests locally.** He opens the HTML files directly in his browser and screenshots what he sees.
- **He is patient but tracks mistakes.** He kept a mental count of recurring issues. Don't repeat the same mistake twice.
- **He responds well to honesty.** When Claude admits a mistake clearly and fixes it, that's better than deflecting.

---

## 11. Remaining Work

### Profile photo integration (about.html)
`profile-photo.png` exists in images folder but isn't placed in about.html yet. The about page has a sidebar column that's the right place for it.

### Pursuits page images
Three images exist in the images folder: `Tube Stage Image.png`, `Exaltic.png`, `Prajati.png`. These haven't been integrated into `pursuits.html` yet.

### AFCS third image
`afcs-profile-admin.png` (Administration functions page) is in the images folder but not currently displayed. Could replace or supplement `afcs-inbox.png` as Fig 02.

### CV PDF
`cv.html` uses `window.print()` for PDF export. The `cv.pdf` file doesn't exist until Prashant prints to PDF from his browser. The Download PDF button works correctly as-is.

### Deployment
Static site, ready to deploy to Netlify / Vercel / Cloudflare Pages. Point `kashyaprashant.com` at it.

---

## 12. Design System (unchanged — carried forward from Session 6)

### Atelier theme (default)
| Token | Value |
|-------|-------|
| `--plastic-cream` | `#FAF7F0` (background) |
| `--plastic-cream-deep` | `#F2EEE4` (panels) |
| `--plastic-charcoal` | `#1A1814` (primary text) |
| `--ink-mid` | `#4A4640` |
| `--ink-muted` | `#7A756D` |
| `--pixel-red` | `#E8513D` (accent) |
| Display | Fraunces |
| Body | Inter |
| Mono | JetBrains Mono |

### Terminal theme (unlocked via Snake game)
| Token | Value |
|-------|-------|
| bg | `#0A0E0B` |
| text | `#7FDBA8` (phosphor green) |
| accent | `#FF5F5F` |
| All type | JetBrains Mono |

### Critical CSS gotchas (from Session 6, still apply)
1. `.nav__theme-btn` CSS must live in `shared/tokens.css` only — never in page `<style>` blocks
2. Theme guard must stay in `theme.js` (prevents Terminal access before Snake win)
3. Theme button is hardcoded HTML in every nav — not dynamically injected

---

## 13. Session History Summary

| Session | What happened |
|---------|--------------|
| 1 | Identity, positioning, About page directions, Atelier tokens |
| 2 | Case study narratives (4), Also pages (8) built with DRAFT flags |
| 3 | Terminal theme, tokens.css, theme.js, Snake game |
| 4 | Nav cleanup, hardcoded theme button, relative paths |
| 5 | Animation system (5 iterations), reactbits DotField + Threads |
| 6 | Handoff document written |
| 7 | DRAFT flags removed from all 8 also-pages, 28 UI images integrated, image layout system built, Figma button on Project XD |

---

## 14. How To Continue In A New Chat

### First message to new Claude:
> "I'm continuing work on my portfolio. Read this handoff document first, then tell me you understand the image layout system — specifically the difference between image-slot, image-pair, and image-row, and why the container must never close early."

### If making any also-page edits:
1. `view` the file first
2. Make one change at a time
3. `view` the changed section to verify
4. Never trust a Python regex to get HTML nesting right without checking

### If adding more images:
1. Accept them as transparent PNGs from Prashant — don't process backgrounds
2. Copy to `portfolio-package/images/`
3. Reference as `../images/filename.png` from also-pages
4. Use the correct layout pattern (image-slot for single, image-pair for side-by-side)
5. Override `aspect-ratio: 16/9` if the page's base CSS has it

### If Prashant reports full-width image stretching:
The container closed early. Open the HTML, find where `</div>` closed `.container` before the image block, remove the stray closing tag.

### If Prashant reports cropped images:
The `aspect-ratio: 16/9` is constraining the frame. Add the `:has(img)` override CSS (Section 6.1).

---

*Handoff written April 23, 2026 after Session 7. Portfolio is content-complete for the Beyond the Four section. Core case studies (ASAP, UA, XD, Kexplora) remain the primary showcase.*
