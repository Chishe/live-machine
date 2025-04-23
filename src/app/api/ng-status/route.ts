// app/api/machine-logs/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  const res = await pool.query("SELECT * FROM machine_logs ORDER BY date DESC LIMIT 100");
  return NextResponse.json(res.rows);
}
