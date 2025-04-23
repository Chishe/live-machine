import MachineStatusList from "@/components/MachineStatusList";
import LiveTable from "@/components/LiveTable";
import NgTable from "@/components/NgTable";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
    <main className="h-full">
      <div
        className="space-y-2 flex-grow overflow-y-[500px] 
        [&::-webkit-scrollbar]:w-1 
        [&::-webkit-scrollbar-track]:bg-gray-100 
        [&::-webkit-scrollbar-thumb]:bg-gray-300 
        dark:[&::-webkit-scrollbar-track]:bg-[#151c34] 
        dark:[&::-webkit-scrollbar-thumb]:bg-[#aeaeb7]"
      >
        <MachineStatusList />
        <LiveTable />
        <NgTable />
        <ToastContainer />
      </div>
    </main>
  );
}
