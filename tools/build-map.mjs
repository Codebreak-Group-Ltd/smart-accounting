import sharp from 'sharp';

const LAT = 53.522053, LON = -1.621787, Z = 14, T = 256;
const n = 2 ** Z;
const xf = (LON + 180) / 360 * n;
const latRad = LAT * Math.PI / 180;
const yf = (1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2 * n;
const cx = Math.floor(xf), cy = Math.floor(yf);
const R = 2; // grid radius -> 5x5
const x0 = cx - R, y0 = cy - R;
const gridW = (2 * R + 1) * T, gridH = (2 * R + 1) * T;

const UA = 'SAS-website-build/1.0 (https://www.codebreak.co.uk; contact-map, one-off)';
const tiles = [];
for (let gy = 0; gy <= 2 * R; gy++) {
  for (let gx = 0; gx <= 2 * R; gx++) {
    const url = `https://tile.openstreetmap.org/${Z}/${x0 + gx}/${y0 + gy}.png`;
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`tile ${url} -> ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    tiles.push({ input: buf, left: gx * T, top: gy * T });
    await new Promise(r => setTimeout(r, 60));
  }
}
console.log(`fetched ${tiles.length} tiles`);

// Stitch
const stitched = await sharp({ create: { width: gridW, height: gridH, channels: 3, background: '#e8e8e8' } })
  .composite(tiles).png().toBuffer();

// Centre pixel within stitched grid
const centreX = Math.round((xf - x0) * T);
const centreY = Math.round((yf - y0) * T);

// Crop a landscape rectangle centred on the office
const CW = 760, CH = 470;
const left = Math.max(0, Math.min(gridW - CW, centreX - Math.round(CW / 2)));
const top = Math.max(0, Math.min(gridH - CH, centreY - Math.round(CH / 2)));
const pinX = centreX - left; // pin position within cropped image
const pinY = centreY - top;

// Brand grading: gentle desaturation + a soft purple wash for a cool, on-brand look
const graded = await sharp(stitched)
  .extract({ left, top, width: CW, height: CH })
  .modulate({ saturation: 0.62, brightness: 1.02 })
  .toBuffer();

const purpleWash = await sharp({ create: { width: CW, height: CH, channels: 4, background: { r: 90, g: 48, b: 137, alpha: 0.10 } } }).png().toBuffer();

// Branded pin (teardrop): purple body, gold core, soft shadow. Tip at (0, 78) in a 64x82 box.
const PIN_W = 60, PIN_H = 78;
const pinSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PIN_W}" height="${PIN_H}" viewBox="0 0 60 78">
  <defs><filter id="s" x="-40%" y="-30%" width="180%" height="170%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#36184f" flood-opacity="0.45"/></filter></defs>
  <path filter="url(#s)" d="M30 2C15.6 2 4 13.6 4 28c0 18 26 46 26 46s26-28 26-46C56 13.6 44.4 2 30 2Z" fill="#36184f" stroke="#ffffff" stroke-width="2.5"/>
  <circle cx="30" cy="27" r="11" fill="#d4af37"/>
</svg>`;
const pin = await sharp(Buffer.from(pinSvg)).png().toBuffer();

const out = 'src/assets/images/office-map-penistone.webp';
await sharp(graded)
  .composite([
    { input: purpleWash, blend: 'over' },
    { input: pin, left: Math.round(pinX - PIN_W / 2), top: Math.round(pinY - PIN_H) },
  ])
  .webp({ quality: 82 })
  .toFile(out);

const meta = await sharp(out).metadata();
console.log(`map: ${meta.width}x${meta.height}, pin at (${pinX},${pinY})`);
