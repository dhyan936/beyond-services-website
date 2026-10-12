# Beyond Service — implementation status

Updated 2026-10-12. Direction: **Ink & Gold v2**. Nothing has been deployed.

---

## 0. Ink & Gold v2 restyle (2026-10-12)

- **Palette** now matches the live site's own stylesheet: ink `#0E0D0B`, ivory `#FAF8F3`, cream `#F3EFE6`, gold `#B8973A` / `#D4AF5A` / `#E8D89A`. Accent text on light grounds uses the darkened gold `#7A5F1C` (5.7:1).
- **Type**: Bebas Neue (hero, page titles, numerals, ticker, footer wordmark), Oswald (headings, eyebrows, nav, buttons), Poppins (body). Cormorant Garamond, DM Sans, Source Serif 4 and IBM Plex Sans removed.
- **The `/services` freeze is lifted.** `data-legacy-theme` and every rule keyed to it are gone, so the service pages share the one system. Section 4 below records the pre-v2 baseline and is now historical.
- **New**: `ServiceTicker` band under the hero, outline wordmark in the footer, sweep-fill button hovers. Home Services and Projects sections now sit on ink.
- **Fixed**: header nav links were ink-on-ink over the hero (the header did not take the dark tokens).


## 1. Completed pages and routes

| Route | Status | Notes |
|---|---|---|
| `/` | Live | Homepage, unchanged this session except shared tokens and footer |
| `/about` | Live | Unchanged this session except shared tokens and footer |
| `/services` | **Protected — unchanged** | Frozen to its pre-reconstruction appearance |
| `/services/:slug` ×9 | **Protected — unchanged** | `civil-project-rm`, `mep`, `elv`, `civil-interior`, `cooling`, `fire-safety`, `industrial-equipment`, `logistics`, `project-management` |
| `/get-quote` | Live | Unchanged; its form now shares `lib/forms.js` |
| `/industries` | **New** | Six sectors, each linking to the relevant service pages |
| `/projects` | **New** | Four published entries; honest note; no fabricated case studies |
| `/contact` | **New** | Three contact routes, the shared quote form, hours, map |
| `/vendor-registration` | **New** | Full application form with consent |
| `/team` | **New** | The nine supplied names only; titles/photos flagged pending |
| `/privacy` | **New** | Marked DRAFT; describes only verifiable site behaviour |
| `/terms` | **New** | Marked DRAFT; three clauses left explicitly open |
| `/projects/:slug` ×4 | Live | Existing "coming soon" view, unchanged |

**No URL was renamed.** The design system proposes `/services/civil-rm` and `/services/cooling-systems`; the repository uses `/services/civil-project-rm` and `/services/cooling`. Renaming would break existing links for no user benefit, so the repository URLs stand.

---

## 2. Changed files

**New pages** — `IndustriesPage`, `ProjectsPage`, `ContactPage`, `VendorRegistrationPage`, `TeamPage`, `LegalPage` (shared by `/privacy` and `/terms`), each with its own CSS.

**New shared code**
- `src/lib/forms.js` — one definition of valid email/phone/number and of the email handover, used by both forms.
- `src/components/ui/HonestForm.{jsx,css}` — the form component. Named for its one rule: with no endpoint configured the success state is unreachable.

**Edited**
- `src/content/site.js` — added `INDUSTRIES_PAGE`, `PROJECTS_PAGE`, `CONTACT_PAGE`, `VENDOR_PAGE`, `TEAM_PAGE`, `PRIVACY_PAGE`, `TERMS_PAGE`; added `team`, `privacy`, `terms` to `LINKS` and `ROUTES`; added Vendor Registration and Team to the footer's company column and a `legalLinks` row.
- `src/App.jsx` — registered seven routes.
- `src/components/layout/Footer.{jsx,css}` — legal-link row in the bottom bar.
- `src/components/ui/SectionIntro.css` — added a `centre` alignment. Additive: nothing that existed before used it.
- `src/sections/Contact/QuoteForm.jsx` — now imports the shared validators instead of its own copies. Behaviour identical.

---

## 3. Tests actually executed

All run on this machine against `localhost:5173`, Playwright driving Microsoft Edge.

| Test | Result |
|---|---|
| `npm run lint` | Pass. **2 pre-existing warnings**, both `src/router/router.jsx` fast-refresh, present before this session. **0 new.** |
| `npm run build` | Pass, 1.28s. CSS 132.65 kB (gzip 20.78), JS 541.19 kB (gzip 162.14). |
| Content + structure, 7 new pages | All pass: exactly one `<h1>`, no broken images, no `href="#"`, no placeholder text. |
| Overflow at 1440 / 1024 / 768 / 430 / 375 | **Clean at every width on every new page.** |
| Console errors | **Zero**, across every page and every viewport. |
| Vendor form — empty submit | 8 errors raised, focus moved to the first invalid field, **0 false success**. |
| Vendor form — bad types | `email`, `years` (non-numeric) and unticked `consent` each rejected individually. |
| Vendor form — valid submit | Handoff shown, **0 false success**, `mailto:connect@beyondservice.co.in` prefilled. |
| Contact form — empty submit | 6 errors, focus to first field, **0 false success**. |
| Contact page links | 6 `tel:`, 4 `mailto:`, map link present. |
| Keyboard + labels (vendor) | 59 focusable elements, **0 unlabelled**. |
| Reduced motion | All 6 industry cards at opacity 1 — reveals never trap content. |
| Direct load + refresh, 7 routes | Same `<h1>` before and after reload on all 7. |
| Back / forward | 3-step trail, two backs and one forward all resolve and re-render. |
| All internal links from home | 24 checked, all resolve to a real page with one `<h1>`. |
| Contrast (computed, bg resolved up the tree) | **0 below WCAG AA** across all 7 new pages (172 text styles). |

