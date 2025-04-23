import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { mc, field, value } = body;
    const allowedFields = ["details", "action"];
    if (!allowedFields.includes(field)) {
      return NextResponse.json({ error: "Invalid field" }, { status: 400 });
    }

    const query = `
    UPDATE machine_logs
    SET ${field} = $1
    WHERE mc = $2
    RETURNING *
  `;
  

    await pool.query(query, [value, mc]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
