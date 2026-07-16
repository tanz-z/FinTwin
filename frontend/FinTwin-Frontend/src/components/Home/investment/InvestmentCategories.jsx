
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaPiggyBank,
  FaUniversity,
  FaCoins,
  FaLandmark,
  FaChartPie,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import "./investments.css";

const categories = [
  {
    title: "Mutual Funds",
    icon: <FaChartPie />,
    desc: "Professionally managed funds for diversified long-term growth.",
    risk: "Medium Risk",
    color: "#4F46E5",
  },
  {
    title: "Fixed Deposit",
    icon: <FaUniversity />,
    desc: "Guaranteed returns with minimal investment risk.",
    risk: "Low Risk",
    color: "#16A34A",
  },
  {
    title: "Stocks",
    icon: <FaChartLine />,
    desc: "Invest directly in listed companies for higher growth.",
    risk: "High Risk",
    color: "#EA580C",
  },
  {
    title: "Gold",
    icon: <FaCoins />,
    desc: "Protect wealth against inflation with digital gold.",
    risk: "Medium Risk",
    color: "#CA8A04",
  },
  {
    title: "PPF",
    icon: <FaLandmark />,
    desc: "Government-backed long-term savings with tax benefits.",
    risk: "Very Low Risk",
    color: "#0284C7",
  },
  {
    title: "Recurring Deposit",
    icon: <FaPiggyBank />,
    desc: "Save every month while earning fixed interest.",
    risk: "Low Risk",
    color: "#0F766E",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const InvestmentCategories = () => {
  return (
    <section className="investment-categories">

      <motion.div
        className="categories-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span>Investment Options</span>

        <h2>
          Explore Investment Categories
        </h2>

        <p>
          Choose from a range of investment products designed for different
          financial goals, risk appetites, and investment horizons.
        </p>
      </motion.div>

      <motion.div
        className="categories-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {categories.map((item, index) => (
          <motion.div
            key={index}
            className="investment-card"
            variants={card}
            whileHover={{
              y: -10,
              transition: { duration: 0.25 },
            }}
          >
            <div
              className="investment-icon"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

            <div className="investment-footer">
              <span>{item.risk}</span>

              <FaArrowRight className="arrow-icon" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="investment-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <FaShieldAlt />

        <p>
          All investment options carry different levels of risk. Review product
          details carefully before investing.
        </p>
      </motion.div>

    </section>
  );
};

export default InvestmentCategories;