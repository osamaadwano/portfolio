# Osama Adwan — Portfolio

Cyberpunk / monitor portfolio for video editor **Osama Adwan**.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

```bash
npm run deploy
```

**Repo:** https://github.com/osamaadwano/portfolio  
**Live:** https://osamaadwano.github.io/portfolio/

If the site 404s: **Settings → Pages → Branch: `gh-pages` / `/` (root) → Save**.

Videos are hosted on Supabase (see `workBins` in `src/data/cv.ts`). Local MP4s in `public/projects/` are for dev only and are not pushed to Pages.

## Project videos

- Full-quality: `public/projects/`
- Under 50MB uploads: `public/projects/upload/`

## Opening show

First visit per session: boot → uplink → ID. Skip with **ESC**. Skipped when `prefers-reduced-motion` is on.

## Content

| What | Where |
|---|---|
| CV / copy | [`src/data/cv.ts`](src/data/cv.ts) |
| Work videos | Supabase URLs in `workBins` |
| Intro | [`src/components/OpeningIntro.tsx`](src/components/OpeningIntro.tsx) |

## Design tokens

[`src/index.css`](src/index.css): void black, electric cyan, hot magenta, Orbitron + JetBrains Mono.
