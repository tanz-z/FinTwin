
import { motion } from "framer-motion";
import "./investments.css";

const investments = [
  {
    name: "Mutual Funds",
    risk: "Medium",
    returns: "10–15%",
    tenure: "Flexible",
    liquidity: "High",
    tax: "Depends",
    best: "Long-Term Wealth",
  },
  {
    name: "Fixed Deposit",
    risk: "Low",
    returns: "6–8%",
    tenure: "7 Days - 10 Years",
    liquidity: "Medium",
    tax: "Taxable",
    best: "Safe Savings",
  },
  {
    name: "Recurring Deposit",
    risk: "Low",
    returns: "6–7%",
    tenure: "6 Months - 10 Years",
    liquidity: "Low",
    tax: "Taxable",
    best: "Monthly Saving",
  },
  {
    name: "PPF",
    risk: "Very Low",
    returns: "7–8%",
    tenure: "15 Years",
    liquidity: "Low",
    tax: "Tax Free",
    best: "Retirement",
  },
  {
    name: "Stocks",
    risk: "High",
    returns: "Variable",
    tenure: "Flexible",
    liquidity: "High",
    tax: "Capital Gains",
    best: "High Growth",
  },
  {
    name: "Gold",
    risk: "Medium",
    returns: "Market Linked",
    tenure: "Flexible",
    liquidity: "High",
    tax: "Capital Gains",
    best: "Hedge Against Inflation",
  },
];

const getRiskClass = (risk) => {
  switch (risk) {
    case "Very Low":
      return "risk very-low";
    case "Low":
      return "risk low";
    case "Medium":
      return "risk medium";
    default:
      return "risk high";
  }
};

const CompareTable = () => {
  return (
    <section className="compare-section">

      <motion.div
        className="compare-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span>Compare Investments</span>

        <h2>Find the Right Investment for You</h2>

        <p>
          Compare different investment products based on risk,
          expected returns, tenure, liquidity, tax treatment,
          and financial goals.
        </p>
      </motion.div>

      <motion.div
        className="table-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >

        <table>

          <thead>

            <tr>
              <th>Investment</th>
              <th>Risk</th>
              <th>Returns</th>
              <th>Tenure</th>
              <th>Liquidity</th>
              <th>Tax</th>
              <th>Best For</th>
            </tr>

          </thead>

          <tbody>

            {investments.map((item, index) => (

              <tr key={index}>

                <td>{item.name}</td>

                <td>
                  <span className={getRiskClass(item.risk)}>
                    {item.risk}
                  </span>
                </td>

                <td>
                  <span className="returns-chip">
                    {item.returns}
                  </span>
                </td>

                <td>{item.tenure}</td>

                <td>{item.liquidity}</td>

                <td>{item.tax}</td>

                <td>{item.best}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </motion.div>

    </section>
  );
};

export default CompareTable;