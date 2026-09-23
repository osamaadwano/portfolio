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

## Project videos

Put MP4s in [`public/projects/`](public/projects/) and list them in `workBins` in [`src/data/cv.ts`](src/data/cv.ts) (`src` like `/projects/my-clip.mp4`). Large `.mp4` files are gitignored — keep them local for `npm run dev`.

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
