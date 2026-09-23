# Osama Adwan — Portfolio

Broadcast-monitor portfolio for video editor **Osama Adwan**.

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

Live site: https://vosamaqiadwan.github.io/portfolio/

Videos over 100MB are skipped on deploy (GitHub git limit). They still work locally via `npm run dev`. Host large clips elsewhere and point `src` at the URL if you need them online.
## Opening show

On first load of a browser session, a short cold-open plays (boot → uplink → ID). Skip with **ESC**. Skipped when `prefers-reduced-motion` is on, or if already seen (`sessionStorage` key `osama-intro-seen`).

## Content

| What | Where |
|---|---|
| CV / copy | [`src/data/cv.ts`](src/data/cv.ts) |
| Work videos | `public/projects/` + `workBins` |
| Intro | [`src/components/OpeningIntro.tsx`](src/components/OpeningIntro.tsx) |

## Design tokens

Defined in [`src/index.css`](src/index.css): void black, electric cyan, hot magenta, Orbitron + JetBrains Mono, HUD grids & clipped frames.
