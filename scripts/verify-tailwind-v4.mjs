import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
}

function getMajor(version) {
  const match = String(version).match(/(\d+)/)
  return match ? Number(match[1]) : NaN
}

const pkg = readJson('package.json')
const devDeps = pkg.devDependencies ?? {}

const tailwindVersion = devDeps.tailwindcss
const vitePluginVersion = devDeps['@tailwindcss/vite']

if (!tailwindVersion || !vitePluginVersion) {
  console.error('❌ Missing required Tailwind v4 dev dependencies in package.json')
  process.exit(1)
}

if (getMajor(tailwindVersion) < 4 || getMajor(vitePluginVersion) < 4) {
  console.error('❌ Tailwind packages are not on v4+ in package.json')
  process.exit(1)
}

const viteConfig = fs.readFileSync(path.join(root, 'vite.config.js'), 'utf8')
if (!viteConfig.includes("@tailwindcss/vite") || !viteConfig.includes('tailwindcss()')) {
  console.error('❌ Tailwind Vite plugin is not configured in vite.config.js')
  process.exit(1)
}

const cssEntry = fs.readFileSync(path.join(root, 'src/index.css'), 'utf8')
if (!cssEntry.includes('@import "tailwindcss";')) {
  console.error('❌ src/index.css is missing `@import "tailwindcss";`')
  process.exit(1)
}

console.log('✅ Tailwind v4 configuration check passed')
console.log(`- tailwindcss: ${tailwindVersion}`)
console.log(`- @tailwindcss/vite: ${vitePluginVersion}`)
