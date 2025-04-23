import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const res = await pool.query(`
      SELECT * FROM machine_status_1
      WHERE process IN ('Meterial Insertion', 'Forming', 'Staging')
      ORDER BY created_at DESC
      LIMIT 3
    `);
    const mockData = res.rows;
    const parsedData = mockData.map((item) => {
      if (item.process === "Staging" && !isNaN(parseInt(item.status))) {
        const current = parseInt(item.status);
        const total = 20000;
        const percent = Math.floor((current / total) * 100);
        return {
          ...item,
          status: `Complete lot: ${percent}% (${current}/20000)`,
        };
      }
      return item;
    });

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch data from database" });
  }
}
