import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Check your .env.local or Vercel environment variables.",
  );
}

/**
 * Client SQL Neon — compatible edge + serverless.
 * Usage : `const rows = await sql\`SELECT ...\``
 */
export const sql = neon(process.env.DATABASE_URL);
