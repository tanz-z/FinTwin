import Sidebar from "../components/dashboard/SideBar";
import Topbar from "../components/dashboard/TopBar";
import BalanceCard from "../components/dashboard/BalanceCard";
import QuickActions from "../components/dashboard/QuickActions";
import Transactions from "../components/dashboard/Transactions";
import AiPanel from "../components/dashboard/AiPanel";
import "../styles/Dashboard.css";


import { useState } from "react";

function Dashboard() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="dashboard-container">

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