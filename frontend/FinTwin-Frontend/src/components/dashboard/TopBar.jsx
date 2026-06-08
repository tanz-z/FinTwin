import { FaSearch, FaBell, FaUserCircle, FaRobot } from "react-icons/fa";




function Topbar({ onAiClick }) {

  return (
    <div className="topbar">

      {/* LEFT: AI FEATURE (MAIN FOCUS) */}
      <div className="ai-search-box" onClick={onAiClick}>

        <FaRobot className="ai-icon" />

        <div className="ai-text">
          <p className="ai-title">Ask PSB AI Wealth Assistant</p>
          <p className="ai-subtitle">
            Grow wealth • Invest smarter • Plan goals
          </p>
        </div>

      </div>

      {/* RIGHT ICONS */}
      <div className="topbar-icons">

        <FaSearch />
        <FaBell />
        <FaUserCircle />

      </div>

    </div>
  );
}

export default Topbar;