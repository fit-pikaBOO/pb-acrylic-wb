# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PB Acrylic — a static showcase website (digital showroom) for an acrylic products business. Single-page site with product catalog, customization options, gallery, and inquiry flow.

## Tech Stack

- **Vanilla HTML + CSS + JS** — no build tools, no framework, no package manager
- **Tailwind CSS via CDN** (`<script src="https://cdn.tailwindcss.com">`) with custom config inline in `index.html`
- **No backend** — inquiry uses `mailto:` links with pre-filled subject/body
- **Deployment target**: GitHub Pages or GoDaddy (just upload static files)

## File Structure

- `index.html` — entire site (single-page, all sections)
- `css/style.css` — custom styles on top of Tailwind (filter buttons, lightbox, animations, scrollbar)
- `js/main.js` — mobile nav, navbar scroll shadow, product filter, gallery lightbox, fade-in observer
- `images/products/` — product photos (replace placeholders with real images)
- `images/gallery/` — past works photos

## Key Patterns

- **Product cards** use `data-category` attributes for JS filtering (`.filter-btn[data-category]` controls `.product-card[data-category]`)
- **Gallery lightbox** clones gallery item content into the `#lightbox` modal
- **Sections** use `scroll-margin-top: 5rem` to offset for the fixed navbar
- **Tailwind config** is defined inline in `index.html` `<script>` — brand colors (`brand-*`) and accent colors (`accent-*`)
- All placeholder images show colored gradient boxes with instructions on what to replace

## Customization Points

When updating for the actual business:
1. Replace placeholder product/gallery images in `images/`
2. Update contact info in `#contact` section (email, phone, address)
3. Update social media links in the footer
4. Update the `<meta>` tags and `<link rel="canonical">` in `<head>`
5. Update stats in `#about` section (projects delivered, years experience)
6. Email is `Kath@lbtfurparent.com`, location is `LBT`

## Local Development

Open `index.html` directly in a browser — no server required. For live reload during development:
```
npx serve .
```

## Deployment

**GitHub Pages**: Push to a repo, enable Pages from Settings > Pages > main branch.
**GoDaddy**: Upload all files via File Manager or FTP. No build step needed.
