# Build Prompt: "Manicures by Ani — Polished Lounge" Website

You are building a full website (and mobile-responsive web app, not a native app) for a
home-based nail artist called **Anishka**, trading as **Manicures by Ani / Polished
Lounge**, based in **Leicester, United Kingdom**. Read this entire brief before writing
any code. Follow the phased build plan at the end — do not attempt everything in one
pass.

Do not use any emojis anywhere: not in UI copy, alt text, comments, commit messages,
placeholder content, or notification templates. This applies to every phase.

---

## 1. Brand & Content Facts (use exactly this data, do not invent extra services or prices)

**Business name:** Manicures by Ani — Polished Lounge
**Artist name:** Anishka (goes by "Ani")
**Location:** Leicester, United Kingdom — do NOT display a full street address anywhere.
It's fine to say "Leicester, UK — home studio" or "exact location shared on booking
confirmation." Never fabricate or guess an address.
**Instagram:** https://www.instagram.com/manicuresbyaniii (use as a real, clickable
social link/CTA site-wide, e.g. header/footer icon and on the About and Contact areas)
**Email:** none available — do not add an email field, mailto link, or email contact
method anywhere on the site.
**Logo:** provided as an attached image asset (hand holding a nail polish bottle, with
wordmark "Manicures by Ani / Polished Lounge"). Use it in the navbar, favicon, and
footer. Recreate/vectorize if needed for crisp scaling, but keep the linework style and
soft pink accent colour from the logo as the brand accent colour. File: `assets/logo.jpg`.

### 1.0 Asset Manifest (attach this whole `assets/` folder alongside this prompt)

When you paste this prompt into Antigravity, attach the `assets/` folder that
accompanies it (organized and renamed for clarity) so the agent can read the real
files directly rather than guessing from descriptions:

```
assets/
├── logo.jpg                                  → brand logo/wordmark
├── reference/
│   ├── price-list.png                        → source for section 1.1 pricing data
│   └── booking-policy.png                    → source for section 1.2 policy text
└── gallery/
    ├── set-01-halloween-venom.jpg            → Halloween/Venom press-on set
    ├── set-02-white-lace-bridal.jpg          → white lace bridal-style set, rhinestones
    ├── set-03-white-lace-bridal-alt.jpg      → white lace bridal-style set, alt angle
    ├── set-04-dark-textured-snakeskin.jpg    → dark textured "snakeskin" gel-X set
    ├── set-05-maroon-aura-chrome.jpg         → maroon aura/chrome set
    ├── set-06-gold-dot-leopard.jpg           → gold + dot leopard-inspired set
    ├── set-07-pink-chrome-french.jpg         → pink chrome French tips
    ├── set-08-glossy-nude-french.jpg         → glossy nude French tips
    ├── set-09-white-valentine-hearts.jpg     → white Valentine's heart set with pearls
    ├── clip-01.mp4                           → finished-set video clip
    ├── clip-02.mp4                           → finished-set video clip
    └── clip-03.mp4                           → finished-set video clip
```

Use the actual files from `assets/gallery/` as the real portfolio media in the
showcase built in section 1.3/Phase 4 — do not substitute stock photos or placeholder
images for these. Use `assets/reference/price-list.png` and
`assets/reference/booking-policy.png` only as source references to confirm the data
already transcribed in sections 1.1 and 1.2 — do not display these two images
themselves on the live site; the pricing and policy must be built as real HTML/CSS
driven by the transcribed data, not as embedded screenshots.

**Do not use any stock photography, stock video, or generic placeholder imagery
anywhere on the site.** Every photo and video shown to visitors (hero background, about
section, gallery, testimonials avatars if any) must come from the attached
`assets/logo.jpg` and `assets/gallery/` files. If a section genuinely has no matching
asset (e.g. a testimonial avatar), use a simple abstract/initials treatment instead of a
stock photo — never source external imagery.

### 1.1 Services & Price List (source: attached price list image)

Reproduce this exactly as structured, styled content (not a screenshot) — build it as
real HTML/CSS driven by data, not an embedded image.

**Hands**
| Service | Price |
|---|---|
| Dry Manicure | £15 |
| Gel Manicure | £18 |
| Builder Gel (BIAB) / Or Hard Gel | £20 |
| Polygel Overlay | £25 |
| Polygel Extensions (Dual Forms) | £30 |
| Gel-X Full Set (Solid Colour) | £20 |
| Gel-X Full Set (French Tip) | £28 |
| Gel-X Full Set (Minimal Design) | £25 |
| Gel-X Full Set (Medium–Heavy Designs) | £30 |
| Any Service Infills (Only 2–3 Weeks Old) | £20 |

