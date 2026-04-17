// KenjiAI Disputes Tool — all-in-one server
// Usage: node server.cjs
// Opens at http://localhost:3000

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIST = path.join(__dirname, 'dist');
const GHL_TOKEN = 'pit-424c60f8-0899-4fd5-9845-fde4945ff3f2';
const GHL_HOST = 'services.leadconnectorhq.com';

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

function serveStatic(req, res) {
  let filePath = path.join(DIST, req.url === '/' ? 'index.html' : req.url);
  // Strip query strings
  filePath = filePath.split('?')[0];

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
}

function proxyGHL(req, res) {
  const ghlPath = req.url.replace('/api/ghl', '');

  const options = {
    hostname: GHL_HOST,
    path: ghlPath,
    method: req.method,
    headers: {
      Authorization: 'Bearer ' + GHL_TOKEN,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
    },
  };

  const proxy = https.request(options, (ghlRes) => {
    res.writeHead(ghlRes.statusCode, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    ghlRes.pipe(res);
  });

  proxy.on('error', (err) => {
    res.writeHead(502);
    res.end(JSON.stringify({ error: 'GHL proxy error: ' + err.message }));
  });

  req.pipe(proxy);
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' });
    res.end();
    return;
  }

  if (req.url.startsWith('/api/ghl')) {
    proxyGHL(req, res);
  } else {
    serveStatic(req, res);
  }
});

server.listen(PORT, () => {
  console.log('\n  KenjiAI Disputes Tool');
  console.log('  Open: http://localhost:' + PORT + '\n');
});
