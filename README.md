# AURELIA — Yoga & Zumba Studio

A **premium, modern, high-converting single-page website** for a Yoga & Zumba wellness centre. Built with a **React + Vite + Tailwind CSS + Framer Motion** frontend and a **Django REST Framework + PostgreSQL-ready** backend.

---

## 🧘 Project Overview

- **Brand**: `AURELIA Yoga & Zumba Studio`
- **Design Aesthetic**: Cinematic, energetic-yet-calming premium wellness brand — deep charcoal/black, warm cream, coral/orange accent, subtle purple gradients, glassmorphism.
- **Typography**: Manrope (display/headings), Inter (body).
- **Frontend Stack**: React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide React, Axios.
- **Backend Stack**: Django 5, Django REST Framework, PostgreSQL-ready (SQLite fallback for local dev), Django Admin with image/video previews, CORS headers, SMTP email service.

---

## 📁 Repository Structure

```
aurelia-jewellery/
├── backend/
│   ├── aurelia_backend/
│   │   ├── settings.py          # Django settings, CORS & Postgres/SQLite config
│   │   ├── urls.py              # Root URL routing & Admin site branding
│   │   └── wsgi.py
│   ├── studio/
│   │   ├── models.py            # SiteSettings, HeroContent, Programs, Trainers, Schedule, Gallery, etc.
│   │   ├── serializers.py       # DRF Serializers
│   │   ├── views.py             # List/detail/enquiry API views
│   │   ├── urls.py              # App API endpoints
│   │   ├── emails.py            # Admin notification & customer acknowledgement emails
│   │   ├── admin.py             # Rich Django admin with previews, fieldsets, filters & search
│   │   └── management/commands/
│   │       └── seed_data.py     # Database seeding command with realistic studio content
│   ├── requirements.txt
│   ├── manage.py
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Hero, About, YogaPrograms, FitnessPrograms, WhyChooseUs,
│   │   │                        # Trainers, Schedule, Gallery, VideoExperience, Testimonials,
│   │   │                        # MembershipPlans, CTASection, ContactSection, MapSection,
│   │   │                        # FloatingContactButtons, Navbar, Footer, Loader...
│   │   ├── services/api.js      # Live Axios client + graceful fallback data
│   │   ├── utils/                # Dynamic Lucide icon map & inline social icons
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
├── start_backend.bat            # One-click start backend (Windows)
├── start_frontend.bat           # One-click start frontend (Windows)
├── build.sh                     # Production build script (Render)
├── render.yaml                  # Render deployment config
└── README.md
```

---

## 🚀 Quick Start Guide

### Option 1: One-Click Batch Scripts (Windows)

1. Double-click `start_backend.bat` to launch the Django REST API on `http://127.0.0.1:8000/`.
2. Double-click `start_frontend.bat` to launch Vite React on `http://localhost:5173/`.

### Option 2: Manual Terminal Startup

#### 1. Backend (Django REST Framework)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate
python manage.py seed_data      # seeds studio content + admin superuser
python manage.py runserver 127.0.0.1:8000
```

By default the backend uses SQLite for zero-config local development. To use **PostgreSQL**, set either:
- `DATABASE_URL=postgres://user:password@host:port/dbname`, or
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`

in `backend/.env`.

#### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173/` in your browser.

---

## 👑 Django Admin Portal

- **URL**: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
- **Username**: `admin`
- **Password**: `admin123`

### What you can manage from the Admin Panel (no frontend code changes needed):
- **Website Settings** — branding (logo/favicon), contact info, WhatsApp/phone/email, opening hours, social links, Google Maps (embed URL, direct link, lat/long) and SEO settings — all in one organized, fieldset-based panel.
- **Hero Section** — headline, subtitle, background video/poster image, CTAs.
- **Hero Stat Cards** — the floating glass stat cards (Yoga Classes, Zumba Sessions, Expert Trainers, Flexible Timings).
- **About Section** — story, collage images, years of experience, happy members, certified trainers, success rate.
- **Yoga Programs** & **Zumba/Fitness Programs** — image, description, duration, level, schedule, price, trainer, ordering.
- **Trainers** — photo, bio, experience, social links.
- **Weekly Schedule** — day, class, time, trainer, total/available seats.
- **Studio Gallery** — images & videos with category tagging (studio/yoga/zumba/event).
- **Short Video Reels** — 10–30s preview videos with poster images.
- **Testimonials** — photo, rating, review, program joined.
- **Membership Plans** — name, price, duration, feature list, highlighted/popular flag.
- **CTA Section** — final call-to-action title, subtitle, background media.
- **Enquiries** — view/manage all contact form submissions with read/unread status.

---

## 🔗 Key Integrations

| Feature | Details |
|---|---|
| **WhatsApp** | Hero, CTA, contact section and floating button all link to `https://wa.me/<number>` with a pre-filled enquiry message, fully editable from Website Settings. |
| **Click-to-Call** | `tel:` links throughout the site open the native dialer on mobile. |
| **Email Enquiry Form** | `POST /api/enquiry/` saves to the Django DB, emails the studio admin, and sends a confirmation email to the customer. |
| **Google Maps** | Interactive embedded map + "Get Directions" button, address & hours managed from admin. |
| **Floating Contact Buttons** | Glassmorphism WhatsApp / Call / Email buttons that glide above the footer, with an expandable mobile-friendly FAB on small screens. |

---

## 🧩 API Endpoints

All endpoints are served under `/api/`:

`settings/`, `hero/`, `hero-stats/`, `about/`, `trainers/`, `yoga-programs/`, `fitness-programs/`, `why-choose-us/`, `schedule/`, `gallery/`, `videos/`, `testimonials/`, `membership-plans/`, `cta/`, `enquiry/` (POST).

The React frontend fetches all of these dynamically on load, with graceful fallback content if the API is unreachable.
