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
      const res = await axios.get("/api/machine");
      setData(res.data);
    };

    fetchData();
    const interval = setInterval(fetchData, 1200000);
    return () => clearInterval(interval);
  }, []);

  if (!data.length) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((machine, idx) => (
        <MachineStatusCard
          key={idx}
          id={idx + 1}
          machine_name={machine.machine_name}
          status={machine.status}
          initialRemainingTime={machine.remaining_time}
          next_model={machine.next_model}
          onSelect={(name) => console.log("Selected machine:", name)}
        />
      ))}
    </div>
  );
}
