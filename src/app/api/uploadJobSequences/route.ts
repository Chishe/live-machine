import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

const initialRows = [
  {
    sequence: 1,
    time: "7:45",
    line: "Fin forming no.1",
    action: "Prepare change P/N",
    detail: "Change to part number 2290",
    status: "Complete",
  },
  {
    sequence: 2,
    time: "8:32",
    line: "Fin forming no.2",
    action: "Prepare change material",
    detail: "-",
    status: "Next action",
  },
  {
    sequence: 3,
    time: "8:55",
    line: "Fin forming no.3",
    action: "Prepare change coil material",
    detail: "Change to",
    status: "Waiting",
  },
  {
    sequence: 4,
    time: "9:10",
    line: "Fin forming no.5",
    action: "Prepare change roller",
    detail: "Change to roller 3,4",
    status: "Complete",
  },
  {
    sequence: 5,
    time: "9:30",
    line: "Fin forming no.5",
    action: "Confirm result Quality fin",
    detail: "Dimension Ok",
    status: "Complete",
  },
  {
    sequence: 6,
    time: "9:45",
    line: "Fin forming no.1",
    action: "Confirm result dimension fin",
    detail: "waiting injected",
    status: "Next action",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      for (let row of initialRows) {
        const { data, error } = await supabase
          .from("job_sequences")
          .upsert([row], { onConflict: ["sequence"] })

        if (error) {
          throw new Error(`Failed to insert data: ${error.message}`);
        }
      }

      return res.status(200).json({ message: "Data uploaded successfully!" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
