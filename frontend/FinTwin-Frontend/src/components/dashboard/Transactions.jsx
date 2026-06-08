function Transactions() {
  const data = [
    { name: "Amazon", amount: "-₹2,499", type: "debit" },
    { name: "Salary", amount: "+₹50,000", type: "credit" },
    { name: "Swiggy", amount: "-₹350", type: "debit" },
  ];

  return (
    <div className="transactions">

      <h3>Recent Transactions</h3>

      {data.map((item, i) => (
        <div key={i} className="txn-row">

          <span>{item.name}</span>

          <span className={item.type}>
            {item.amount}
          </span>

        </div>
      ))}

    </div>
  );
}

export default Transactions;