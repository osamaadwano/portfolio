import { readdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'

/** GitHub rejects files >= 100MB over git (gh-pages). */
const MAX_BYTES = 100 * 1024 * 1024
const dir = join(process.cwd(), 'dist', 'projects')

try {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name)
    const size = statSync(file).size
    if (size >= MAX_BYTES) {
      rmSync(file)
      console.warn(
        `[deploy] skipped ${name} (${(size / 1024 / 1024).toFixed(0)}MB) — GitHub file limit is 100MB`,
      )
    }
  }
} catch {
  // no projects folder in dist
}
