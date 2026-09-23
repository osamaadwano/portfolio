import { readdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * GitHub Pages is served via git push. Large MP4s often fail
 * (100MB hard limit + flaky pushes). Strip all videos from dist
 * for deploy; they still work with `npm run dev` locally.
 */
const dir = join(process.cwd(), 'dist', 'projects')

try {
  for (const name of readdirSync(dir)) {
    if (!name.toLowerCase().endsWith('.mp4')) continue
    const file = join(dir, name)
    const size = statSync(file).size
    rmSync(file)
    console.warn(
      `[deploy] omitted ${name} (${(size / 1024 / 1024).toFixed(0)}MB) — host clips externally for Pages`,
    )
  }
} catch {
  // no projects folder
}
