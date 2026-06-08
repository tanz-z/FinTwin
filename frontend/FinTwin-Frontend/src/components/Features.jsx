import {
  FaMoneyCheckAlt,
  FaMobileAlt,
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaFileInvoice
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaMoneyCheckAlt />,
      title: "Fund Transfer",
      desc: "Transfer money securely and instantly."
    },

    {
      icon: <FaMobileAlt />,
      title: "UPI Payments",
      desc: "Fast and seamless digital payments."
    },

    {
      icon: <FaRobot />,
      title: "AI Assistant",
      desc: "Get personalized financial guidance."
    },

    {
      icon: <FaShieldAlt />,
      title: "Cyber Security",
      desc: "Advanced protection against fraud."
    },

    {
      icon: <FaChartLine />,
      title: "Investment Insights",
      desc: "Track and grow your wealth smarter."
    },

    {
      icon: <FaFileInvoice />,
      title: "Account Statements",
      desc: "Access detailed transaction records."
    }
  ];

  return (
    <section className="features">

      <h2>Banking Made Smarter</h2>

      <div className="features-grid">

        {features.map((feature, index) => (
          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;