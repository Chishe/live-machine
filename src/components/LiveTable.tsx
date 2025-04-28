"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";

type RowData = {
  process: string;
  mode: string;
  status: string;
};

const API_OPTIONS = [
  { label: "Forming M/C #1", value: "/api/machine-status-1" },
  { label: "Forming M/C #2", value: "/api/machine-status-2" },
  { label: "Forming M/C #3", value: "/api/machine-status-3" },
  { label: "Forming M/C #5", value: "/api/machine-status-5" },
];

function formatStagingStatus(process: string, rawStatus: string): string {
  const trimmedStatus = rawStatus.trim();
  if (process === "Staging" && !isNaN(parseInt(trimmedStatus))) {
    const current = parseInt(trimmedStatus);
    const total = 20000;
    const percent = Math.floor((current / total) * 100);
    return `Complete lot: ${percent}% (${current}/20000)`;
  }
  return rawStatus;
}



export default function LiveTable() {
  const [apiUrl, setApiUrl] = useState(API_OPTIONS[0].value);
  const [data, setData] = useState<RowData[]>([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, [apiUrl]);
  
  const fetchData = async () => {
    try {
      const res = await axios.get(apiUrl);
      setData(res.data);
    } catch (err) {
      console.error("API fetch error", err);
      setData([]);
    }
  };
  

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  return (
    <div className="rounded-xl bg-[#586F97] p-4  w-full">
      {/* Header */}
      <div className="flex items-center justify-start mb-4">
        <h1 className="text-2xl font-bold text-white">Live Monitoring:</h1>
        <select
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          className="ml-4 p-2 rounded-md border border-gray-300"
        >
          {API_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-center">
          <thead className="bg-gray-100 text-sm font-semibold text-gray-600">
            <tr>
              <th className="p-4">Process</th>
              <th className="p-4">Mode</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {data.map((row, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-4">{row.process}</td>
                <td
                  className={clsx("p-4 font-semibold", {
                    "text-red-500": row.mode === "Andon NG",
                    "text-green-500": row.mode === "Normal",
                    "text-gray-500":
                      row.mode !== "Normal" && row.mode !== "Andon NG",
                  })}
                >
                  {row.mode}
                </td>
                <td className="p-4">
                  {formatStagingStatus(row.process, row.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="text-center text-gray-400 mt-4">No data found</div>
        )}
      </div>
    </div>
  );
}
