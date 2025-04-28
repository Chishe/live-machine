import { NextResponse } from "next/server";

const nextModels = [
  "+588W(IF)", "+0805B(3.4)(IF)", "+EFC:3.4(IF)", "+2HX,REAR(IF)",
  "+D13L(IF),RHD", "+D06A", "+Y4L", "+Y4L", "+4L45W,LHD(IF)",
  "+4L45W,RHD (IF)", "+2WF", "+2WF(2CT)", "+T00(IF)", "+YHAB(IF)",
  "+2HX,FRONT(IF)", "+D13L(IF),LHD", "+D53L(IF)"
];

const getRandomValue1 = () => {
  const values = [60, 70, 80];
  return values[Math.floor(Math.random() * values.length)];
};
const getRandomValue2 = () => {
  const values = [60, 70, 80, 90];
  return values[Math.floor(Math.random() * values.length)];
};

const getRandomModel = () => {
  return nextModels[Math.floor(Math.random() * nextModels.length)];
};

const getMaterialInfo = (materialLevel: number) => {
  let materialColor = 'green';
  let status = 'Normal';

  if (materialLevel === 10) {
    materialColor = 'red';
    status = 'Changeover';
  } else if (materialLevel === 50) {
    materialColor = 'yellow';
    status = 'Abnormal';
  }

  return { materialColor, status };
};

const mockData = [
  { id: 1, machine_name: "Forming M/C #1", mode: "Normal", remaining_time: "5:10:00", next_model: "+2HX,FRONT(IF)" },
  { id: 2, machine_name: "Forming M/C #2", mode: "Andon NG", remaining_time: "3:25:00", next_model: "+D13L(IF),LHD" },
  { id: 3, machine_name: "Forming M/C #3", mode: "Normal", remaining_time: "6:30:00", next_model: "+T00(IF)" },
  { id: 4, machine_name: "Forming M/C #5", mode: "Normal", remaining_time: "7:20:00", next_model: "+YHAB(IF)" }
];

const formatRemainingTime = (timeStr: string) => {
  const [hr, min, sec] = timeStr.split(":").map(Number);
  return `${hr} Hr ${min} Min ${sec} Sec`;
};

export async function GET() {
  try {
    const formatted = mockData.map((item) => {
      const materialLevel = getRandomValue1();
      const dekiLevel = getRandomValue2();
      const { materialColor, status } = getMaterialInfo(materialLevel);
      const next_model = getRandomModel();
      const formattedRemainingTime = formatRemainingTime(item.remaining_time);

      return {
        ...item,
        materialLevel,
        dekiLevel,
        materialColor,
        status,
        remaining_time: formattedRemainingTime
      };
    });

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
