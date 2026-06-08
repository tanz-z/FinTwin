import {
  FaHome,
  FaWallet,
  FaExchangeAlt,
  FaUniversity,
  FaChartLine,
  FaRobot,
  FaCog
} from "react-icons/fa";


function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">PSB Bank</h2>

      <nav>
        <a href="#">
          <FaHome /> Dashboard
        </a>
        <a href="#">
          <FaWallet /> Accounts
        </a>
        <a href="#">
          <FaExchangeAlt /> Transfer
        </a>
        <a href="#">
          <FaUniversity /> Loans
        </a>
        <a href="#">
          <FaChartLine /> Investments
        </a>
        <a href="#">
          <FaRobot /> AI Assistant
        </a>
        <a href="#">
          <FaCog /> Settings
        </a>
      </nav>

    </div>
  );
}

export default Sidebar;