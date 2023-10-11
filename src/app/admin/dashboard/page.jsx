import NavBar from "@/components/admin/navbar";

import Busses from "@/components/admin/dashboard/busses";
import Timetable from "@/components/admin/dashboard/timetable";

export default function Dashboard() {
  return (
    <main className="dark text-foreground bg-background">
      <NavBar />

      <div className="grid grid-cols-2 gap-10 mt-10 mx-10 pb-10">
        <div className="h-[500px] p-10">
          <h1>Summery</h1>
        </div>
        <div className="h-[500px] p-10 overflow-auto">
          <Busses />
        </div>
        <div className="col-span-2 h-[500px] p-10 overflow-auto">
          <Timetable />
        </div>
      </div>
    </main>
  );
}
