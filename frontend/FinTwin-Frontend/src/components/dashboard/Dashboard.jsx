import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import BalanceCard from "./BalanceCard";
import QuickActions from "./QuickActions";
import Transactions from "./Transactions";
import AiPanel from "./AiPanel";
import "../../styles/Dashboard.css";
import ScrollToTop from "../Home/landingPage/ScrollToTop";


import { useState } from "react";

function Dashboard() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="dashboard-container">

      <ScrollToTop />
      <Sidebar />

      <div className="dashboard-main">

        <Topbar onAiClick={() => setAiOpen(true)} />

        <div className="dashboard-content">

          <BalanceCard />
          <QuickActions />
          <Transactions />

        </div>

      </div>

      <AiPanel open={aiOpen} onClose={() => setAiOpen(false)} />

    </div>
  );
}

export default Dashboard;