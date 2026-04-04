# Omnizentrix — Engineering Digital Intelligence

A modern, futuristic, minimalistic landing page for a premium tech service company. Built with a strict black-and-white monochrome design inspired by Apple, Tesla, and high-end SaaS dashboards.

---

## 🚀 Project Overview

**Company:** Omnizentrix  
**Tagline:** Engineering Digital Intelligence  
**Theme:** Dark mode dominant, black background, white typography, futuristic tech aesthetic  
**Typography:** Space Grotesk + Inter (Google Fonts)

---

## ✅ Completed Features

### Sections
1. **Hero Section** — Full-screen hero with animated particle canvas background, grid overlay, glowing orbs, bold headline, subheadline, and CTA buttons (Get Started / View Services). Includes animated statistics counters.
2. **Services Section** — 4 service cards (Website Development, Database Architecture, System Management & Automation, Cloud & DevOps) with icon, number, features list, and explore link.
3. **About Section** — Company story with animated tech node visualization, rotating rings around logo, and connection lines.
4. **Features Section** — Tabbed interface with 4 features (Fast, Secure, Scalable, Intelligent) each with performance metrics and visual dashboard cards.
5. **Portfolio Section** — 6 project cards with filter buttons (All/Web/Cloud/Database/Automation) and hover overlay with tech stack details.
6. **Testimonials Section** — Auto-sliding testimonial carousel with 5 client reviews, dot navigation, and prev/next controls.
7. **Contact Section** — Minimal form with floating labels, service selector, and success message. Form data is saved to the contacts table via API.

### Design Features
- **Sticky navigation bar** with scroll effect (glassmorphism on scroll)
- **Mobile hamburger menu** with slide-in panel
- **Custom cursor** with hover magnetic effect (desktop only)
- **Page loader** with animated progress bar and logo
- **Scroll progress indicator** (top of page)
- **Particle network canvas** in hero section
- **Grid overlays** on multiple sections
- **Glowing orbs** for ambient lighting
- **Typewriter effect** in hero badge
- **Mouse-tracking card glow** on service cards
- **3D tilt effect** on portfolio and testimonial cards
- **Magnetic button effect** on hover
- **Stats counter animation** (number counting on scroll into view)
- **Intersection Observer** for scroll-triggered animations
- **Smooth scrolling** to all anchor sections
- **Responsive design** — desktop, tablet, mobile

---

## 📁 File Structure

```
index.html              — Main landing page
css/
  └── style.css         — Complete styles (4000+ lines)
js/
  └── main.js           — All interactions & animations
images/
  └── logo.png          — Omnizentrix brand logo
README.md               — This file
```

---

## 🔗 Entry Points

| Path        | Description                  |
|-------------|------------------------------|
| `/`         | Main landing page            |
| `/#services` | Services section            |
| `/#about`   | About section                |
| `/#features` | Features section            |
| `/#portfolio` | Portfolio/Projects section  |
| `/#testimonials` | Testimonials section    |
| `/#contact` | Contact form section         |

---

## 🗄️ Data Models

### `contacts` Table
| Field         | Type      | Description                         |
|---------------|-----------|-------------------------------------|
| `id`          | text      | Unique record UUID                  |
| `name`        | text      | Full name (first + last)            |
| `email`       | text      | Email address                       |
| `company`     | text      | Company name (optional)             |
| `service`     | text      | Service requested (enum)            |
| `message`     | rich_text | Project description                 |
| `submitted_at`| datetime  | ISO timestamp of submission         |

**API Endpoint:** `GET/POST tables/contacts`

---

## 🛠️ Technologies Used

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, animations, Grid, Flexbox, backdrop-filter
- **JavaScript (ES6+)** — Canvas API, IntersectionObserver, requestAnimationFrame
- **Space Grotesk & Inter** — Google Fonts
- **Font Awesome 6** — Icons via jsDelivr CDN
- **RESTful Table API** — Contact form data persistence

---

## 🎨 Design Tokens

| Token         | Value                          |
|---------------|--------------------------------|
| Background    | `#000000`                      |
| Surface       | `#0a0a0a`, `#111111`, `#1a1a1a` |
| Text Primary  | `#ffffff`                      |
| Text Muted    | `#888888`, `#aaaaaa`           |
| Border        | `rgba(255,255,255,0.08)`       |
| Glow Accent   | `rgba(255,255,255,0.15)`       |
| Font          | Space Grotesk, Inter           |

---

## 📝 Recommended Next Steps

1. **Add real project images** to portfolio cards (replace icon placeholders)
2. **Connect contact form** to an email service (e.g., Formspree, EmailJS)
3. **Add a blog section** with tech articles
4. **Implement dark/light toggle** (light mode variant)
5. **Add a pricing section** with tiered plans
6. **Integrate analytics** (Google Analytics / Plausible)
7. **Add more micro-animations** with GSAP for scroll-linked effects
8. **Create individual service pages** for each service offering
9. **Add a team section** with member profiles
10. **Implement a cookie consent** banner for GDPR compliance

---

## 🚀 Deployment

To deploy the website live, go to the **Publish tab** in the project dashboard. The Publish tab will handle all deployment automatically and provide a live URL.

---

*Built with ❤️ for Omnizentrix — Engineering Digital Intelligence*
