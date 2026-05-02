// ============================================================
//  Flat Account — Akahu JSON Importer for Supabase
//
//  Requires: @supabase/supabase-js dotenv
//  Install:  npm install @supabase/supabase-js dotenv
//
//  Usage:    node import.js ./example.json
//
//  Env vars:
//    SUPABASE_URL              — your Supabase project URL
//    SUPABASE_SERVICE_ROLE_KEY — service role key (for writes)
// ============================================================

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";
import { AkahuClient } from "akahu";

// ------------------------------------------------------------
//  Supabase client
// ------------------------------------------------------------
const SUPABASE_URL = process.env.SUPABASE_URL || "https://fklqqjwvfjjasthdayln.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "sb_publishable_kIugdb86aF-_-FZnuu0vgA_uvMyz8y8";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ------------------------------------------------------------
//  Akahu client
// ------------------------------------------------------------
const akahu = new AkahuClient({
  appToken: process.env.AKAHU_APP_TOKEN,
});

const AKAHU_USER_TOKEN = process.env.AKAHU_USER_TOKEN;

if (!process.env.AKAHU_APP_TOKEN) {
  console.warn("⚠️   AKAHU_APP_TOKEN not set in .env");
}

if (!AKAHU_USER_TOKEN) {
  console.warn("⚠️   AKAHU_USER_TOKEN not set in .env");
}

// ------------------------------------------------------------
//  Fetch transactions from Akahu API
// ------------------------------------------------------------
async function fetchAkahuTransactions() {
  if (!AKAHU_USER_TOKEN || !process.env.AKAHU_APP_TOKEN) {
    console.error("❌  Missing AKAHU credentials:");
    console.error("    AKAHU_APP_TOKEN:", process.env.AKAHU_APP_TOKEN ? "✓ set" : "❌ missing");
    console.error("    AKAHU_USER_TOKEN:", AKAHU_USER_TOKEN ? "✓ set" : "❌ missing");
    console.error("\n   Add these to your .env file in the backend/ folder");
    process.exit(1);
  }

  console.log("📡  Fetching transactions from Akahu API...");
  console.log("    Using AKAHU_APP_TOKEN:", process.env.AKAHU_APP_TOKEN?.substring(0, 10) + "...");
  console.log("    Using AKAHU_USER_TOKEN:", AKAHU_USER_TOKEN?.substring(0, 10) + "...\n");
  
  const transactions = [];
  let cursor = null;

  try {
    let count = 0;
    do {
      const options = cursor ? { cursor } : {};
      const page = await akahu.transactions.list(AKAHU_USER_TOKEN, options);
      transactions.push(...page.items);
      cursor = page.cursor?.next || null;
      count += page.items.length;
      if (count >= 10) break; // Limit to 10 for testing
    } while (cursor !== null);

    return transactions;
  } catch (err) {
    console.error(`❌  Akahu API error: ${err.message}`);
    console.error("\n   This usually means:");
    console.error("   - Invalid AKAHU_USER_TOKEN or AKAHU_APP_TOKEN");
    console.error("   - The Akahu API is unreachable");
    console.error("   - Your credentials have expired");
    console.error("\n   Response details:", err.response?.status || "No response");
    process.exit(1);
  }
}

// ------------------------------------------------------------
//  Parse the counterparty name and reference code from a
//  transfer description.
//
//  Examples:
//    "TRANSFER FROM A F TILL - 03"  →  { counterparty: "A F Till", referenceCode: "03" }
//    "TRANSFER TO A F TILL - 07"    →  { counterparty: "A F Till", referenceCode: "07" }
//    "PAY KESI TOBECK"              →  { counterparty: "Kesi Tobeck", referenceCode: null }
// ------------------------------------------------------------
function parseTransferDescription(description) {
  // Pattern: TRANSFER FROM/TO <NAME> - <CODE>
  const transferPattern = /TRANSFER\s+(?:FROM|TO)\s+([A-Z\s.]+?)\s*-\s*(\d+)\s*$/i;
  const transferMatch = description.match(transferPattern);
  if (transferMatch) {
    return {
      counterparty: toTitleCase(transferMatch[1].trim()),
      referenceCode: transferMatch[2].trim(),
    };
  }

  // Pattern: PAY <NAME>
  const payPattern = /^PAY\s+(.+)$/i;
  const payMatch = description.match(payPattern);
  if (payMatch) {
    return {
      counterparty: toTitleCase(payMatch[1].trim()),
      referenceCode: null,
    };
  }

  return { counterparty: null, referenceCode: null };
}

