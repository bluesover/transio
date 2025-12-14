#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')

console.log('🔍 Validating SEO Setup for Transio...\n')

const checks = []
let passed = 0
let failed = 0

function check(name, condition, message) {
  const result = {
    name,
    passed: condition,
    message
  }
  checks.push(result)
  
  if (condition) {
    console.log(`✅ ${name}`)
    passed++
  } else {
    console.log(`❌ ${name}: ${message}`)
    failed++
  }
}

const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8')

check(
  'Title Tag',
  indexHtml.includes('<title>') && indexHtml.includes('Transio'),
  'Title tag is missing or incomplete'
)

check(
  'Meta Description',
  indexHtml.includes('name="description"') && indexHtml.match(/content="[^"]{100,}/),
  'Meta description is missing or too short (should be 120-160 chars)'
)

check(
  'Meta Keywords',
  indexHtml.includes('name="keywords"'),
  'Meta keywords tag is missing'
)

check(
  'Canonical URL',
  indexHtml.includes('rel="canonical"') && indexHtml.includes('https://transio.org'),
  'Canonical URL is missing or incorrect'
)

check(
  'Open Graph Tags',
  indexHtml.includes('property="og:title"') && 
  indexHtml.includes('property="og:description"') &&
  indexHtml.includes('property="og:image"'),
  'Open Graph tags are incomplete'
)

check(
  'Twitter Card',
  indexHtml.includes('name="twitter:card"'),
  'Twitter Card meta tags are missing'
)

check(
  'Structured Data',
  indexHtml.includes('application/ld+json') && indexHtml.includes('SoftwareApplication'),
  'Structured data (JSON-LD) is missing'
)

check(
  'Favicon',
  indexHtml.includes('rel="icon"'),
  'Favicon link is missing'
)

check(
  'Manifest',
  indexHtml.includes('rel="manifest"'),
  'Web app manifest link is missing'
)

check(
  'Robots.txt',
  fs.existsSync(path.join(rootDir, 'public', 'robots.txt')),
  'robots.txt file is missing'
)

check(
  'Sitemap.xml',
  fs.existsSync(path.join(rootDir, 'public', 'sitemap.xml')),
  'sitemap.xml file is missing'
)

check(
  'Site Manifest',
  fs.existsSync(path.join(rootDir, 'public', 'site.webmanifest')),
  'site.webmanifest file is missing'
)

check(
  'Favicon SVG',
  fs.existsSync(path.join(rootDir, 'public', 'favicon.svg')),
  'favicon.svg file is missing'
)

check(
  'Security.txt',
  fs.existsSync(path.join(rootDir, 'public', '.well-known', 'security.txt')),
  'security.txt file is missing'
)

console.log('\n' + '='.repeat(50))
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`)

if (failed === 0) {
  console.log('🎉 All SEO checks passed!\n')
  console.log('⚠️  Remember to generate favicon images before deployment:')
  console.log('   - favicon-16x16.png')
  console.log('   - favicon-32x32.png')
  console.log('   - apple-touch-icon.png')
  console.log('   - android-chrome-192x192.png')
  console.log('   - android-chrome-512x512.png')
  console.log('   - og-image.png (1200x630)')
  console.log('   - logo.png\n')
  console.log('📖 See public/README.md for instructions\n')
  process.exit(0)
} else {
  console.log('⚠️  Some SEO checks failed. Please fix the issues above.\n')
  process.exit(1)
}
