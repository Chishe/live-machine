// app/api/machine-status/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const mockData = [
    {
      id: 1,
      process: "Meterial Insertion",
      mode: "Normal",
      machine_name: "Forming M/C #1",
      xstatus: "Remaining 54 mins",
      status: "Changeover",
      remaining_time: "08 Min 22 Sec",
      next_model: "AA",
    },
    {
      id: 2,
      process: "Forming",
      mode: "Andon NG",
      machine_name: "Forming M/C #2",
      xstatus: "Alarm Code:XXXX",
      status: "Normal",
      remaining_time: "12 Min 10 Sec",
      next_model: "BB",
    },
    {
      id: 3,
      process: "Staging",
      mode: "Normal",
      machine_name: "Forming M/C #3",
      xstatus: "Complete lot:54% (12000/20000)",
      status: "Abnormal",
      remaining_time: "00 Min 00 Sec",
      next_model: "CC",
    },
  ];

  return NextResponse.json(mockData);
}
