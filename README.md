# Pegasus Automation

> One-stop IoT solutions — Responsive landing page built with plain HTML and Tailwind CSS (CDN).

---

## Overview

This repository contains a modern, responsive landing page for **Pegasus Automation**. The page is built using a single HTML file and CSS (via CDN). It includes a lightweight navigation system that uses history API and hash routes to switch between three views (`Home`, `Contact`, `Join`) without page reloads.

**Key goals:**

* Clean, production-ready landing page layout.
* Minimal dependencies (no build step required).
* Mobile-first responsive design using Tailwind.
* Accessible interactive components (forms, navigation, mobile menu).

---

## Features

* Single-file HTML layout with Tailwind CDN
* Light / dark friendly color tokens via Tailwind configuration
* Client-side routing using `history.pushState` + URL hashes
* Responsive navigation with a mobile dropdown menu
* Hero section, About, Services, Partners, Technologies, Footer
* Contact & Join forms wired to FormSubmit (`formsubmit.co`) for quick demo/demo submission
* Partner & service cards with hover interactions and image placeholders

---

## Demo / Preview

To preview the page locally:

1. Save the HTML file as `index.html` in a folder.
2. Open `index.html` in your browser (double-click or `Open with...`).

> No server or build step is required because Tailwind is loaded from CDN.

---

## Tech Stack

* **HTML5** — Markup and structure
* **Tailwind CSS (CDN)** — Utility-first styling
* **Vanilla JavaScript** — Client-side routing, menu toggle, form actions
* **Google Fonts & Material Icons** — Typography and icons

---

## File Structure (recommended)

```
/pegasus-landing
├─ index.html         # Main HTML file (contains the entire landing page)
├─ /Images            # Local images used by the page (logos, hero, cards)
│  ├─ Pegasus_Automation.png
│  ├─ Myosa.png
│  ├─ Aikyam.png
│  └─ ...
└─ README.md
```

> If you're pasting the single HTML file directly to GitHub Pages, keep `index.html` at the repository root.

---

## Setup & Usage

1. Clone or download the repository.

```bash
git clone <your-repo-url>
cd pegasus-landing
```

2. Ensure the `Images` folder contains the required images referenced in the HTML (or update the `src` paths to public image URLs).

3. Open `index.html` in your browser to view the site.

**Optional:** If you prefer a local development server (for nicer URL handling):

```bash
# using Python 3.x
python -m http.server 8000
# then open http://localhost:8000
```

---

## Customization Guide

* **Change brand/logo**: Replace `Images/Pegasus_Automation.png` (and any other images) with your own and keep the file names or update the `src` attribute in the HTML.
* **Update colors**: Edit the `tailwind.config` object near the top of the HTML to change color tokens and typography.
* **Add pages or views**: Duplicate a `.view-section` block and add it to `routeMap`/`idMap` in the JS block so `navigateTo()` can handle it.
* **Forms**: The `action` attribute uses FormSubmit for demo purposes. Replace with your backend endpoint or a serverless function as needed.
* **Fonts & Icons**: Google Fonts and Material Icons are included via `<link>` tags — change or remove as required.

---

## Accessibility & SEO notes

* Use meaningful `alt` attributes for images (some placeholders are already present).
* Ensure form `name` attributes match your backend, and consider adding `aria-*` attributes for dynamic elements (mobile menu, modal states).
* Add meta `description`, Open Graph tags, and structured data if you plan to publish publicly for better SEO.

---

## Contributing

This project is structured as a single-page static site. Contributions are welcome:

* Fix typos, spacing, or small CSS improvements.
* Improve accessibility (ARIA roles, keyboard navigation).
* Replace placeholder images with optimized SVGs or compressed assets.

Open an issue or submit a pull request with a clear description of changes.

---

## License

This repository is provided under the **MIT License**. See the `LICENSE` file for details.

