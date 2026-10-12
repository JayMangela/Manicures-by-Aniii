# Manicures by Ani — Polished Lounge Leicester

A luxury, boutique web application for **Manicures by Ani / Polished Lounge**, owned and operated by **Anishka** in Leicester, United Kingdom.

---

## Features Overview

### 1. Editorial Landing Page (`/`)
- **Hero Section**: Responsive intro featuring brand logo, high-contrast typography, and single primary CTA ("Book Appointment").
- **About Ani Section**: Warm, boutique intro highlighting Anishka's 1-on-1 home studio experience in Leicester, UK.
- **Services & Pricing Menu**: Tabbed menu (Hands, Feet, Bundles, Removals) with clear pricing, itemized descriptions, and direct "Book Now" links per treatment.
- **Gallery / Portfolio Showcase**: Mixed media grid featuring real photos and video clips with hover overlays ("Try this now") linking directly to the booking form.
- **Client Testimonials**: Animated review carousel with role badges.
- **FAQ Accordion**: Interactive accordion answering common client questions about BIAB, Gel-X, studio location, prep, and cancellations.

### 2. Multi-Step Interactive Booking System (`/book`)
- **Step 1: Choose Treatments**: Select single or multiple gel treatments across all categories.
- **Step 2: Choose Add-Ons**: Minimal Art, Medium-Heavy 3D/Chrome Art, French Tip Accents, Charms/Rhinestones, Repair, or Removals.
- **Step 3: Date & Time Selector**: Interactive 14-day date grid and time slot picker (10:00 AM, 12:30 PM, 3:00 PM, 5:30 PM).
- **Step 4: Details & Summary**: Customer details (Name, Email, Phone, Instagram, Notes), itemized price receipt, and required policy agreement checkbox.
- **Confirmation Screen**: Displays booking reference code (e.g. `ANI-839201`), appointment receipt, and direct Instagram contact CTA.

### 3. Official Studio Booking Policy (`#policy`)
Strictly matches the official studio guidelines:
- Nail preparation requirements (remove old polish/gel).
- Single guest rule (no extra guests or children).
- Illness & health guidelines.
- Medical disclosures & nail condition rules.
- Custom design communication.
- Work removal policy.
- Punctuality & respect for reserved slots.

### 4. Custom Set Price & Duration Calculator (`/design-calculator`)
- Interactive customization tool allowing clients to choose:
  - Base Service (Natural Gel, BIAB, Polygel, Gel-X)
  - Desired Length (Short, Medium, Long, Extra Long)
  - Nail Shape (Almond, Coffin, Square, Oval, Stiletto)
  - Finish Style (Solid, French, Chrome, Aura)
  - Art Level (Minimal, Medium, Heavy 3D & Charms)
  - Removal Add-on
- Calculates live estimated cost (£) and appointment duration (e.g. `1h 45m`).
- **"Book This Exact Look"** button automatically pre-selects the custom set and opens **Step 3 (Date & Time Selector)** directly!

### 5. Nail Care & Prep Guide (`/care-guide`)
- Pre-appointment checklist (bare nails, oil restrictions, inspo photos).
- Aftercare rules (cuticle oil, cleaning gloves, professional removal).

### 6. Admin Owner Dashboard (`/admin`)
- **Protected Access**: Admin login portal at `/admin/login` (default passcode: `ani2026`).
- **Metrics Dashboard**: Stats cards for Total Bookings, Pending Requests, Confirmed Appointments, and Estimated Revenue.
- **Filter Tabs & Search**: Filter bookings by status (`ALL`, `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`) or search by name, email, phone, or reference code.
- **Action Controls**: Mark appointments as Confirmed/Completed, Cancel bookings, or delete records.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom Design Tokens in `globals.css`
- **Animations**: Framer Motion
- **Data Persistence**: JSON-backed local storage in `src/data/bookings.json` with REST API endpoints at `/api/bookings`
- **SEO**: JSON-LD `BeautySalon` Schema & Meta tags

---

## Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory (refer to `.env.example`):
   ```env
   ARTIST_WHATSAPP_NUMBER=447XXXXXXXXX
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

## Admin Credentials
- **Admin Login Route**: `/admin/login`
- **Default Passcode**: `ani2026`
