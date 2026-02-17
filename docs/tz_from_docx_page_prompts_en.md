# SCAN.LAB — DOCX TZ Gap Fix Prompts (EN)

Date: 2026-02-17  
Source of requirements: `docs/tz_from_docx.md`  
Gap list used: `docs/tz_from_docx_gaps_checklist.md`  
Target repo: `/mnt/c/3d_scan`

Use these prompts as implementation tasks for updating the existing static site so it fully covers the latest DOCX TZ requirements.

## Global / Cross-Page Prompt (P0/P2)

**Files affected (canonical pages):**

- `index.html`, `services.html`, `process.html`, `portfolio.html`, `case.html`, `contacts.html`, `advantages-faq.html`, `privacy.html`
- UI kit pages to keep examples in sync:
  - `ui-kit-typography.html`, `ui-kit-components.html`, `ui-kit-blocks.html`

**Reference (UI kit examples):**

- Header/footer shell is visible on all UI kit pages (top and bottom of each file). Use `ui-kit-typography.html` as the baseline shell reference.

**Prompt:**

You are improving an existing static multi-page SCAN.LAB website. Implement the following cross-page changes while preserving the current dark UI kit style and keeping all pages consistent.

Constraints:

- Do not add inline `<style>`, `style="..."`, or inline `<script>`.
- Keep shared tokens and interactions in `assets/site.css`, `assets/tailwind-config.js`, `assets/site.js` only.
- Keep header and footer identical across all canonical pages.
- Keep semantic HTML and accessibility (`aria-label`, correct `button type`, form labels).

P0: Header must match DOCX TZ

1. Update the header component on **every canonical page** so it contains:
   - Logo (left)
   - Main navigation (center): Services, Process, Portfolio, Contacts
   - Contacts (right): Telegram, phone, email
   - Primary CTA button: **"Write in Telegram"**
2. Decide how to treat the existing CTA **"Calculate cost"**:
   - Option A (recommended): keep it as secondary/smaller CTA (desktop only), while Telegram CTA is primary
   - Option B: move it into the mobile menu only
3. Mobile behavior:
   - Telegram CTA must be accessible on mobile (inside the mobile menu or as a visible button).
   - Ensure burger toggle and menu still work via `assets/site.js`.

P0: Footer must include Offer link

1. Add a new legal page link **"Public Offer / User Agreement"** next to Privacy.
2. Update footer navigation on all canonical pages (and UI kit pages) to include:
   - `privacy.html`
   - `offer.html` (new page to be created; see prompt below)

P0: SEO meta description

1. Add `<meta name="description" content="...">` to all canonical pages.
2. Write page-specific descriptions (1–2 sentences) using natural Russian/English as you prefer, but keep it consistent across the site. Include keywords like “3D scanning”, “3D printing”, “reverse engineering”, “museum digitization” where relevant.

P2: Analytics (Yandex Metrika + Google Analytics)

1. Implement analytics integration without inline scripts:
   - Create a new file (recommended): `assets/analytics.js`
   - This file should read IDs from `<meta>` tags (recommended) so you can configure per environment without editing JS.
     - Example: `<meta name="scanlab:ya-metrika-id" content="00000000">`
     - Example: `<meta name="scanlab:ga-id" content="G-XXXXXXXXXX">`
   - `assets/analytics.js` should inject the required external scripts and initialize them.
2. Include `<script src="assets/analytics.js" defer></script>` in the `<head>` of all canonical pages.
3. Avoid running analytics on `localhost` / `127.0.0.1` by checking `location.hostname`.

QA requirement:

- After changes, run:
  - `node scripts/render-pages.js --out renders/scanlab-docx-gapfix --fail-on-warn --ignore-tailwind-cdn-warning`
- Acceptance: `consoleErrors=0`, `pageErrors=0`, `requestFailures=0`, `httpErrors=0`.

---

## index.html (Home) — Prompt (P1)

**Goal:** Add missing “About the company” and social proof required by DOCX TZ, without breaking the existing SCAN.LAB visual system.

**Prompt:**

Update `index.html` to cover these DOCX TZ blocks:

1. Add a dedicated **"About the company"** section (separate from advantages):
   - Must explicitly mention: “Operating since 2015”.
   - Must list target audiences: private clients, film studios, museums, restorers, manufacturing companies, tailoring workshops.
   - Must include at least 1–2 images (office/equipment). Use high-quality placeholders if real assets are not available.
   - Layout suggestion:
     - 2-column (text + image) on desktop, stacked on mobile.
     - Use existing surfaces and typography tokens (no new color palette).
