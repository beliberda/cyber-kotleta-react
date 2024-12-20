import Test1 from "@/components/pages/Tests/Test1/test1";
import Login from "@/components/pages/Login/login";
import Test2 from "@/components/pages/Tests/Test2/test2";
import Test3 from "@/components/pages/Tests/Test3/test3";
import PrivateRoute from "@/components/routes/PrivateRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LectionsPage from "@/components/pages/Lections/lections";
import TestsPage from "@/components/pages/Tests/tests";
import MainPage from "@/components/pages/Main/main";
import Registration from "@/components/pages/Registration/registration";
import Profile from "@/components/pages/Profile/profile";
import Test4 from "@/components/pages/Tests/Test4/test4";
import Header from "@/components/widjets/Header/header";
import { navMain } from "@/components/routes/navigations";
import TestSpeed from "@/components/pages/Tests/TestSpeed/testSpeed";
import TestMemory from "@/components/pages/Tests/TestMemory/testMemory";
import TestAristotelStamin from "@/components/pages/Tests/TestAristotelStamin/testAristotelStamin";
import TestLabirinth from "@/components/pages/Tests/TestLabirinth/testLabirinth";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Header navigations={navMain} />}>
              <Route path="/lections" element={<LectionsPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/tests" element={<TestsPage />}>
                <Route path="/tests/test1" element={<Test1 />} />
                <Route path="/tests/test2" element={<Test2 />} />
                <Route path="/tests/test3" element={<Test3 />} />
                <Route path="/tests/test4" element={<Test4 />} />
                <Route path="/tests/test5" element={<TestSpeed />} />
                <Route path="/tests/test6" element={<TestMemory />} />
                <Route path="/tests/test7" element={<TestAristotelStamin />} />
                <Route path="/tests/test8" element={<TestLabirinth />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
