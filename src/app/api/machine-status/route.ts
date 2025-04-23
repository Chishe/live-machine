import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT DISTINCT ON (machine_name)
        id, machine_name, mode, status, remaining_time, next_model
      FROM machine_status
      WHERE machine_name IN (
        'Forming M/C #1',
        'Forming M/C #2',
        'Forming M/C #3',
        'Forming M/C #5'
      )
      ORDER BY machine_name, created_at DESC;
    `);

    const formatted = rows.map((item) => {
      const [min, sec] = item.remaining_time.split(":");
      return {
        ...item,
        remaining_time: `${parseInt(min)} Min ${parseInt(sec)} Sec`,
      };
    });

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("DB Error:", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
