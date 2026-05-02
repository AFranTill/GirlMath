const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json'); // the JSON you downloaded

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

const { AkahuClient } = require('akahu');

const akahu = new AkahuClient({
  appToken: process.env.AKAHU_APP_TOKEN,
});

const USER_TOKEN = process.env.AKAHU_USER_TOKEN;

// GET /api/accounts — list all connected bank accounts
app.get('/api/accounts', async (req, res) => { //requireAuth
  try {
    const accounts = await akahu.accounts.list(USER_TOKEN);
    res.json(accounts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/transactions — get last 30 days of transactions
app.get('/api/transactions', async (req, res) => { //, requireAuth, 
  try {
    const transactions = [];
    const query = {};

    // Akahu paginates — 100 per page, loop until done
    do {
      const page = await akahu.transactions.list(USER_TOKEN, query);
      transactions.push(...page.items);
      query.cursor = page.cursor.next;
    } while (query.cursor !== null);

    res.json(transactions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Middleware to verify Firebase token
async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Public route
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));

// Protected route example
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ uid: req.user.uid, email: req.user.email });
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));

