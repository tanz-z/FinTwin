import React from 'react';
import "../App.css";

const loanTypes = [
  {
    title: "Home Loan",
    
    rate: "8.35% p.a.",
    tenure: "Up to 30 Years",
    amount: "Up to ₹5 Crore",
  },
  {
    title: "Vehicle Loan",
   
    rate: "8.75% p.a.",
    tenure: "Up to 7 Years",
    amount: "Up to ₹1 Crore",
  },
  {
    title: "Education Loan",

    rate: "8.10% p.a.",
    tenure: "Up to 15 Years",
    amount: "As per eligibility",
  },
  {
    title: "Personal Loan",

    rate: "10.50% p.a.",
    tenure: "Up to 5 Years",
    amount: "Up to ₹40 Lakh",
  }
];

function Loans() {
  return (
    <div className="loans align-center sm-2">

      <div className="row">
        <div className="col-12 sm-4 md-4 lg-4">

    

      <section className="loan-hero">
        <h1>Loans for Every Dream</h1>
        <p>
          Competitive interest rates with quick approvals and flexible repayment
          options.
        </p>

        <div className="hero-buttons">
          <button>Apply Now</button>
          <button className="outline">EMI Calculator</button>
        </div>
      </section>

      <section className="loan-grid">

        {loanTypes.map((loan, index) => (

          <div className="loan-card" key={index}>

          

            <h3>{loan.title}</h3>

            <p><strong>Interest:</strong> {loan.rate}</p>

            <p><strong>Tenure:</strong> {loan.tenure}</p>

            <p><strong>Amount:</strong> {loan.amount}</p>

            <button>Know More</button>

          </div>

        ))}

      </section>

    </div>
      </div>
      </div>
  );
}

export default Loans;