---

## 4. Protected-page comparison

Baseline: `.qa/brief-pages_services.png` and `.qa/brief-pages_services_mep.png`, captured before any of this work.

| | Baseline | Now | Verdict |
|---|---|---|---|
| `/services` height | 2847px | **2847px** | identical |
| `/services/mep` height | 4523px | **4523px** | identical |
| Body font | IBM Plex Sans | IBM Plex Sans | identical |
| Page background | `rgb(10,11,12)` | `rgb(10,11,12)` | identical |
| `h1` | Source Serif 4, 60px, 450 | same | identical |
| CTA | 14px / 600 / uppercase / 2px radius / ivory | same | identical |
| Card name | Source Serif 4, 25.92px, 500 | same | identical |
| Pixel diff | — | 0.627% / 0.073% | see below |

The residual pixels are the two new footer legal links, which the brief asked to be linked from the footer, plus text antialiasing. No layout, height, type or colour on either page changed.

**A regression was found and fixed during this work.** Adding the footer legal row made every page 7px taller, including the protected ones: the `<li>` elements took their line box from the footer's 16px body size rather than the 12px links inside them. Making each link `display: block` removes the list item's own strut, so the row is exactly as tall as its text under both the current and the frozen theme. Heights were re-measured after the fix and match the baseline exactly.

---

## 5. Outstanding — assets

- **Client logos.** None supplied. The homepage strip runs on eight labelled placeholders. Send SVG or transparent PNG.
- **Team photographs.** None supplied. `/team` shows names and codes only.
- **Project photography.** None supplied. `/projects` uses drawn figures, never stock imagery standing in for real work.
- **Founder signature.** In use on Home and About. The design system asks for explicit approval to publish it, plus an attribution line. Not confirmed.
- **Map static fallback.** The design system asks for a pre-rendered PNG behind the embedded map. Not supplied; the map link works regardless.

## 6. Outstanding — approvals and facts

- **Overview video.** `vZE0j_WCRvI` is a third-party film ("What does a consultant actually do?", channel *Good Work*). The site labels it "Beyond Service — Company Overview". **Either supply the real film or change the label** — this is the most visible untrue statement on the site.
- **Business hours conflict.** The site publishes Mon–Sat 09:30–18:30. The design system says 09:00–18:00 and labels `+91 97260 07759` as 24/7. Neither is confirmed. The published hours are used; no 24/7 claim is made anywhere.
- **Response-time commitments.** The design system states "within 1 business day" and "within 7 business days" and marks both VERIFY. **Not published.** The vendor process steps appear without timings.
- **Dedicated inboxes.** `vendors@` and `careers@` are both unconfirmed. Everything routes to `connect@beyondservice.co.in`; `/team` says so in plain text.
- **Project case studies.** Client permission, photography, confirmed scope/duration, and any publishable outcome figures are all required before the four entries can become real case studies. `/projects` lists these on the page itself.
- **Testimonials.** Still none published. Written permission from each quoted individual is required.

## 7. Outstanding — backend

Neither form can submit. Both validate fully, then hand off to the visitor's own mail client and say so; neither ever shows a success message.

To make submission real:
1. Provide an endpoint accepting `POST` with a JSON body.
2. Set `QUOTE_FORM.endpoint` and `VENDOR_PAGE.form.endpoint` in `site.js`. The success and failure states are already wired — only a 2xx is treated as success.
3. For vendor **document upload**, provide object storage with virus scanning. The field is deliberately absent; a file input that silently drops the file is worse than none. The form tells applicants documents are requested at screening.
4. Add server-side validation, an idempotency key, and a confirmation email.

No secret, key or credential appears anywhere in the frontend.

## 8. Outstanding — legal

`/privacy` and `/terms` are **drafts** and say so at the top of each page. They describe only what the site verifiably does: two forms that validate in-browser and hand off to email, no cookies set by this site, no analytics, and a YouTube embed that is not requested until someone presses play.

Three items are rendered as explicit open items rather than filled with boilerplate:
- Retention period for enquiry and vendor correspondence.
- Limitation of liability.
- Governing law and jurisdiction.

No compliance claim and no legal review is asserted. Both pages are linked from the footer; remove those links if Beyond Service would rather hold them back until review.

---

## 9. Blockers to production readiness

1. **The video label is untrue.** Fix before any launch.
2. **No form backend.** Enquiries depend on the visitor sending the prepared email themselves.
3. **Legal pages unreviewed**, with three clauses unwritten.
4. `/privacy` and `/terms` publication is Beyond Service's call.
5. `/team` publishes names without the individual consent the design system asks for. The names were supplied directly by Beyond Service and are already on the homepage, so this is consistent with what is live — but consent should be confirmed.
