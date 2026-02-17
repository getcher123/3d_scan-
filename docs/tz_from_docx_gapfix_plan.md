# SCAN.LAB: DOCX TZ Gap Fix Plan

Created: 2026-02-17  
Status: in progress

## Goal

Close the gaps listed in `docs/tz_from_docx_gaps_checklist.md` (latest DOCX TZ) by updating the existing static multi-page site in `/mnt/c/3d_scan` without breaking the current UI kit, interactivity, or render/log QA checks.

## Constraints

- [x] No inline `<style>`, `style="..."`, or inline `<script>` in HTML pages.
- [x] Shared styling and interactivity must stay in:
  - `assets/site.css`
  - `assets/tailwind-config.js`
  - `assets/site.js`
- [x] Header and footer must remain identical across all canonical pages.
- [x] Accessibility: correct `button type`, `aria-label` for icon buttons, `label + placeholder + aria-*` for form fields.
- [x] Keep the site static (no server-side code). External integrations (analytics, form endpoint) must be optional/configurable.

## Sources Of Truth

- DOCX TZ (converted): `docs/tz_from_docx.md`
- Gap list: `docs/tz_from_docx_gaps_checklist.md`
- Current SCAN.LAB TZ (newer spec): `docs/scanlab_tz.md` (use only if it does not contradict DOCX TZ)
- Unification rules: `docs/scanlab_unification.md`
- Current inventory: `docs/scanlab_inventory_current.md`
- UI kit pages (shell/component references):
  - `ui-kit-typography.html`
  - `ui-kit-components.html`
  - `ui-kit-blocks.html`
- QA script: `scripts/render-pages.js` and guide `docs/render_pages.md`

## Decision Points (go/no-go)

- [x] D1 Header CTAs: Telegram CTA replaces “Calculate cost” or both (primary + secondary)?
- [x] D2 Final contact data (phone/email/Telegram handle) vs placeholders.
- [ ] D3 Map provider for embed (Yandex / Google / other) and final address coordinates.
- [x] D4 Form “integration” approach:
  - static stub only (shows success, no delivery),
  - configurable HTTP endpoint (webhook),
  - third-party form service (if allowed).
- [x] D5 Analytics IDs availability (Yandex Metrika ID, GA4 Measurement ID) and whether to load analytics on production only.
- [x] D6 Offer page language and legal content source (placeholder vs provided by legal).
- [x] D7 SEO scope: only `meta description` (P0) vs adding OG/canonical/microdata (P2).

## Current Status

- Stage: done
- Owner: user + agent
- Updated (UTC): 2026-02-17 12:41
- Last completed step: 13.2
- Current step: done
- Next step: n/a

## Handoff

- Done:
  - Gap list prepared: `docs/tz_from_docx_gaps_checklist.md`
  - Per-page implementation prompts prepared: `docs/tz_from_docx_page_prompts_en.md`
  - P0: header/footer upgrades + legal links + `offer.html` + meta descriptions.
  - P0: analytics loader + contacts map embed pattern + lead form success/error flow.
  - P1: `index.html` about/social proof/lead magnet.
  - P1: `portfolio.html` standardized case card fields + “What we collect for each case”.
  - P1: `case.html` duration/deliverables + slider instruction + “materials provided / results delivered”.
  - UI kit: synced header/footer and added demos for map/form/lead magnet.
  - QA: UI kit render run: `renders/_ui_kit_check` (totals 0).
  - QA: full render run: `renders/after-docx-gapfix` (totals 0).
  - Docs: updated unification/inventory/gaps checklist docs.
  - VCS: commit `d8a22b6`, branch pushed to origin: `docx-tz-gapfix`.
- Not done:
  - (Optional) Configure production meta values:
    - `scanlab:form-endpoint` (real lead delivery)
    - `scanlab:map-embed-url` (map visible)
    - `scanlab:ya-metrika-id` / `scanlab:ga-id` (enable analytics)
- Blockers:
  - none
- Next command (one):
  - `git status --porcelain=v1`
- Expected result:
  - Working tree clean (no pending changes).

## Checklist

### 0) Baseline (read-only)

- [x] 0.1 Confirm decision points D1–D7 owners and default fallback (placeholders allowed).
- [x] 0.2 Capture baseline renders + browser logs:
  - Command: `node scripts/render-pages.js --out renders/before-docx-gapfix --fail-on-warn --ignore-tailwind-cdn-warning`