function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

// ------------------------------------------------------------
//  Look up a user_id by matching the last name from the
//  counterparty string (e.g. "A F Till" → match Lname = "Till")
// ------------------------------------------------------------
async function findUserId(counterparty) {
  if (!counterparty) return null;

  // Extract the last word as the surname
  const parts = counterparty.trim().split(/\s+/);
  const lastName = parts[parts.length - 1];

  const { data, error } = await supabase
    .from("Users")
    .select("user_id")
    .ilike("Lname", lastName)
    .limit(1)
    .single();

  if (error || !data) return null;
  return data.user_id;
}

// ------------------------------------------------------------
//  Map one Akahu transaction item → a DB row object
// ------------------------------------------------------------
async function mapTransaction(item) {
  const amount = parseFloat(item.amount);
  const direction = amount >= 0 ? "credit" : "debit";

  // Only parse counterparty/reference for TRANSFER and PAYMENT types
  let counterparty = null;
  let referenceCode = null;
  if (item.type === "TRANSFER" || item.type === "PAYMENT") {
    ({ counterparty, referenceCode } = parseTransferDescription(item.description));

    // PAYMENT type: also check meta.reference for the name
    if (!counterparty && item.meta?.reference) {
      counterparty = toTitleCase(item.meta.reference);
    }
  }

  // Look up user_id from the Users table by last name
  const userId = await findUserId(counterparty);

  return {
    akahu_id:         item._id,
    akahu_hash:       item.hash,
    transaction_date: item.date,
    description:      item.description,
    amount,
    balance:          item.balance != null ? parseFloat(item.balance) : null,
    transaction_type: item.type,
    direction,
    counterparty,
    reference_code:   referenceCode,
    merchant_name:    item.merchant?.name ?? null,
    merchant_website: item.merchant?.website ?? null,
    category_name:    item.category?.name ?? null,
    category_group:   item.category?.groups?.personal_finance?.name ?? null,
    meta:             Object.keys(item.meta ?? {}).length > 0 ? item.meta : null,
    user_id:          null,   // matched from Users table by last name, or null
    bill_id:          null,     // assigned manually in your app later
  };
}

// ------------------------------------------------------------
//  Main import function
// ------------------------------------------------------------
async function importTransactions(source) {
  let items;

  // Determine source: 'akahu' or file path
  if (source === 'akahu' || source === '--akahu') {
    items = await fetchAkahuTransactions();
  } else {
    // Treat as file path
    const absolutePath = resolve(source);
    console.log(`📂  Reading: ${absolutePath}\n`);

    let parsed;
    try {
      parsed = JSON.parse(readFileSync(absolutePath, "utf-8"));
    } catch (err) {
      console.error(`❌  Could not read/parse JSON file: ${err.message}`);
      process.exit(1);
    }

    // Akahu wraps items in { success, items: [...] }
    items = parsed.items ?? parsed;
  }

  if (!Array.isArray(items) || items.length === 0) {
    console.error('❌  Expected a JSON object with an "items" array, or a raw array.');
    process.exit(1);
  }

  console.log(`🔢  Found ${items.length} transaction(s) to process.\n`);

  const rows = [];
  const errors = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    try {
      if (!item._id || !item.date || item.amount === undefined || !item.description || !item.type) {
        throw new Error("Item missing required fields (_id, date, amount, description, type).");
      }
      const row = await mapTransaction(item);
      rows.push(row);
    } catch (err) {
      errors.push({ index: i, id: item._id ?? "unknown", error: err.message });
    }
  }

  if (errors.length > 0) {
    console.warn(`⚠️   Skipped ${errors.length} row(s) due to errors:`);
    errors.forEach(({ index, id, error }) => {
      console.warn(`    Row ${index} (${id}): ${error}`);
    });
    console.warn();
  }

  if (rows.length === 0) {
    console.error("❌  No valid rows to insert.");
    process.exit(1);
  }

