'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import MachineStatusCard from "./MachineStatusCard";

type MachineData = {
  machine_name: string;
  status: "Normal" | "Changeover" | "Abnormal";
  remaining_time: string;
  next_model: string;
};

export default function MachineStatusList() {
  const [data, setData] = useState<MachineData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/machine-status");
      setData(res.data);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data.length) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((machine, idx) => (
        <MachineStatusCard key={idx} {...machine} />
      ))}
    </div>
  );
}
