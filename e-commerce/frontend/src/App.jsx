import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { TestDjango } from "./components/testDjango/TestDjango";
import { Boutique } from "./components/boutique/Boutique";
import { DashboardPage } from "./components/dashboard/Dashboard";
import { AdminCli } from "./components/adminCli/AdminCli";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestDjango />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/adminCli" element={<AdminCli />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
