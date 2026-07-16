import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import SplashScreen from "./components/SplashScreen";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home/landingPage/Home";
import Dashboard from "./components/dashboard/Dashboard";
import BankingPage from "./components/Home/banking/BankingPage";
import InvestmentPage from "./components/Home/investment/InvestmentPage";
import Loans from "./components/Home/loans/Loans";
import AiPage from "./components/Home/aiassistant/AiPage";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/banking" element={<BankingPage />} />
        
        <Route path="/investment" element={<InvestmentPage />} />
        <Route path="/loan" element={<Loans/>} />
        <Route path="/aiassistant" element={<AiPage/>} />


      </Route>
    </Routes>
  );
}

export default App;