- [x] 0.3 Review `renders/before-docx-gapfix/report.json` for any pre-existing issues.
Acceptance criteria:
- Baseline report exists and shows `consoleErrors=0`, `pageErrors=0`, `requestFailures=0`, `httpErrors=0`.

### 1) Preparation

- [x] 1.1 Create working branch (recommended): `docx-tz-gapfix`.
- [x] 1.2 Define the canonical header/footer source page to copy from (recommended: `ui-kit-typography.html` after it is updated).
  - Current source: `index.html` (until UI kit pages are synced in step 11).
- [x] 1.3 Prepare placeholders (if D2 not provided):
  - phone: `+7 (000) 000-00-00`
  - email: `hello@scanlab.example`
  - telegram: `https://t.me/scanlab_support`
Acceptance criteria:
- Single “source snippet” for header/footer is chosen to avoid drift.

### 2) Global Header Upgrade (DOCX TZ P0)

- [x] 2.1 Update header on all canonical pages to include:
  - logo
  - main nav
  - contacts (Telegram/phone/email)
  - primary CTA “Write in Telegram”
- [x] 2.2 Update mobile menu so contacts + Telegram CTA are reachable on touch.
- [x] 2.3 Ensure existing burger logic still works via `assets/site.js`.
Acceptance criteria:
- Header markup is identical across all canonical pages.
- Mobile menu works and contains Telegram CTA.

### 3) Footer Upgrade + Legal Links (DOCX TZ P0)

- [x] 3.1 Add `offer.html` link in the footer (next to `privacy.html`) on all canonical pages.
- [x] 3.2 Update UI kit pages to match the same footer.
Acceptance criteria:
- Footer is identical across canonical pages and includes both Privacy and Offer links.

### 4) Create Missing Page: offer.html (DOCX TZ P0)

- [x] 4.1 Create `offer.html` with canonical shell (same head/header/footer).
- [x] 4.2 Add placeholder legal content sections (until legal text is provided).
- [x] 4.3 Add `meta description`.
Acceptance criteria:
- `offer.html` renders cleanly and is reachable from the footer everywhere.

### 5) SEO: meta descriptions (DOCX TZ P0)

- [x] 5.1 Add `<meta name="description" ...>` to all canonical pages:
  - `index.html`, `services.html`, `process.html`, `portfolio.html`, `case.html`, `contacts.html`, `advantages-faq.html`, `privacy.html`, `offer.html`
- [x] 5.2 Ensure descriptions are page-specific and concise.
Acceptance criteria:
- No pages are missing `meta description`.

### 6) Analytics Integration (DOCX TZ P2)

- [x] 6.1 Implement analytics without inline scripts:
  - create `assets/analytics.js`
  - read IDs from `<meta>` tags
  - do not run on localhost
- [x] 6.2 Add `<script src="assets/analytics.js" defer></script>` on all canonical pages.
- [ ] 6.3 Document configuration pattern in `docs/scanlab_unification.md` (brief).
Acceptance criteria:
- No console errors, and analytics can be disabled by leaving IDs empty.

### 7) contacts.html: Map Embed + Form Success Flow (DOCX TZ P0)

- [x] 7.1 Replace map placeholder with an iframe embed (lazy-loaded, titled).
- [x] 7.2 Align form fields to DOCX TZ minimum:
  - Name (required)
  - Phone/Messenger (required)
  - Comment (optional)
  - Keep extra fields only if they do not confuse the primary path
- [x] 7.3 Implement form submit UX in `assets/site.js` (or a dedicated `assets/forms.js` if needed):
  - disable submit during request
  - configurable endpoint via `<meta>`
  - success state text from DOCX TZ + Telegram fallback link/button
  - error state with Telegram fallback
Acceptance criteria:
- On submit, user sees a success message and can click Telegram fallback.

### 8) index.html: About + Social Proof + Lead Magnet (DOCX TZ P1)

- [x] 8.1 Add a dedicated “About the company” section:
  - explicitly “since 2015”
  - audiences list
  - office/equipment images (placeholders allowed)
- [x] 8.2 Add social proof:
  - “since 2015” badge
  - stats (placeholders until confirmed)
  - logos row (placeholders if needed)
  - optional travel map card (static)
- [x] 8.3 Strengthen/add lead magnet:
  - “Free consultation + help with technical brief”
  - CTA to Telegram and/or `contacts.html#contact-form`
Acceptance criteria:
- No duplicate section IDs; layout remains responsive.

### 9) portfolio.html: Standardize Case Cards (DOCX TZ P1)

