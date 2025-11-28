import { NextRequest, NextResponse } from "next/server";

const machines = {
  1: { materialLevel: 80, dekiLevel: 95, materialColor: "green" },
  2: { materialLevel: 20, dekiLevel: 80, materialColor: "yellow" },
  3: { materialLevel: 70, dekiLevel: 80, materialColor: "green" },
  4: { materialLevel: 70, dekiLevel: 80, materialColor: "green" },
};

// Use params as a Promise
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params before using
  const { id } = await params;
  const machineId = parseInt(id, 10);

  if (isNaN(machineId)) {
    return NextResponse.json({ message: "Invalid machine ID" }, { status: 400 });
  }

  const machineData = machines[machineId as keyof typeof machines];

  if (!machineData) {
    return NextResponse.json({ message: "Machine not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: machineId,
    ...machineData,
  });
}
