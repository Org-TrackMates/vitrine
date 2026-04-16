import { neon } from "@neondatabase/serverless";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

export async function initDb() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

export async function insertWaitlist(name: string, email: string) {
  const sql = getDb();
  await sql`
    INSERT INTO waitlist (name, email)
    VALUES (${name}, ${email})
    ON CONFLICT (email) DO NOTHING;
  `;
}

export async function getWaitlistCount(): Promise<number> {
  const sql = getDb();
  const rows = await sql`SELECT COUNT(*) AS count FROM waitlist;`;
  return parseInt(rows[0].count, 10);
}
