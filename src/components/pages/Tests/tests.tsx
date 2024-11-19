import { navMain, navTests } from "@/components/routes/navigations";
import Header from "@/components/widjets/Header/header";
import { Outlet } from "react-router-dom";

function TestsPage() {
  return (
    <>
      <Header navigations={navMain} />
      <Header navigations={navTests} isLogoutActive={false} />
      <Outlet />
    </>
  );
}

export default TestsPage;
