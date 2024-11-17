import Test1 from "@/components/pages/Tests/Test1/test1";
import Login from "@/components/pages/Login/login";
import Test2 from "@/components/pages/Tests/Test2/test2";
import Test3 from "@/components/pages/Tests/Test3/test3";
import PrivateRoute from "@/components/routes/PrivateRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LectionsPage from "@/components/pages/Lections/lections";
import TestsPage from "@/components/pages/Tests/tests";
import MainPage from "@/components/pages/Main/main";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/lections" element={<LectionsPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/contacts" element={<MainPage />} />

            <Route path="/tests" element={<TestsPage />}>
              <Route path="/tests/test1" element={<Test1 />} />
              <Route path="/tests/test2" element={<Test2 />} />
              <Route path="/tests/test3" element={<Test3 />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
