// This project ships with local placeholder images in /public/media.
// If you want to replace them with your own curated photos, drop images into /public/media
// using the same naming scheme: img-001.jpg ... img-090.jpg.

import fs from 'node:fs';
import path from 'node:path';

const mediaDir = path.join(process.cwd(), 'public', 'media');

if (!fs.existsSync(mediaDir)) {
  console.error('Missing public/media. Create it first.');
  process.exit(1);
}

const files = fs.readdirSync(mediaDir).filter((f) => /^img-\d{3}\.jpg$/.test(f));
console.log(`Found ${files.length} local images in ${mediaDir}.`);
console.log('Nothing to download by default. Replace the images with your own to fully brand the site.');