const { data, error } = await supabase
    .from("transactions")
    .insert(rows)
    .select();

  console.log("Rows returned after insert:", data?.length ?? 0);
  console.log("Error:", error);

  if (error) {
    console.error("❌  Supabase error:", error.message);
    console.error("Error details:", error);
    console.error("First 5 imported rows:", JSON.stringify(rows.slice(0, 5), null, 2));
    console.error("First 5 Akahu items:", JSON.stringify(items.slice(0, 5), null, 2));
    process.exit(1);
  }

  // Summary
  const credits   = rows.filter((r) => r.direction === "credit");
  const debits    = rows.filter((r) => r.direction === "debit");
  const transfers = rows.filter((r) => r.transaction_type === "TRANSFER");
  const matched   = rows.filter((r) => r.user_id !== null);
  const unmatched = rows.filter((r) => r.transaction_type === "TRANSFER" && r.user_id === null);

  console.log(`✅  Inserted/upserted ${rows.length} transaction(s):`);
  console.log(`    💚 ${credits.length} credits  |  🔴 ${debits.length} debits`);
  console.log(`    🔄 ${transfers.length} flat transfers`);
  console.log(`    👤 ${matched.length} matched to a user  |  ❓ ${unmatched.length} unmatched\n`);

  if (unmatched.length > 0) {
    console.log("⚠️   Could not match these transfers to a user (check spelling in Users table):");
    unmatched.forEach((t) => {
      console.log(`    ${t.description}  →  counterparty: "${t.counterparty}"`);
    });
    console.log();
  }

  if (transfers.length > 0) {
    console.log("📋  Flat transfers in this import:");
    transfers.forEach((t) => {
      const sign = t.direction === "credit" ? "+" : "-";
      const date = new Date(t.transaction_date).toLocaleDateString("en-NZ");
      const user = t.user_id ? `user_id: ${t.user_id}` : "no user match";
      console.log(`    ${date}  ${sign}$${Math.abs(t.amount).toFixed(2).padStart(7)}  ${t.description}  (${user})`);
    });
  }
}

// ------------------------------------------------------------
//  Test mode: just fetch Akahu and log
// ------------------------------------------------------------
async function testAkahuFetch() {
  console.log("🧪  Testing Akahu fetch...\n");
  const transactions = await fetchAkahuTransactions();
  console.log(`✅  Fetched ${transactions.length} transactions\n`);
  console.log("📋  First 5 transactions:");
  console.log(JSON.stringify(transactions.slice(0, 5), null, 2));
}

// ------------------------------------------------------------
//  Test mode: just fetch from Supabase and log
// ------------------------------------------------------------
async function testSupabaseFetch() {
  console.log("🧪  Testing Supabase fetch...\n");
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .limit(5);

  if (error) {
    console.error("❌  Supabase error:", error.message);
    process.exit(1);
  }

  console.log(`✅  Fetched ${data.length} transactions from Supabase\n`);
  console.log("📋  First 5 transactions:");
  console.log(JSON.stringify(data, null, 2));
}

// ------------------------------------------------------------
//  Entry point
// ------------------------------------------------------------
const source = process.argv[2];
if (!source) {
  console.error("Usage:");
  console.error("  node import.js akahu              # Fetch and import from Akahu API");
  console.error("  node import.js akahu-test         # Test Akahu fetch only (no import)");
  console.error("  node import.js supabase-test      # Test Supabase fetch only");
  console.error("  node import.js <file-path>        # Import from JSON file");
  process.exit(1);
}

if (source === 'akahu-test') {
  testAkahuFetch();
} else if (source === 'supabase-test') {
  testSupabaseFetch();
} else {
  importTransactions(source);
}
