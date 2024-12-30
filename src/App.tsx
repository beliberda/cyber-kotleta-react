import Test1 from "@/components/pages/Trainings/Test1/test1";
import Login from "@/components/pages/Login/login";
import Test2 from "@/components/pages/Trainings/Test2/test2";
import Test3 from "@/components/pages/Trainings/Test3/test3";
import PrivateRoute from "@/components/routes/PrivateRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LectionsPage from "@/components/pages/Lections/lections";
import MainPage from "@/components/pages/Main/main";
import Registration from "@/components/pages/Registration/registration";
import Profile from "@/components/pages/Profile/profile";
import Test4 from "@/components/pages/Trainings/Test4/test4";
import Header from "@/components/widjets/Header/header";
import { navMain } from "@/components/routes/navigations";
import TestSpeed from "@/components/pages/Trainings/TestSpeed/testSpeed";
import TestMemory from "@/components/pages/Trainings/TestMemory/testMemory";
import TestAristotelStamin from "@/components/pages/Trainings/TestAristotelStamin/testAristotelStamin";
import TestLabirinth from "@/components/pages/Trainings/TestLabirinth/testLabirinth";
import TrainingPage from "@/components/pages/Trainings/trainings";
import TestsPage from "@/components/pages/Tests/tests";
import IncreasingComplexity from "@/components/pages/Tests/increasingComplexity/increasingComplexity";
import SpeedDecision from "@/components/pages/Tests/speedDecision/speedDecision";
import PeripheralVision from "@/components/pages/Tests/peripheralVision/peripheralVision";
import UserStore from "@/components/store/UserStore";
import { useLayoutEffect } from "react";

function App() {
  useLayoutEffect(() => {
    UserStore.checkAuth();
  }, []);
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
                <Route
                  path="/tests/increasing-complexity"
                  element={<IncreasingComplexity />}
                />
                <Route
                  path="/tests/speed-decision"
                  element={<SpeedDecision />}
                />
                <Route
                  path="/tests/peripheral-vision"
                  element={<PeripheralVision />}
                />
              </Route>
              <Route path="/training" element={<TrainingPage />}>
                <Route path="/training/training1" element={<Test1 />} />
                <Route path="/training/training2" element={<Test2 />} />
                <Route path="/training/training3" element={<Test3 />} />
                <Route path="/training/training4" element={<Test4 />} />
                <Route path="/training/training5" element={<TestSpeed />} />
                <Route path="/training/training6" element={<TestMemory />} />
                <Route
                  path="/training/training7"
                  element={<TestAristotelStamin />}
                />
                <Route path="/training/training8" element={<TestLabirinth />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
