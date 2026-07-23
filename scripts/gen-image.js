const https = require('https');
const fs = require('fs');
const sharp = require('sharp');

const prompt = process.argv[2];
const size = process.argv[3] || '1536x1024';
const filename = process.argv[4] || 'image.png';

const body = JSON.stringify({ prompt, size, quality: 'medium', filename });
const url = new URL('https://bonza.build/api/websites/22617ebd-320a-4223-b2d6-31e50cf72b66/ai-generate-image');
const options = { hostname: url.hostname, path: url.pathname, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } };

const req = https.request(options, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', async () => {
    try {
      const j = JSON.parse(data);
      if (j.image) {
        const pngName = filename;
        const webpName = pngName.replace(/\.png$/i, '.webp');
        const pngPath = 'public/images/generated/' + pngName;
        const webpPath = 'public/images/generated/' + webpName;
        fs.writeFileSync(pngPath, Buffer.from(j.image, 'base64'));
        await sharp(pngPath).webp({ quality: 82 }).toFile(webpPath);
        fs.unlinkSync(pngPath);
        console.log('Saved: ' + webpPath);
      } else { console.error('Error [' + filename + ']:', j.error || data.slice(0, 200)); }
    } catch (e) { console.error('Parse error [' + filename + ']:', e.message, data.slice(0, 200)); }
  });
});
req.on('error', e => console.error('Req error [' + filename + ']:', e.message));
req.write(body);
req.end();
