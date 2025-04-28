// // app/api/machine-logs/route.ts
// import { NextResponse } from "next/server";
// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export async function GET() {
//   const res = await pool.query("SELECT * FROM machine_logs ORDER BY date DESC LIMIT 100");
//   return NextResponse.json(res.rows);
// }
import { NextResponse } from "next/server";

const mockData = [
  {
    id: 1,
    mc: "Forming#1",
    mode: "Andon NG",
    date: "2025-04-23T06:35:00.000Z",
    details: "",
    plc: "TPM",
    action: "",
    continue: "2025-04-23T06:36:25.000Z",
    loss: "50 mins",
  },
  {
    id: 2,
    mc: "Forming#2",
    mode: "Andon NG",
    date: "2025-04-23T06:35:00.000Z",
    details: "",
    plc: "TPM",
    action: "",
    continue: "2025-04-23T06:36:25.000Z",
    loss: "50 mins",
  },
  {
    id: 3,
    mc: "Forming#3",
    mode: "Andon NG",
    date: "2025-04-23T06:35:00.000Z",
    details: "",
    plc: "TPM",
    action: "",
    continue: "2025-04-23T06:36:25.000Z",
    loss: "50 mins",
  }
];

export async function GET() {
  try {
    return NextResponse.json(mockData);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
