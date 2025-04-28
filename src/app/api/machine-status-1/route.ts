// import { NextResponse } from 'next/server';
// import { pool } from '@/lib/db';

// export async function GET() {
//   try {
//     const res = await pool.query(`
//       SELECT * FROM machine_status_1
//       WHERE process IN ('Meterial Insertion', 'Forming', 'Staging')
//       ORDER BY created_at DESC
//       LIMIT 3
//     `);
//     const mockData = res.rows;
//     const parsedData = mockData.map((item) => {
//       if (item.process === "Staging" && !isNaN(parseInt(item.status))) {
//         const current = parseInt(item.status);
//         const total = 20000;
//         const percent = Math.floor((current / total) * 100);
//         return {
//           ...item,
//           status: `Complete lot: ${percent}% (${current}/20000)`,
//         };
//       }
//       return item;
//     });

//     return NextResponse.json(parsedData);
//   } catch (error) {
//     console.error("Database error:", error);
//     return NextResponse.json({ error: "Failed to fetch data from database" });
//   }
// }
import { NextResponse } from 'next/server';

// Mock data
const mockData = [
  {
    id: 1,
    process: "Meterial Insertion",
    mode: "Andon NG",
    status: "Remaining 54 mins",
    created_at: "2025-04-23T15:26:21.971Z"
  },
  {
    id: 2,
    process: "Forming",
    mode: "Normal",
    status: "Alarm Code:XXXX",
    created_at: "2025-04-23T15:26:21.971Z"
  },
  {
    id: 3,
    process: "Staging",
    mode: "Normal",
    status: "Complete lot: 60% (12000/20000)",
    created_at: "2025-04-23T15:26:21.971Z"
  }
];

export async function GET() {
  try {
    // ใช้ mock data แทนการ query จากฐานข้อมูล
    const formattedData = mockData.map((item) => {
      if (item.process === "Staging" && item.status.includes("Complete lot:")) {
        const statusMatch = item.status.match(/Complete lot: (\d+)% \((\d+)\/(\d+)\)/);
        if (statusMatch) {
          const current = parseInt(statusMatch[2]);
          const total = parseInt(statusMatch[3]);
          const percent = Math.floor((current / total) * 100);
          return {
            ...item,
            status: `Complete lot: ${percent}% (${current}/${total})`,
          };
        }
      }
      return item;
    });

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
