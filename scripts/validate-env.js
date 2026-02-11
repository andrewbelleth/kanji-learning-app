#!/usr/bin/env node
/**
 * Validates required env vars for KanGo (Supabase).
 * Run before dev/build/start. Loads .env.local if present.
 */

const fs = require("fs");
const path = require("path");

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  content.split("\n").forEach((line) => {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  });
}

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
];

if (process.env.NODE_ENV === "test") {
  process.exit(0);
}

const missing = required.filter((key) => !process.env[key]?.trim());
if (missing.length) {
  console.error("Missing env:", missing.join(", "));
  console.error("Set them in .env.local (see README or Supabase project settings).");
  process.exit(1);
}
console.log("Env OK");
