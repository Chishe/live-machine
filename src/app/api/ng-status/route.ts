import { NextResponse } from "next/server";

export async function GET() {
  const mockData = [
    {
      id: 1,
      mc: "Forming#1",
      mode: "Andon NG",
      date: "2025-04-23T13:35",
      details: "Alarm Code:XXXX",
      plc: "TPM",
      continue: "12 Min 10 Sec",
      loss: "50 mins",
    },
    {
      id: 2,
      mc: "Forming#2",
      mode: "Andon NG",
      date: "2025-04-23T13:35",
      details: "Alarm Code:XXXX",
      plc: "PD",
      continue: "12 Min 10 Sec",
      loss: "50 mins",
    },
    {
      id: 3,
      mc: "Forming#3",
      mode: "Andon NG",
      date: "2025-04-23T13:35",
      details: "Alarm Code:XXXX",
      plc: "TPM",
      continue: "12 Min 10 Sec",
      loss: "50 mins",
    },
  ];

  return NextResponse.json(mockData);
}
