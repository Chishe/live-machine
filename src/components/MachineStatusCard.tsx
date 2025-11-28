import { useState, useEffect } from "react";
import { CiFaceMeh, CiFaceSmile, CiFaceFrown } from "react-icons/ci";
import { GrPlay } from "react-icons/gr";
import clsx from "clsx";
import Machine from "./machine";

type MachineProps = {
  machine_name: string;
  status: "Normal" | "Changeover" | "Abnormal";
  initialRemainingTime: string;
  next_model: string;
  id: number;
  onSelect?: (name: string) => void;
};

export default function MachineStatusCard({
  machine_name,
  status,
  initialRemainingTime,
  next_model,
  id,
  onSelect,
}: MachineProps) {
  const statusConfig = {
    
    Normal: {
      icon: <CiFaceSmile className="text-green-500 inline text-2xl" />,
      color: "text-green-700",
    },
    Changeover: {
      icon: <CiFaceMeh className="text-yellow-500 inline text-2xl" />,
      color: "text-yellow-700",
    },
    Abnormal: {
      icon: <CiFaceFrown className="text-red-500 inline text-2xl" />,
      color: "text-red-700",
    },
  };

  const [remainingTime, setRemainingTime] = useState<string>(initialRemainingTime);

  const timeToSeconds = (time: string) => {
    if (!time || time.split(":").length !== 3) return 0; 
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const secondsToTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs} Hr ${mins} Min ${secs} Sec`;
  };

  useEffect(() => {
    const initialSeconds = timeToSeconds(initialRemainingTime);
    let remainingSeconds = initialSeconds;

    if (id === 1) remainingSeconds = timeToSeconds("6:30:00");
    if (id === 2) remainingSeconds = timeToSeconds("1:20:00");
    if (id === 3) remainingSeconds = timeToSeconds("7:20:00");
    if (id === 4) remainingSeconds = timeToSeconds("5:20:00");

    const timer = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        setRemainingTime(secondsToTime(remainingSeconds));
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [id, initialRemainingTime]);

  return (
    <div className="mt-28 p-4 rounded-xl bg-[#586F97] w-full">
      <div className="p-6 bg-white rounded-sm shadow-md">
        <div className="flex items-center justify-between">
          <h1
            className={clsx(
              "text-2xl font-bold flex items-center gap-2",
              statusConfig[status].color
            )}
          >
            {machine_name} {statusConfig[status].icon}
          </h1>
          <button
            aria-label="Play"
            onClick={() => onSelect?.(machine_name)} 
            className="p-2 rounded-full bg-gray-900 hover:bg-gray-700 text-white transition"
          >
            <GrPlay />
          </button>
        </div>

        <Machine id={id} />

        <p className="text-black">
          <span className="font-semibold">Status:</span> {status}
        </p>
        <p className="text-black">
          <span className="font-semibold">Remaining Time:</span>{" "}
          {remainingTime}
        </p>
        <p className="text-black">
          <span className="font-semibold">Next:</span> Change to model{" "}
          {next_model}
        </p>
      </div>
    </div>
  );
}
