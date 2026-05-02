import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import { createClient } from '@supabase/supabase-js';
import { AkahuClient } from 'akahu';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // service_role key, not anon key
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

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
app.get('/api/transactions', requireAuth, async (req, res) => {
  try {
    const transactions = [];
    let cursor = undefined;

    do {
      const page = await akahu.transactions.list(USER_TOKEN, cursor ? { cursor } : {});
      transactions.push(...page.items);
      cursor = page.cursor?.next ?? null; // ✅ safe optional chaining
    } while (cursor);

    res.json(transactions);
  } catch (e) {
    res.status(500).json({ error: e.message }); // ✅ always return JSON
  }
});

// GET /api/payments/transfers — get transfer transactions from Supabase
app.get('/api/payments/transfers', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('id, transaction_date, amount, direction, description, counterparty, transaction_type, user_id')
      .eq('transaction_type', 'TRANSFER')
      .eq('direction', 'credit')
      .order('transaction_date', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Format data for frontend
    const formatted = data.map(transaction => ({
      id: transaction.id,
      name: transaction.counterparty || 'Unknown',
      amount: Math.abs(transaction.amount),
      paid: transaction.direction === 'credit', // credit = money received
      paidDate: transaction.transaction_date ? new Date(transaction.transaction_date).toLocaleDateString('en-NZ', { year: '2-digit', month: 'short', day: 'numeric' }) : null,
      raw: transaction, // Include raw data for debugging
    }));

    res.json(formatted);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Middleware to verify supabase
async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
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