**Feet**
| Service | Price |
|---|---|
| Gel Pedicure | £15 |
| Gel-X Extensions | £28 |

**Bundles & Packages (Best Value)**
| Service | Price |
|---|---|
| Gel Polish Hands & Toes Bundle | £30 |
| Gel-X Hands & Toes Bundle | £40 |
| Gel-X Hands & Gel-X Toes Bundle | £48 |

**Removals**
| Service | Price |
|---|---|
| Single Area Removal — Gel Polish (Hands or Feet) | £2 |
| Single Area Removal — Gel-X (Hands or Feet) | £5 |
| Combined Area Removal — Gel Polish (Hands & Feet) | £5 |
| Combined Area Removal — Gel-X (Hands & Feet) | £5 |

Build this as a filterable/tabbed pricing table (Hands / Feet / Bundles / Removals) with
a clean editorial layout — not a plain default HTML table. Each service row should be
selectable so it can pre-fill the booking form's "service" field when a visitor clicks
"Book this."

### 1.2 Booking Policy (source: attached booking policy image)

Display this in full on the Booking page (e.g. as an expandable "Booking Policy"
section or a required-to-scroll/acknowledge panel before confirming a booking):

- Please remove any old gel, acrylic or nail polish before your appointment unless
  removal has been booked.
- Only one guest is permitted with you. Please do not bring additional people or
  children unless previously agreed.
- Please do not book if you are feeling unwell. If you become sick before your
  appointment, please reschedule.
- Clients must disclose any allergies, sensitivities, medical conditions affecting the
  nails/skin, or previous reactions to nail products before treatment.
- I will not work on nails with active infections, open wounds, contagious conditions or
  severe damage. You may be asked to seek medical advice before booking again.
- I do not work on severely bitten or damaged nails if they are unsuitable for
  treatment.
- Please communicate complicated designs, nail art, extensions or specific requests when
  booking so I can ensure enough time and the correct products are available.
- Nail designs may need to be adjusted or compromised if the requested design is not
  suitable for the available time, nail condition or products.
- Please note that I only remove my own work. Removal of another nail technician's work
  may not be available or may incur an additional charge.
- Your appointment time is reserved specifically for you, so please be respectful of my
  time and arrive prepared.
- By booking an appointment, you confirm that you have read, understood and agreed to
  this booking policy.
- Closing line: "Thank you for respecting my policies and supporting my small business."

Include a required checkbox on the booking form: "I have read and agree to the booking
policy" — booking cannot be submitted unless checked.

### 1.3 Gallery / Previous Work Assets

Assets provided (see the Asset Manifest in section 1.0 — use these actual files, not
placeholders): 9 photographs and 3 short video clips of finished nail sets in
`assets/gallery/`, covering a Halloween/Venom-themed press-on set, white lace bridal-
style nails with rhinestones (two angles), a dark textured "snakeskin" gel-X set, a
maroon aura/chrome set, a gold-and-dot leopard-inspired set, pink chrome French tips,
glossy nude French tips, and a white Valentine's heart set with pearls, plus three
video clips of finished sets in motion.

Build a **modern, immersive showcase/gallery** for these — this is a key differentiator
section, give it real design attention:

- A horizontal or masonry-style scroll gallery (inspired by the editorial feel of
  leoparpeix.com and era-residence.com — large imagery, generous whitespace, subtle
  parallax/reveal-on-scroll, smooth easing — but do not copy their layouts or exact
  effects, use them only as a reference for *quality and mood*).
- Support mixed media: photos and video clips in the same showcase (videos autoplay
  muted/looped on hover or in-view, with sound off by default and a mute/unmute
  control).
