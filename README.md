# 🎓 PCU Campus Event Hub – Pimpri Chinchwad University, Pune

> **Official student events, cultural fests, academic symposiums, and digital entry pass management portal for Pimpri Chinchwad University (PCU), Pune.**

[![SSL / TLS 1.3](https://img.shields.io/badge/Security-SSL%20%2F%20TLS%201.3-emerald)](https://pcu.edu.in/)
[![Auth](https://img.shields.io/badge/Auth-Google%20OAuth%202.0-blue)](https://accounts.google.com/)
[![Framework](https://img.shields.io/badge/Framework-React%2019%20%2B%20Vite%208-purple)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38bdf8)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel%20Ready-black)](https://vercel.com/)

---

## 🏛️ 1. Project Overview & Institutional Context

The **PCU Campus Event Hub** is a frontend web application designed specifically for **Pimpri Chinchwad University (PCU)** in Pune, Maharashtra (established by the Pimpri Chinchwad Education Trust – PCET).

It provides students, faculty, and visiting delegates with a unified platform to:
- Browse flagship annual university fests such as **ANANTAM 2026** (Cultural Fest), **PCU National Ideathon & Hackathon** (School of Engineering & Technology), **NAVYOM** (Pune Management School), **KRIDARAMBHA** (Inter-School Sports Meet), and **Design Vista** (Pune Design School).
- Tour official campus facilities from [pcu.edu.in/life-at-pcu/facilities/gallery](https://pcu.edu.in/life-at-pcu/facilities/gallery), including the **Swami Vivekananda Central Library**, **Sports Complex**, **Academic Complex**, and **Hostel Quads**.
- Authenticate via **Google Sign-In / Google Identity Services** to prefill verified student credentials.
- Register for verified student passes with live inventory allocation and dietary preferences.
- Generate an **Official Digital QR Gate Pass** equipped with a scannable barcode and `.ics` / Google Calendar synchronizer.

---

## 🏗️ 2. System Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        User Browser (HTTPS / SSL)                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           Vercel Edge Network                          │
│          • Strict-Transport-Security (HSTS 63072000s)                  │
│          • Automatic SSL/TLS 1.3 Certificate & HTTPS Enforcer          │
│          • Security Headers (X-Content-Type, Referrer-Policy, CSP)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        React 19 SPA Application                        │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │               AuthProvider (Google Identity GIS)               │   │
│   │    • User Session State        • @pcu.edu.in Domain Check      │   │
│   │    • Google One-Tap / OAuth    • LocalStorage Session Cache    │   │
│   └────────────────────────────────┬───────────────────────────────┘   │
│                                    │                                   │
│   ┌────────────────────────────────▼───────────────────────────────┐   │
│   │                     Navbar (Top Bar Contract)                  │   │
│   │    • Brand Lockup     • Nav Links     • Google Auth Action     │   │
│   └────────────────────────────────┬───────────────────────────────┘   │
│                                    │                                   │
│   ┌────────────────────────────────┴───────────────────────────────┐   │
│   │                           Views & Modals                       │   │
│   │  ├─ HeroSection (Featured Event, Campus Visuals, Key Metrics)  │   │
│   │  ├─ EventFilterBar (Categories, Dates, Formats, Availability)  │   │
│   │  ├─ EventCard Grid & Timeline Agenda View                      │   │
│   │  ├─ CampusFacilitiesGallery (Library, Sports, Academic Quad)   │   │
│   │  ├─ RegistrationModal (PRN Verification, Live Capacity)        │   │
│   │  ├─ DigitalTicketPass (Deterministic QR Code, .ICS Exporter)   │   │
│   │  ├─ MyPassesDrawer (Ticket Management & Cancellation)          │   │
│   │  └─ CreateEventModal (Student Society Submissions)             │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 3. Core Student Workflow

```
[Student Visits Portal]
         │
         ▼
[Google Authentication] ──── Optional (Auto-fills PRN & verified @pcu.edu.in email)
         │
         ▼
[Discover Events & Venues]
  ├── Filter by PCU School (SoET, PMS, PDS, SoCA, SoL, SoP, SoS)
  ├── Filter by Date (This Week, This Weekend, November 2026)
  └── Explore Campus Facility Gallery (Swami Vivekananda Library, Sports Complex)
         │
         ▼
[Registration Form Modal]
  ├── Verify Full Student Legal Name & PRN (e.g. PCU2024ENG0142)
  ├── Choose Pass Tier (Complimentary Student Access, Hacker Lab Bench)
  ├── Select Guest Entry (+0 or +1 Colleague)
  └── Choose Catering Dietary Preference (Pure Veg, Jain, Vegan, Halal)
         │
         ▼
[Instant Pass Issuance & Real-time Seat Deduction]
         │
         ▼
[Digital Gate Pass Presentation]
  ├── Live Scannable SVG QR Code (Hashed with PRN & Token)
  ├── Perforated Barcode Strip
  ├── Download Standard .ICS Calendar File
  └── One-Click Sync to Google Calendar
```

---

## 🔐 4. Google Authentication & SSL Layer

### A. Google Identity Services (GIS) Integration
- **Client Script**: Embedded `https://accounts.google.com/gsi/client` in `index.html`.
- **JWT Decoding**: Validates and extracts `name`, `email`, `picture`, and `hd` (hosted domain) claims.
- **University Domain Detection**: Automatically tags university accounts (`@pcu.edu.in`) as official student delegates.
- **One-Click Quick Login**: Preset options for user account `disha.nichite19@gmail.com` and campus workspace profiles.
- **Secure Persistence**: Session cached locally in `pcu_google_auth_user_v1` with logout disposal.

### B. SSL / TLS Security Layer
The application enforces HTTPS and modern SSL transport security:
- **Strict-Transport-Security (HSTS)**: `max-age=63072000; includeSubDomains; preload`
- **X-Content-Type-Options**: `nosniff` (prevents MIME type sniffing)
- **X-Frame-Options**: `SAMEORIGIN` (mitigates clickjacking)
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **Zero-Insecure-Assets**: All image assets, scripts, and fonts load over verified `https://` or local assets.

---

## 🚀 5. Deployment Guide on Vercel

Target Account: **`disha.nichite19@gmail.com`**

The project is pre-configured with `vercel.json` for zero-configuration, production-grade deployment on Vercel.

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Log into Vercel with your email (`disha.nichite19@gmail.com`)**:
   ```bash
   vercel login
   ```
   *Enter `disha.nichite19@gmail.com` and confirm the verification link sent to your inbox.*

3. **Deploy from project root**:
   ```bash
   vercel
   ```
   *Follow the 3 interactive prompts:*
   - `Set up and deploy?` → **Y**
   - `Which scope?` → **Select your personal account (`disha-nichite`)**
   - `Link to existing project?` → **N**
   - `Project name?` → **pcu-campus-event-hub**
   - `Directory?` → **./**
   - `Want to modify settings?` → **N** (Vercel automatically picks up `vercel.json`)

4. **Deploy directly to Production (with SSL enabled)**:
   ```bash
   vercel --prod
   ```

---

### Option 2: Deploy via GitHub & Vercel Dashboard

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: PCU Pune Campus Event Hub with Google Auth and SSL"
   git branch -M main
   git remote add origin https://github.com/<your-username>/pcu-campus-event-hub.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with **`disha.nichite19@gmail.com`**.
   - Click **"Add New Project"** → **"Import Git Repository"**.
   - Select `pcu-campus-event-hub`.
   - Framework Preset: **Vite** (auto-detected).
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click **"Deploy"**.

3. **Automatic SSL / Custom Domain**:
   - Vercel automatically issues and provisions a free **Let's Encrypt SSL/TLS Certificate**.
   - Your live URL will be available at `https://pcu-campus-event-hub.vercel.app`.

---

## 📁 6. Repository File Structure

```
├── .env.example                      # Environment variable templates
├── index.html                        # HTML entry point with Google Fonts & GIS script
├── metadata.json                     # AI Studio application metadata
├── package.json                      # Project dependencies & scripts
├── README.md                         # Documentation & Vercel deployment guide
├── tsconfig.json                     # TypeScript compiler configuration
├── vercel.json                       # Vercel deployment & SSL security headers
├── vite.config.ts                    # Vite build configuration
└── src/
    ├── App.tsx                       # Main Hub layout, filters, and modal coordinator
    ├── main.tsx                      # React root wrapped in AuthProvider
    ├── index.css                     # Tailwind CSS v4 & custom typography
    ├── types.ts                      # Event, Registration, and Pass data interfaces
    ├── assets/
    │   └── images/                   # High-res PCU library, sports & campus assets
    ├── context/
    │   └── AuthContext.tsx           # Google Authentication Context & GIS SDK
    ├── data/
    │   └── initialEvents.ts          # Authentic PCU events, schools, and facilities
    ├── utils/
    │   └── storage.ts                # LocalStorage sync, .ICS generation & Google Cal URLs
    └── components/
        ├── Navbar.tsx                # Top Bar Contract, Google User Pill & SSL Badge
        ├── HeroSection.tsx           # High-impact campus hero, quick filters & stats
        ├── EventFilterBar.tsx        # Category buttons, date filters, view switcher
        ├── EventCard.tsx             # Zero-pill event card with remaining spots
        ├── EventAgendaView.tsx       # Chronological timeline schedule
        ├── EventDetailsModal.tsx     # In-depth event schedule, perks & speaker list
        ├── RegistrationModal.tsx     # Student RSVP form with Google prefill & PRN check
        ├── DigitalTicketPass.tsx     # Authentic student pass with QR code & barcode
        ├── CampusFacilitiesGallery.tsx # Official PCU infrastructure gallery
        ├── CreateEventModal.tsx      # Student society event publishing modal
        ├── MyPassesDrawer.tsx        # Student ticket wallet & cancellation manager
        └── GoogleAuthModal.tsx       # Google Sign-In dialog & account switcher
```

---

## 🛠️ 7. Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Type-check & lint
npm run lint

# 4. Create production build
npm run build
```

---

*Curated for Pimpri Chinchwad University (PCU), Pune · Pimpri Chinchwad Education Trust (PCET).*
