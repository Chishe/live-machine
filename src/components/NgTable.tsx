"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";

type RowData = {
  process: string;
  mode: string;
  xstatus: string; // ISO datetime
  details: string;
  plc: string;
  continue: string;
  loss: string;
};

export default function NgTable() {
  const [data, setData] = useState<RowData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/ng-status");
      const rawData = res.data;

      const mappedData = rawData.map(
        (row: any): RowData => ({
          process: row.mc,
          mode: row.mode,
          xstatus: parseThaiDateToISO(row.date),
          details: row.details,
          plc: row.plc,
          continue: row.continue,
          loss: row.loss,
        })
      );

      setData(mappedData);
    } catch (err) {
      console.error("API fetch error", err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatDateDisplay = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const toDateOnly = (datetime: string) => {
    return new Date(datetime).toISOString().slice(0, 10);
  };

  const filteredData = selectedDate
    ? data.filter((row) => toDateOnly(row.xstatus) === selectedDate)
    : data;

  return (
    <div className="rounded-xl bg-[#3b82f6]">
      <div className="mt-4 space-y-6 p-4">
        <div className="flex flex-row items-center justify-start mt-4 space-x-4">
          <h1 className="text-2xl font-bold text-center text-white">
            Summary Andon Record
          </h1>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 rounded-md border border-gray-300"
          />

          <div className="rounded-sm bg-gray-100 rounded-full text-black font-semibold p-2">
            Line: ALL
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-center">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <tr>
                <th className="p-4 text-center">Process</th>
                <th className="p-4 text-center">Mode</th>
                <th className="p-4 text-center">Date</th>
                <th className="p-4 text-center">Details</th>
                <th className="p-4 text-center">PLC</th>
                <th className="p-4 text-center">Action</th>
                <th className="p-4 text-center">Continue</th>
                <th className="p-4 text-center">Loss</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {filteredData.map((row, idx) => (
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
                  <td className="p-4">{formatDateDisplay(row.xstatus)}</td>
                  <td className="p-4">{row.details}</td>
                  <td className="p-4">{row.plc}</td>
                  <td className="p-4">-</td>
                  <td className="p-4">{row.continue}</td>
                  <td className="p-4">{row.loss}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="text-center text-gray-400 mt-4">No data found</div>
          )}
        </div>
      </div>
    </div>
  );
}


function parseThaiDateToISO(dateStr: string): string {
  return dateStr;
}
