# Rosévia

Rosévia is a fictional, quietly-beautiful women's fashion brand. This repository is the
frontend for the Rosévia website: a minimal, editorial, soft-pink clothing storefront with
a home page, shop page with filtering and sorting, product detail pages, an about page, a
contact page, and a fully interactive shopping bag and wishlist — all running on sample
product data, entirely client-side.

Built with **React 18** and **Vite**, styled with **Tailwind CSS**, icons from
**lucide-react**.

> This is a frontend demo. There is no real payment processing, authentication, database,
> or order fulfillment — those are intentionally left out to be added later.

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer (includes npm)

## Getting started

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) — open it in your browser
to view the site. The dev server supports hot reload, so changes to files in `src/` appear
immediately.

## Building for production

```bash
npm run build
```

This outputs a production-ready static build to the `dist/` folder. You can preview that
build locally with:

```bash
npm run preview
```

## Project structure

```text
rosevia/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx        # The entire Rosévia site (all pages, components, state)
│   ├── main.jsx        # React entry point
│   └── index.css       # Tailwind directives + base styles
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── .gitignore
```

## Notes on assets

Product and editorial photography is loaded directly from Unsplash via hotlinked URLs
(no local image files are required). If you deploy this and want images that don't depend
on an external CDN, download the photos you want to keep and swap the URLs in the `IMG`
object near the top of `src/App.jsx` for local paths (e.g. `/images/hero.jpg` served from
`public/images/`).

## Deployment

This is a static Vite app, so it deploys cleanly to any static host:

- **Vercel**: import the GitHub repo — it auto-detects Vite (build command `npm run build`,
  output directory `dist`).
- **Netlify**: same settings — build command `npm run build`, publish directory `dist`.

No backend, database, or environment variables are required for this version of the site.