2. Add a **Social Proof** block (can be merged with About if done cleanly):
   - “Since 2015” badge
   - Stats (placeholders allowed): number of projects, heritage objects digitized, etc.
   - Logos row (placeholder logos if approvals are missing)
   - Optional: “Travel map” as a visual (can be a lightweight SVG or a styled card; keep it static for now)
3. Lead magnet (if not already strong enough):
   - Add/strengthen a section: **"Free consultation + help with technical brief"**
   - Provide CTA to Telegram and/or anchor link to contact form on `contacts.html`

Keep:

- Existing hero and services block (unless you need to rename the primary CTA to “Get consultation”).
- Existing FAQ block.
- All styles via UI kit and shared assets.

Acceptance checks:

- No inline styles/scripts added.
- Section IDs do not conflict (avoid duplicate `id="about"` etc.).

---

## services.html — Prompt

**Goal:** Ensure Services page matches DOCX TZ service list and pricing presentation, and promotes Telegram as primary contact.

**Prompt:**

Update `services.html`:

1. Verify the service cards include the DOCX TZ items and pricing:
   - “3D scanning in office” — **from 3,000 ₽**
   - “On-site 3D scanning” — **from 12,000 ₽**
   - 3D printing — “on request”
   - Additional processing — “on request”
2. Add a small block (or inline note) listing supported file formats: STL, OBJ, FBX (+ “others on request”).
3. Make Telegram the primary contact action:
   - Add a visible “Write in Telegram” CTA near the top and near the pricing request CTA.
4. Add `meta description`.

---

## process.html — Prompt

**Goal:** Align “How we work” to DOCX TZ: 7 stages from need discovery to delivery; keep it clear for non-technical clients.

**Prompt:**

Update `process.html`:

1. Ensure the process section reflects DOCX TZ wording:
   - “From identifying the need to delivering the materials/files.”
   - Keep 7 steps (already present), but adjust microcopy so it is client-friendly.
2. Add a “What you get” summary at the end:
   - Deliverables: 3D files (formats), optional printed items, report/consultation.
3. Add a prominent Telegram CTA.
4. Add `meta description`.

---

## portfolio.html — Prompt (P1)

**Goal:** Portfolio should read as 5–6 clear case studies with consistent fields (photo, description, duration, and optional before/after).

**Prompt:**

Update `portfolio.html`:

1. Ensure the portfolio grid contains at least 5–6 highlighted cases that map to DOCX TZ examples:
   - Triumphal Gate (Moscow)
   - Pushkin Museum
   - Temple in Mstera
   - Car parts (before/after)
   - Mechanical engineering parts
   - (Optional) Suspension bridge / Orangutan case
2. For each case card, standardize visible fields:
   - Case title
   - Short description (1–2 lines)
   - Duration (days/hours) as a consistent “Duration” field
   - Optional client/org name (only if allowed; otherwise “Client: NDA”)
   - Optional before/after preview where it makes sense (at least one card)
3. Add a small “What we collect for each case” note (DOCX TZ list):
   - photo report (process + result)
   - short task description
   - timeline/duration
   - client name if publishable
4. Add `meta description`.

Keep:

- Existing filter UX is fine; do not remove it, but ensure the showcased cases remain easy to understand as “real-world work”.

---

## case.html — Prompt (P1)

**Goal:** Case page should include duration and structured deliverables so it matches DOCX TZ “case study” expectations.

**Prompt:**

Update `case.html`:

1. Ensure the hero/top section includes:
   - Case title
   - Short summary of the task
   - Duration (explicit)
   - Deliverables/files (formats)
   - Optional: client/org name (or NDA)
2. If possible, add a compact “Before/After” explanation text near the slider:
   - “Drag the slider to compare the original photo and the scan result.”
3. Add “materials and results” section:
   - What was provided by the client (photos, access, etc.)
   - What SCAN.LAB delivered
4. Add `meta description`.

---

## contacts.html — Prompt (P0)

**Goal:** Implement the missing functional behavior for the lead form + add a real embedded map.

**Reference (UI kit):**

- Form styling patterns are showcased in `ui-kit-blocks.html` and `ui-kit-typography.html` (inputs/buttons).

**Prompt:**

Update `contacts.html`:

1. Replace the current map placeholder with a real embed:
   - Use a map iframe (Yandex or Google).
   - Add `loading="lazy"` and a sensible `title`.
   - Keep it within the existing card layout (no inline styles).
