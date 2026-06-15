import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";


function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }
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