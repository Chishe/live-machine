// app/api/machine-status/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const mockData = [
    {
      id: 1,
      process: "Meterial Insertion",
      mode: "Andon NG",
      status: "Remaining 54 mins",
    },
    {
      id: 2,
      process: "Forming",
      mode: "Normal",
      status: "Alarm Code:XXXX",
    },
    {
      id: 3,
      process: "Staging",
      mode: "Normal",
      status: "Complete lot:54% (12000/20000)",
    },
  ];

  return NextResponse.json(mockData);
}
