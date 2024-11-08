import GreenRedLight from "@/components/pages/GreenRedLight/greenRedLight";
import Test2 from "@/components/pages/Test2/test3";
import Test3 from "@/components/pages/Test3/test3";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter basename="/cyber-kotleta-react/">
        <Routes>
          <Route path="/" element={<GreenRedLight />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/test3" element={<Test3 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