- [x] 9.1 Ensure 5–6 featured cases align with DOCX TZ examples.
- [x] 9.2 Standardize visible fields on each case card:
  - title, short description
  - duration (explicit)
  - client/org name if allowed (else NDA)
  - before/after preview where applicable
- [x] 9.3 Add a small note “What we collect for each case” (DOCX TZ list).
Acceptance criteria:
- Portfolio reads as consistent case studies, not just visual tiles.

### 10) case.html: Duration + Deliverables + Slider Instruction (DOCX TZ P1)

- [x] 10.1 Add duration and deliverables/files formats in the hero/top region.
- [x] 10.2 Add a short instruction for the before/after slider.
- [x] 10.3 Add “materials provided / results delivered” section.
Acceptance criteria:
- Case page contains the DOCX-required fields (duration + deliverables) clearly.

### 11) UI Kit Sync

- [x] 11.1 Update `ui-kit-typography.html` shell to the new canonical header/footer.
- [x] 11.2 Update `ui-kit-components.html` demos:
  - map embed card
  - form success state component (visual)
- [x] 11.3 Update `ui-kit-blocks.html` demos:
  - lead magnet block
  - contact form + success state block
Acceptance criteria:
- UI kit pages accurately demonstrate the new shared patterns.

### 12) QA Pass + Documentation Updates

- [x] 12.1 Run full render + logs:
  - `node scripts/render-pages.js --out renders/after-docx-gapfix --fail-on-warn --ignore-tailwind-cdn-warning`
- [x] 12.2 Update docs:
  - `docs/tz_from_docx_gaps_checklist.md` (mark resolved items)
  - `docs/scanlab_inventory_current.md` (new `offer.html`, updated blocks)
  - `docs/scanlab_unification.md` (analytics/form/meta patterns if changed)
Acceptance criteria:
- Render report shows zero errors; docs reflect the new reality.

### 13) Closure

- [x] 13.1 Commit changes with clear message(s).
- [x] 13.2 Push to remote.
- [x] 13.3 Record the final render report path for PR/handoff (PR optional).
Acceptance criteria:
- Changes are versioned and reproducible; QA artifacts are referenced (but not committed).

## Clarifications Needed

1. Map provider (D3)
Reason: Affects embed code, performance, and legal constraints.
Options:
- A (Recommended): Yandex Maps iframe embed.
- B: Google Maps iframe embed.
- C: Keep placeholder (explicitly mark “map optional” and accept partial TZ compliance).

## Execution Log

- 2026-02-17 09:47 UTC: plan created.
- 2026-02-17 10:43 UTC: baseline renders captured: `renders/before-docx-gapfix` (totals 0).
- 2026-02-17 11:10 UTC: created branch `docx-tz-gapfix`.
- 2026-02-17 11:20 UTC: implemented P0 header/footer updates + created `offer.html` + added meta descriptions.
- 2026-02-17 11:35 UTC: added `assets/analytics.js` + contacts form success/error flow + configurable map embed.
- 2026-02-17 12:00 UTC: implemented `index.html` about/social proof/lead magnet blocks (DOCX TZ P1).
- 2026-02-17 12:02 UTC: standardized `portfolio.html` cards fields + added “What we collect for each case” note (DOCX TZ P1).
- 2026-02-17 12:04 UTC: updated `case.html` (duration/deliverables + slider instruction + materials/deliverables section) (DOCX TZ P1).
- 2026-02-17 12:18 UTC: synced UI kit shells + added demos; rendered UI kit pages to `renders/_ui_kit_check` (totals 0).
- 2026-02-17 12:32 UTC: full render run to `renders/after-docx-gapfix` (totals 0).
- 2026-02-17 12:36 UTC: updated docs: `scanlab_unification.md`, `scanlab_inventory_current.md`, `tz_from_docx_gaps_checklist.md`.
- 2026-02-17 12:38 UTC: committed changes: `d8a22b6` (branch: `docx-tz-gapfix`).
- 2026-02-17 12:39 UTC: pushed branch to origin: `docx-tz-gapfix`.
- 2026-02-17 12:39 UTC: final QA report path: `renders/after-docx-gapfix/report.json` (not committed).
- 2026-02-17 12:41 UTC: finalized plan status + handoff notes.
- 2026-02-17 15:06 UTC: post-gapfix UI cleanup: removed “Услуги/Процесс” from global header/footer nav; removed extra pre-footer contact icon strip on `contacts.html`; removed portfolio “Что фиксируем для каждого кейса…” note; removed contacts “Часы работы” block.
