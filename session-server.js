const express = require('express');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.static(__dirname));
app.use(express.json());

let sock;
const storePath = './session';

// Basic home page
app.get('/', (req, res) => {
  res.send(`
    <h1>Session Generator</h1>
    <p><a href="/qr">Get QR Code</a></p>
    <p>Use POST /pair with JSON {"number": "91xxxxxxxxxx"}</p>
    <p><a href="/session">Download creds.json</a></p>
  `);
});

// QR route with simple HTML to display QR as image
app.get('/qr', async (req, res) => {
  if (sock) await sock.logout();
  sock = null;

  const { state, saveCreds } = await useMultiFileAuthState(storePath);
  sock = makeWASocket({ auth: state });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    if (update.qr) {
      const qrImage = await require('qrcode').toDataURL(update.qr);
      res.send(`
        <h2>Scan this QR</h2>
        <img src="${qrImage}" />
        <br><br>
        <a href="/qr">Refresh QR</a>
      `);
    }
    if (update.connection === 'open') {
      res.send('<h2>Connected! Session saved.</h2><a href="/session">Download session</a>');
    }
    if (update.connection === 'close') {
      res.send('<h2>Connection closed. <a href="/qr">Try again</a></h2>');
    }
  });
});

// Pairing code route
app.post('/pair', async (req, res) => {
  let { number } = req.body;
  if (!number) return res.status(400).json({ error: 'Phone number is required' });

  number = number.replace(/[^0-9]/g, '');
  if (!number.startsWith('+')) number = `+${number}`;

  if (sock) await sock.logout();
  sock = null;

  const { state, saveCreds } = await useMultiFileAuthState(storePath);
  sock = makeWASocket({ auth: state, printQRInTerminal: false });
  sock.ev.on('creds.update', saveCreds);

  try {
    const code = await sock.requestPairingCode(number);
    res.json({ code, message: `Pairing code: ${code}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get session creds.json
app.get('/session', async (req, res) => {
  const fullPath = path.join(__dirname, storePath, 'creds.json');
  if (fs.existsSync(fullPath)) {
    res.download(fullPath, 'creds.json');
  } else {
    res.status(404).json({ error: 'No session found. Scan QR or pair first.' });
  }
});

app.listen(3000, () => {
  console.log('Session generator running on port 3000');
  console.log('Visit /qr for QR code');
});
