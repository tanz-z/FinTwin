import { FaTimes, FaRobot } from "react-icons/fa";

function AiPanel({ open, onClose }) {
  return (
    <div className={`ai-panel ${open ? "open" : ""}`}>

      <div className="ai-header">
        <FaRobot />
        <h3>PSB AI Wealth Assistant</h3>
        <FaTimes onClick={onClose} className="close-icon" />
      </div>

      <div className="ai-body">

        <div className="ai-msg bot">
          Hi! I can help you grow your wealth.
        </div>

        <div className="ai-msg bot">
          Try: "How can I save more money?"
        </div>

      </div>

      <div className="ai-input">
        <input placeholder="Ask about savings, investments..." />
        <button>Send</button>
      </div>

    </div>
  );
}

export default AiPanel;