2. Update the contact form fields to match DOCX TZ minimum:
   - Name (required)
   - Phone / Messenger (required)
   - Comment (optional)
   - You may keep extra fields (service type) but ensure the DOCX minimum is satisfied.
3. Implement form submission behavior (no backend is currently in repo):
   - Add a configurable endpoint URL (via `<meta>` tag is recommended).
   - On submit:
     - Disable the submit button
     - Send the payload via `fetch` (JSON) to the endpoint OR use a stub if endpoint is empty
     - Show a success state with the exact DOCX TZ message:
       - “Thank you for your request! We will contact you shortly. Or write directly in Telegram: [link]”
     - Provide a visible Telegram link button in the success state.
   - On error:
     - Show an accessible error message and keep Telegram fallback visible.
4. Add `meta description`.

Acceptance checks:

- No inline scripts/styles.
- All fields keep `label + placeholder + aria-*`.
- Touch interactions remain usable.

---

## advantages-faq.html — Prompt

**Goal:** Make sure Advantages + Lead Magnet are aligned with DOCX TZ positioning, and Telegram is a primary action.

**Prompt:**

Update `advantages-faq.html`:

1. Ensure the advantages list fully covers DOCX TZ UTP set:
   - Mobility, autonomy, large-scale objects, tech combination, pro equipment, free consultation/help with brief, post-delivery support
2. Add/strengthen the lead magnet block:
   - “Free consultation + help with technical brief”
   - CTA: “Write in Telegram”
3. Add `meta description`.

---

## privacy.html — Prompt

**Goal:** Keep privacy policy page, but connect it with the new Offer page and basic SEO.

**Prompt:**

Update `privacy.html`:

1. Add `meta description`.
2. In the content (or at least in footer), ensure links exist to:
   - `privacy.html` (current page)
   - `offer.html` (new page)

---

## ui-kit-typography.html — Prompt (sync UI kit examples)

**Goal:** Keep UI kit shell examples aligned with the new global header/footer requirements.

**Prompt:**

Update `ui-kit-typography.html`:

1. Replace the header and footer to the **new canonical versions** (with contacts + “Write in Telegram” CTA + Offer link in footer).
2. Add a small “SEO & Analytics” note block in the UI kit page:
   - Show the recommended `<meta name="description">` and analytics `<meta>` config pattern (as code snippet).

---

## ui-kit-components.html — Prompt (sync UI kit examples)

**Goal:** Keep component demos consistent with the updated shell and table wrappers.

**Prompt:**

Update `ui-kit-components.html`:

1. Ensure the page shell (header/footer) matches the updated canonical versions.
2. Add a small demo block for the embedded map card pattern (iframe inside a card), matching `contacts.html`.
3. Add a demo block for the form success state (visual component only), matching `contacts.html`.

---

## ui-kit-blocks.html — Prompt (sync UI kit examples)

**Goal:** Make sure block patterns include the lead magnet and form success state.

**Prompt:**

Update `ui-kit-blocks.html`:

1. Ensure the page shell (header/footer) matches the updated canonical versions.
2. Add/adjust a dedicated “Lead Magnet” block example:
   - “Free consultation + help with technical brief”
   - Primary CTA: “Write in Telegram”
3. Add a “Contact Form + Success State” example:
   - show the form layout
   - show the success message design

---

## Missing Page: offer.html (Public Offer / User Agreement) — Prompt (P0)

**Goal:** Create the missing legal page required by DOCX TZ and link it from the footer everywhere.

**Prompt:**

Create a new canonical page `offer.html` in the repo root:

1. Use the same shell as other pages:
   - Same `<head>` includes (Tailwind CDN + `assets/tailwind-config.js` + fonts + `assets/site.css`)
   - Same `<body>` baseline classes
   - Same header/footer as other pages (with contacts + Telegram CTA)
2. Add `meta description` (example: “Public offer and user agreement for SCAN.LAB services.”).
3. Page content structure:
   - H1: “Public Offer / User Agreement”
   - Short intro paragraph
   - Sections (H2/H3) with placeholder text:
     - Definitions
     - Scope of services
     - Payments and refunds
     - Delivery of digital files
     - Liability
     - Contacts and legal entity details (placeholders)
     - Effective date
4. Add it to the footer links on all canonical pages (next to `privacy.html`).

QA:

- Run render script and ensure no errors.