- Lazy-load images/video for performance; provide low-res placeholders/blur-up.
- Optional lightbox/expanded view on click/tap.
- Tag or group sets loosely by style (e.g. "Seasonal," "Bridal & Minimal," "Bold &
  Textured," "Chrome & Aura") if it helps browsing, but don't over-engineer a full CMS
  taxonomy for this — a simple front-end filter is enough.
- Must work identically well as a touch-swipe carousel on mobile.

---

## 2. Site Structure (Modular Landing Page)

Build the landing page as composable, modular sections so each can be built and
iterated independently (this also matches the phased build plan below). Sections, in
order:

1. **Hero** — full-viewport intro with the logo/wordmark, a short tagline, scroll cue,
   subtle motion (e.g. soft floating nail-polish or gradient texture, matching the pink
   accent from the logo). Single primary CTA only: "Book an Appointment." Do not add a
   secondary CTA or Instagram link in the hero — keep it clean with one clear action.
   Instagram should only appear in the header/nav icon and the footer (see section 8).
2. **About Ani** — a warm, editorial section about Anishka: who she is, why she loves
   nail art, her approach/style. Since no biographical text was provided, write
   genuine-sounding, warm placeholder copy in first person as a nail artist passionate
   about her craft, clearly marked in code comments as `// PLACEHOLDER — replace with
   Anishka's real bio text`, so it's obvious to swap in real copy later. Include a
   portrait-style layout slot (image can be a placeholder or pulled from the gallery
   set) and a small "As seen on Instagram" strip.
3. **Services & Pricing** — the structured price table from section 1.1.
4. **Gallery / Previous Work** — the showcase described in section 1.3.
5. **Testimonials** — a testimonials carousel/marquee. No real testimonials were
   provided; use 3–4 clearly-marked placeholder quotes (`// PLACEHOLDER — replace with
   real client testimonials`) with generic first names only (no fabricated surnames or
   photos of real people).
6. **Booking CTA / Booking Page** — see section 3.
7. **Policy** — booking policy panel (can live inside the Booking page or as its own
   anchor/section — your call, but it must be easy to find before someone books).
8. **Footer** — logo, Instagram link, Leicester UK (city only, no address), copyright
   line, no email.

The whole page must feel like one continuous, immersive scroll experience with smooth
section transitions — not a stack of disconnected blocks. Use scroll-linked reveal
animations, a persistent/shrinking nav on scroll, and tasteful micro-interactions on
buttons/cards. Keep animations tasteful and performant — prioritise a premium, calm
feel over busy/gimmicky motion.

---

## 3. Booking Page & Flow

- A dedicated booking page (not just a modal) with a clean multi-step or single-page
  form: name, phone number, preferred service (pre-fillable from the pricing table),
  preferred date, preferred time, optional notes, and the required policy-agreement
  checkbox from section 1.2.
- Show available/unavailable feel with a simple calendar/date picker component (does
  not need real-time third-party calendar sync unless you choose to add it in a later
  phase — a simple date+time picker backed by your own bookings database is sufficient
  for v1).
- On submit: create a booking record in the backend, then trigger WhatsApp
  notifications (see section 4).
- Show a clear on-screen confirmation state after submission (not just relying on
  WhatsApp arriving).

---

## 4. Backend & WhatsApp Notifications

You have full discretion on backend architecture — design and implement it so it
actually works end-to-end, not just as UI mockups. Suggested approach (adjust as
needed):

- **Stack:** Next.js (App Router) with API routes / server actions, or a small
  separate Node/Express service if you prefer — your call. Use a real database (e.g.
  SQLite/Postgres via Prisma, or a hosted option like Supabase) to persist bookings,
  not just in-memory state.
- **WhatsApp integration:** use the WhatsApp Business Cloud API (Meta) or Twilio's
  WhatsApp API to send template messages on booking creation:
  - To the **client's** WhatsApp number entered on the form: a confirmation message
    stating the service, date, and time booked.
  - To **Ani's business WhatsApp number** (store this as an environment variable,
    e.g. `ARTIST_WHATSAPP_NUMBER`, do not hardcode a real number in source — leave a
    clearly labeled placeholder for it): a notification that a new client has booked,
    including the client's name, number, service, date and time.
  - Handle the sandbox/template-approval realities of WhatsApp APIs honestly in your
    setup notes (e.g. Twilio sandbox requires the recipient to opt in first, or
    approved message templates are needed for production) — document this clearly for
    Ani rather than silently failing.
  - Wrap all WhatsApp calls in proper error handling so a failed message never blocks
    the booking from being saved.
- Store all secrets/API keys in environment variables with a `.env.example` file — never
  commit real credentials.

---

## 5. Tooling, Skills & Components (required, not optional)

- **Required:** actively use the **UI/UX Pro Max** skill set already installed in this
  environment for every design-system decision (spacing, type scale, motion timing,
  accessibility, component polish). Do not fall back to generic default component
  styling when this skill is available.
