import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;