import { defineConfig } from 'vite'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))
const SKIP = new Set(['node_modules', 'dist', 'src', 'public', 'scripts', '.git'])

// Multi-page app: every folder with an index.html becomes a page (/, /about/, /work/orb/ …)
function findPages(dir = root, out = {}) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      if (!SKIP.has(name)) findPages(full, out)
    } else if (name === 'index.html') {
      out[relative(root, dir).replaceAll('\\', '/') || 'main'] = full
    }
  }
  return out
}

// <!-- @include header --> pastes src/partials/header.html (shared topbar, menu, footer…)
const partials = () => ({
  name: 'html-partials',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) =>
      html.replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (_, name) =>
        readFileSync(join(root, 'src/partials', `${name}.html`), 'utf8')
      ),
  },
})

export default defineConfig({
  appType: 'mpa', // unknown URLs 404 instead of falling back to the home page
  plugins: [partials()],
  server: { port: 5173, open: true },
  build: { target: 'es2020', rollupOptions: { input: findPages() } },
})
