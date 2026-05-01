const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json'); // the JSON you downloaded

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const app = express();
app.use(cors());
app.use(express.json());

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
app.get('/', (req, res) => res.json({ message: 'API is running' }));

// Protected route example
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ uid: req.user.uid, email: req.user.email });
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));