import { useState, useEffect } from "react";
import { TiArrowSync } from "react-icons/ti";
import { IoPlay } from "react-icons/io5";
import { TbHandStop } from "react-icons/tb";

type MachineProps = {
  id: number;
};

export default function Machine({ id }: MachineProps) {
  const [materialLevel, setMaterialLevel] = useState(0);
  const [dekiLevel, setDekiLevel] = useState(0);
  const [materialColor, setMaterialColor] = useState("green");
  console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/machine/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data) {
          const { materialLevel, dekiLevel, materialColor } = data;
          console.log(materialLevel, dekiLevel, materialColor);
          setMaterialLevel(materialLevel ?? 0);
          setDekiLevel(dekiLevel ?? 0);
          setMaterialColor(materialColor ?? "green");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 1200000);
    return () => clearInterval(interval);
  }, [id]);
  
  let CenterIcon = null;
  if (dekiLevel >= 90) {
    CenterIcon = <TiArrowSync size={64} className="text-blue-500" />;
  } else if (dekiLevel <= 10) {
    CenterIcon = <IoPlay size={64} className="text-green-500" />;
  } else if (dekiLevel >= 45 && dekiLevel <= 55 && materialColor === "red") {
    CenterIcon = <TbHandStop size={64} className="text-red-500" />;
  }

  return (
    <div
      className="relative w-[400px] h-[250px] mx-auto bg-center"
      style={{
        backgroundImage: "url('box.png')",
        backgroundSize: "300px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
      {/* Material Bar */}
      <div className="absolute left-4 bottom-14 text-sm text-black font-semibold">
        Material
      </div>
      <div className="absolute left-4 bottom-4 h-6 w-[150px] bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full rounded-l"
          style={{
            width: `${materialLevel}%`,
            backgroundColor: materialColor,
            transition: "width 0.5s"
          }}
        />
      </div>

      {/* Deki Bar */}
      <div className="absolute right-4 bottom-14 text-sm text-black font-semibold">
        Plan
      </div>
      <div className="absolute right-4 bottom-4 h-6 w-[150px] bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full rounded-l"
          style={{
            width: `${dekiLevel}%`,
            background: `linear-gradient(to right, #90ee90, #006400)`,
            transition: "width 0.5s"
          }}
        />
      </div>

      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        {CenterIcon}
      </div>
    </div>
  );
}
