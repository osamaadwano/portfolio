import { readdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * GitHub Pages rejects files over 100MB. Drop the full-quality
 * masters in dist/projects/, and keep the compressed copies in
 * dist/projects/upload/ — those are what the site plays.
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
