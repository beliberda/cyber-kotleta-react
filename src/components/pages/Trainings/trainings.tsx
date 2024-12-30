import { navTests, navTrainings } from "@/components/routes/navigations";
import Sidebar from "@/components/widjets/Sidebar/sidebar";
import { Outlet } from "react-router-dom";

function TrainingPage() {
  return (
    <div style={{ display: "flex", flexGrow: "1" }}>
      <Sidebar navigations={navTrainings} />
      <Outlet />
    </div>
  );
}

export default TrainingPage;
