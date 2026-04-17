// GHL proxy server — run with: node proxy.cjs
// Listens on localhost:3001 and forwards to GHL API with auth headers

const http = require('http');
const https = require('https');

const GHL_TOKEN = 'pit-424c60f8-0899-4fd5-9845-fde4945ff3f2';
const GHL_BASE = 'services.leadconnectorhq.com';
const PORT = 3001;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const options = {
    hostname: GHL_BASE,
    path: req.url,
    method: req.method,
    headers: {
      Authorization: 'Bearer ' + GHL_TOKEN,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
    },
  };

  const proxy = https.request(options, (ghlRes) => {
    res.writeHead(ghlRes.statusCode, { 'Content-Type': 'application/json' });
    ghlRes.pipe(res);
  });

  proxy.on('error', (err) => {
    res.writeHead(500);
    res.end(JSON.stringify({ error: err.message }));
  });

  req.pipe(proxy);
});

server.listen(PORT, () => {
  console.log('GHL proxy running at http://localhost:' + PORT);
  console.log('Start your app with: npm run dev');
});
