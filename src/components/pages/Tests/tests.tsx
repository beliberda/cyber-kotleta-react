import { navTests } from "@/components/routes/navigations";
import Sidebar from "@/components/widjets/Sidebar/sidebar";
import { Outlet } from "react-router-dom";

function TestsPage() {
  return (
    <div style={{ display: "flex", flexGrow: "1" }}>
      <Sidebar navigations={navTests} />
      <Outlet />
    </div>
  );
}

export default TestsPage;
