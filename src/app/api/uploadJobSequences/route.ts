import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";
import type { PostgrestError } from "@supabase/supabase-js";

const initialRows = [
  { sequence: 1, time: "7:45", line: "Fin forming no.1", action: "Prepare change P/N", detail: "Change to part number 2290", status: "Complete" },
  { sequence: 2, time: "8:32", line: "Fin forming no.2", action: "Prepare change material", detail: "-", status: "Next action" },
  { sequence: 3, time: "8:55", line: "Fin forming no.3", action: "Prepare change coil material", detail: "Change to", status: "Waiting" },
  { sequence: 4, time: "9:10", line: "Fin forming no.5", action: "Prepare change roller", detail: "Change to roller 3,4", status: "Complete" },
  { sequence: 5, time: "9:30", line: "Fin forming no.5", action: "Confirm result Quality fin", detail: "Dimension Ok", status: "Complete" },
  { sequence: 6, time: "9:45", line: "Fin forming no.1", action: "Confirm result dimension fin", detail: "waiting injected", status: "Next action" },
];

export async function POST() {
  try {
    const { error }: { error: PostgrestError | null } = await supabase
      .from("job_sequences")
      .upsert(initialRows, { onConflict: "sequence" });

    if (error) throw new Error(`Failed to insert data: ${error.message}`);

    return NextResponse.json({ message: "Data uploaded successfully!" });
  } catch (error) {
    // ถ้าเป็น Error ของ JavaScript ปกติ
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
