"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface JobSequenceRow {
  id: number;
  sequence: number;
  time: string;
  line: string;
  action: string;
  detail: string;
  status: string;
}

const line = [
  "Fin forming no.1",
  "Fin forming no.2",
  "Fin forming no.3",
  "Fin forming no.5"
];

const actions = [
  "Prepare change P/N",
  "Prepare change material",
  "Prepare change coil material",
  "Prepare change roller",
  "Confirm result Quality fin",
  "Confirm result dimension fin",
];

const statuses = ["Complete", "Next action", "Waiting"];

export default function JobSequenceTable() {
  const [rows, setRows] = useState<JobSequenceRow[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("job_sequences")
      .select("*")
      .order("id", { ascending: true });


    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      console.log("Data fetched:", data);
      setRows(data || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (
    index: number,
    field: keyof JobSequenceRow,
    value: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value,
    };
    setRows(updatedRows);

    const { error } = await supabase
      .from("job_sequences")
      .upsert([updatedRows[index]], { onConflict: ["id"] });

    if (error) {
      console.error("Error saving data:", error.message);
      toast.error("Failed to save changes.");
    } else {
      fetchData();
      toast.success("Changes saved successfully!");
    }
  };


  const openVideo = (sequence: number) => {
    const videoUrl = sequence === 5 ? "/SIM.mp4" : "/some_video.mp4";
    setVideoSrc(videoUrl);
    setShowVideo(true);
  };
  

  const closeVideo = () => {
    setShowVideo(false);
    setVideoSrc("");
  };
  return (
    <div className="rounded-xl bg-[#586F97] p-4 relative w-full">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Sequence Working Job</h1>
      </div>

      <div className="h-[400px] overflow-y-auto max-w-full
      [&::-webkit-scrollbar]:w-1 
      [&::-webkit-scrollbar-track]:bg-gray-100 
      [&::-webkit-scrollbar-thumb]:bg-gray-300 
      dark:[&::-webkit-scrollbar-track]:bg-[#151c34] 
      dark:[&::-webkit-scrollbar-thumb]:bg-[#aeaeb7]">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-center">
          <thead className="bg-gray-100 text-sm font-semibold text-gray-600">
            <tr>
              <th className="p-3">Sequence</th>
              <th className="p-3">Time</th>
              <th className="p-3">Line</th>
              <th className="p-3">Action</th>
              <th className="p-3">Detail</th>
              <th className="p-3">Video</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {rows.map((row, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{row.sequence}</td>
                <td className="p-3">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={row.time}
                    onChange={(e) =>
                      handleChange(index, "time", e.target.value)
                    }
                  />
                </td>
                <td className="p-3">
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={row.line}
                    onChange={(e) =>
                      handleChange(index, "line", e.target.value)
                    }
                  >
                    <option value="">Select line</option>
                    {line.map((line, i) => (
                      <option key={i} value={line}>
                        {line}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={row.action}
                    onChange={(e) =>
                      handleChange(index, "action", e.target.value)
                    }
                  >
                    <option value="">Select Action</option>
                    {actions.map((action, i) => (
                      <option key={i} value={action}>
                        {action}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={row.detail}
                    onChange={(e) =>
                      handleChange(index, "detail", e.target.value)
                    }
                  />
                </td>
                <td className="p-3">
                  <button
                    className="bg-[#586F97] text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    onClick={() => openVideo(row.sequence)}
                  >
                    Video
                  </button>
                </td>
                <td className="p-3">
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={row.status}
                    onChange={(e) =>
                      handleChange(index, "status", e.target.value)
                    }
                  >
                    <option value="">Select Status</option>
                    {statuses.map((status, i) => (
                      <option key={i} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="text-center text-gray-400 mt-4">No data found</div>
        )}
      </div>
      {showVideo && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#586F97] rounded-lg p-8 relative w-[90%] max-w-[600px]">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeVideo}
            >
              ❌
            </button>
            {/* Conditionally render video or image */}
            {videoSrc && videoSrc.endsWith('.jpg') ? (
              <img src={videoSrc} alt="Full image" className="w-full h-auto rounded" />
            ) : (
              <video src={videoSrc} controls autoPlay className="w-full rounded-md" />
            )}
          </div>
        </div>
      )}

    </div>
  );
}
