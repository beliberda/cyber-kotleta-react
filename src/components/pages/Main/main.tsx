import { navMain } from "@/components/routes/navigations";
import Header from "@/components/widjets/Header/header";

function MainPage() {
  return (
    <>
      <Header navigations={navMain} />
    </>
  );
}

export default MainPage;
