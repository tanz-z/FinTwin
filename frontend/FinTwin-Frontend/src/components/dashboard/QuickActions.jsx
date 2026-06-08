import {
  FaPaperPlane,
  FaBolt,
  FaCreditCard,
  FaPiggyBank
} from "react-icons/fa";

function QuickActions() {
  return (
    <div className="quick-actions">

      <h3>Quick Actions</h3>
      <br/>

      <div className="actions-grid">

        <div className="action-card">
          <FaPaperPlane />
          <p>Transfer</p>
        </div>

        <div className="action-card">
          <FaBolt />
          <p>Pay Bills</p>
        </div>

        <div className="action-card">
          <FaCreditCard />
          <p>Recharge</p>
        </div>

        <div className="action-card">
          <FaPiggyBank />
          <p>Save</p>
        </div>

      </div>

    </div>
  );
}

export default QuickActions;