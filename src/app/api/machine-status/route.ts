// import { NextResponse } from "next/server";
// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export async function GET() {
//   try {
//     const { rows } = await pool.query(`
//       SELECT DISTINCT ON (machine_name)
//         id, machine_name, mode, status, remaining_time, next_model
//       FROM machine_status
//       WHERE machine_name IN (
//         'Forming M/C #1',
//         'Forming M/C #2',
//         'Forming M/C #3',
//         'Forming M/C #5'
//       )
//       ORDER BY machine_name, created_at DESC;
//     `);

//     const formatted = rows.map((item) => {
//       const [min, sec] = item.remaining_time.split(":");
//       return {
//         ...item,
//         remaining_time: `${parseInt(min)} Min ${parseInt(sec)} Sec`,
//       };
//     });

//     return NextResponse.json(formatted);
//   } catch (err) {
//     console.error("DB Error:", err);
//     return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";

const mockData = [
  {
    id: 1,
    machine_name: "Forming M/C #1",
    mode: "Normal",
    status: "Changeover",
    remaining_time: "8:22",
    next_model: "AA"
  },
  {
    id: 2,
    machine_name: "Forming M/C #2",
    mode: "Normal",
    status: "Normal",
    remaining_time: "12:10",
    next_model: "BB"
  },
  {
    id: 3,
    machine_name: "Forming M/C #3",
    mode: "Normal",
    status: "Abnormal",
    remaining_time: "8:22",
    next_model: "CC"
  },
  {
    id: 4,
    machine_name: "Forming M/C #5",
    mode: "Normal",
    status: "Abnormal",
    remaining_time: "8:22",
    next_model: "DD"
  }
];

export async function GET() {
  try {
    // ใช้ mock data แทนการ query จากฐานข้อมูล
    const formatted = mockData.map((item) => {
      const [min, sec] = item.remaining_time.split(":");
      return {
        ...item,
        remaining_time: `${parseInt(min)} Min ${parseInt(sec)} Sec`,
      };
    });

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
