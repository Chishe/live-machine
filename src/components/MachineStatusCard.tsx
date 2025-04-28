import { CiFaceMeh, CiFaceSmile, CiFaceFrown } from "react-icons/ci";
import { GrPlay } from "react-icons/gr";
import clsx from "clsx";
import Machine from "./machine";

type MachineProps = {
  machine_name: string;
  status: "Normal" | "Changeover" | "Abnormal";
  remaining_time: string;
  next_model: string;
  onSelect?: (name: string) => void;
};

export default function MachineStatusCard({
  machine_name,
  status,
  remaining_time,
  next_model,
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

        <Machine />

        <p className="text-black">
          <span className="font-semibold">Status:</span> {status}
        </p>
        <p className="text-black">
          <span className="font-semibold">Remaining Time:</span>{" "}
          {remaining_time}
        </p>
        <p className="text-black">
          <span className="font-semibold">Next:</span> Change to model{" "}
          {next_model}
        </p>
      </div>
    </div>
  );
}