- **Required:** actively use the connected **21st.dev MCP server** to source/generate
  UI components (buttons, cards, nav, form inputs, carousels, date pickers, etc.)
  whenever a suitable component exists there, rather than hand-rolling every primitive
  from scratch. Prefer accessible, well-animated components from it that fit the
  brand's soft/editorial aesthetic, and adapt their styling to the 3-colour/3-font caps
  above rather than importing their default palette.
- Recommended frontend stack: Next.js + TypeScript + Tailwind CSS + Framer Motion (for
  section/element animation) + a scroll-driven animation library such as GSAP
  ScrollTrigger or Lenis smooth-scroll for the immersive scroll feel referenced in the
  inspiration sites.
- Fonts: choose a refined serif for headings (editorial, boutique feel) paired with a
  clean sans-serif for body text — similar spirit to the inspiration sites' typography
  pairing, not a copy of their exact fonts.

---

## 6. Design Direction (inspiration, not replication)

Reference these for **mood and craft quality only** — do not copy their layouts,
copy, or exact visual effects:

- https://www.leoparpeix.com/ — editorial pacing, large imagery, confident whitespace.
- https://www.era-residence.com/ — smooth scroll-linked reveals, refined typography.
- The Dribbble "AI-Powered Wine Website" shot — clean modern card/gradient treatment
  and font pairing sensibility.

Translate the *quality bar* (typography, spacing, animation smoothness, restraint) into
something original for a boutique nail-art brand: soft pink/blush accent (pulled from
the logo), warm neutral backgrounds, generous negative space, and nail-art photography
as the hero visual language.

**Strict palette and type limits — do not exceed these:**
- **Colours:** a maximum of 3 colours total across the entire site (e.g. one neutral
  background, one near-black/charcoal for text, and the soft pink accent pulled from
  the logo). Tints/shades (lighter or darker variants of these same 3 for hover states,
  borders, etc.) are fine and don't count as extra colours — but no additional hues.
- **Fonts:** a maximum of 3 font families total (e.g. one serif for headings, one
  sans-serif for body, and — only if genuinely needed — one accent/display font used
  sparingly). Do not exceed 3 anywhere on the site, including the gallery, testimonials,
  or booking form.

---

## 7. Responsiveness Requirement

This is being used as both a website and the primary "app" experience on mobile — there
is no separate native app. Every section, the gallery, the pricing table, and the
booking flow must be fully responsive and touch-friendly (large tap targets, swipeable
gallery, no horizontal overflow, readable type scale) from small phones up through
desktop. Test and adjust breakpoints deliberately rather than relying on default
container behavior.

---

## 8. Phased Build Plan — build in this order, one phase per session/checkpoint

Do not attempt to build everything in a single pass. Confirm each phase is working
before moving to the next, to avoid exhausting the agent context:

- **Phase 0 — Setup:** project scaffold, design tokens (colours, type scale, spacing),
  logo integration, base layout/nav/footer shell, routing structure for all pages.
- **Phase 1 — Hero + Navigation:** build the hero section and global nav with the
  scroll-aware behavior and base motion system.
- **Phase 2 — About Section:** build the About Ani section with placeholder copy
  clearly marked for later replacement.
- **Phase 3 — Services & Pricing:** build the structured, tabbed pricing table from
  section 1.1, wired so items can pass a "selected service" into the booking flow.
- **Phase 4 — Gallery/Showcase:** build the media gallery from section 1.3, including
  photo + video handling, lazy loading, and mobile swipe behavior.
- **Phase 5 — Testimonials:** build the testimonials carousel with placeholder
  content.
- **Phase 6 — Booking Page + Backend + Database:** build the booking form/flow and the
  backend/database to persist bookings.
- **Phase 7 — WhatsApp Notifications:** wire up the WhatsApp Cloud API/Twilio
  integration for both client confirmation and artist notification messages, with
  proper env-based config and error handling.
- **Phase 8 — Policy Integration:** integrate the booking policy panel/checkbox into
  the booking flow.
- **Phase 9 — Responsive QA & Animation Polish:** full pass across breakpoints,
  accessibility check (contrast, focus states, alt text), performance pass on
  images/video, and final scroll-animation polish.
- **Phase 10 — Deployment:** deploy (e.g. Vercel for frontend, hosted DB), set up real
  environment variables, and hand off setup instructions for connecting the real
  WhatsApp Business number and replacing placeholder bio/testimonial copy.

At the start of each phase, briefly restate what was completed in the previous phase
before continuing, so context isn't lost between sessions.
