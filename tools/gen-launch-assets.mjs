import sharp from 'sharp';

// --- OG default image: brand gradient + reverse logo, 1200x630 JPEG ---
const W = 1200, H = 630;
const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5a3089"/><stop offset="1" stop-color="#36184f"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.1" r="0.9">
      <stop offset="0" stop-color="#d4af37" stop-opacity="0.14"/>
      <stop offset="0.7" stop-color="#d4af37" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="470" y="478" width="260" height="4" fill="#d4af37"/>
</svg>`;
const logo = await sharp('public/logos/logo-reverse.svg', { density: 300 })
  .resize({ width: 560, fit: 'inside' }).png().toBuffer();
const logoMeta = await sharp(logo).metadata();
await sharp(Buffer.from(bg))
  .composite([{ input: logo, left: Math.round((W - logoMeta.width) / 2), top: Math.round((H - logoMeta.height) / 2) - 30 }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile('public/og-default.jpg');
console.log('og-default.jpg written');

// --- apple-touch-icon: 180x180, opaque purple, symbol centred ---
const symbol = await sharp('public/logos/logo-symbol.svg', { density: 300 })
  .resize({ width: 118, height: 118, fit: 'inside' }).png().toBuffer();
const sMeta = await sharp(symbol).metadata();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#36184f' } })
  .composite([{ input: symbol, left: Math.round((180 - sMeta.width) / 2), top: Math.round((180 - sMeta.height) / 2) }])
  .png().toFile('public/apple-touch-icon.png');
console.log('apple-touch-icon.png written');

// --- favicon-32 png fallback ---
const fav = await sharp('public/logos/logo-symbol.svg', { density: 300 })
  .resize({ width: 30, height: 30, fit: 'inside' }).png().toBuffer();
const fMeta = await sharp(fav).metadata();
await sharp({ create: { width: 32, height: 32, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: fav, left: Math.round((32 - fMeta.width) / 2), top: Math.round((32 - fMeta.height) / 2) }])
  .png().toFile('public/favicon-32.png');
console.log('favicon-32.png written');
