import { useMemo, useState } from 'react';
import '../../../App.css';
import "./LoanToptext.css";

// ---------------------------------------------------------------------------
// Loan catalog — replace rates/limits with your actual product data
// ---------------------------------------------------------------------------

const LOAN_TYPES = [
  {
    id: 'personal',
    label: 'Personal Loan',
    rateRange: [10.5, 18],
    defaultRate: 12.5,
    amount: { min: 25000, max: 2500000, default: 500000, step: 5000 },
    tenure: { min: 1, max: 7, default: 5 },
    tagline: 'No collateral, quick disbursal for whatever life throws at you.',
    features: [
      'Disbursal in as little as 24 hours',
      'No collateral or guarantor required',
      'Flexible tenure from 1 to 7 years',
      'Minimal documentation, fully digital',
    ],
    eligibility: [
      'Age 21–60 years',
      'Minimum net monthly income ₹25,000',
      'Salaried or self-employed with 2+ years of income proof',
      'Credit score of 700 or above preferred',
    ],
    documents: ['PAN card', 'Aadhaar card', 'Last 3 months salary slips', '6-month bank statement'],
  },
  {
    id: 'home',
    label: 'Home Loan',
    rateRange: [8.4, 10.5],
    defaultRate: 8.9,
    amount: { min: 500000, max: 20000000, default: 3500000, step: 50000 },
    tenure: { min: 5, max: 30, default: 20 },
    tagline: 'Own your home with long tenures and among the lowest rates on offer.',
    features: [
      'Loan up to 90% of property value',
      'Tenure up to 30 years',
      'Balance transfer with top-up available',
      'Doorstep document collection',
    ],
    eligibility: [
      'Age 21–65 years (at loan maturity)',
      'Stable income source, salaried or self-employed',
      'Property with clear title',
      'Credit score of 700 or above preferred',
    ],
    documents: ['PAN & Aadhaar', 'Income proof / ITR', 'Property documents', 'Bank statements (6 months)'],
  },
  {
    id: 'lap',
    label: 'Loan Against Property',
    rateRange: [9.5, 13],
    defaultRate: 10.75,
    amount: { min: 500000, max: 15000000, default: 2000000, step: 50000 },
    tenure: { min: 5, max: 20, default: 15 },
    tagline: 'Unlock the value of property you already own for any purpose.',
    features: [
      'Loan up to 65% of market value',
      'Use funds for business or personal needs',
      'Longer tenure keeps EMIs manageable',
      'Overdraft variant available',
    ],
    eligibility: [
      'Age 25–65 years',
      'Owned, unencumbered residential or commercial property',
      'Stable, provable income',
      'Credit score of 700 or above preferred',
    ],
    documents: ['PAN & Aadhaar', 'Property title documents', 'Income proof / ITR', 'Bank statements (6 months)'],
  },
  {
    id: 'car',
    label: 'Car Loan',
    rateRange: [8.7, 12],
    defaultRate: 9.25,
    amount: { min: 100000, max: 5000000, default: 800000, step: 10000 },
    tenure: { min: 1, max: 7, default: 5 },
    tagline: 'Finance up to 90% of your new or used car on-road price.',
    features: [
      'Up to 90% on-road funding',
      'Same-day approval in most cases',
      'New and used car options',
      'No foreclosure charges after 6 EMIs',
    ],
    eligibility: [
      'Age 21–65 years',
      'Minimum net monthly income ₹20,000',
      'Salaried or self-employed with steady income',
      'Valid driving license (for individual applicants)',
    ],
    documents: ['PAN & Aadhaar', 'Income proof', 'Bank statements (3 months)', 'Vehicle quotation/invoice'],
  },
  {
    id: 'education',
    label: 'Education Loan',
    rateRange: [9, 12.5],
    defaultRate: 9.75,
    amount: { min: 50000, max: 4000000, default: 1000000, step: 10000 },
    tenure: { min: 5, max: 15, default: 10 },
    tagline: 'Cover tuition, travel and living costs for study in India or abroad.',
    features: [
      'Covers tuition, hostel and travel costs',
      'Moratorium period during the course',
      'Tax benefit under Section 80E',
      'Co-applicant income considered',
    ],
    eligibility: [
      'Indian national with confirmed admission',
      'Co-applicant (parent/guardian) required',
      'Recognized institution in India or abroad',
      'Collateral required above ₹750,000 (varies by lender policy)',
    ],
    documents: ['Admission letter', 'Fee structure', 'PAN & Aadhaar (applicant & co-applicant)', 'Academic records'],
  },
];

const currency = (n) =>
  Math.round(n).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

function LoanCalculator() {
  const [activeId, setActiveId] = useState(LOAN_TYPES[0].id);
  const loan = LOAN_TYPES.find((l) => l.id === activeId);

  const [amount, setAmount] = useState(loan.amount.default);
  const [tenure, setTenure] = useState(loan.tenure.default);
  const [rate, setRate] = useState(loan.defaultRate);

  const selectLoan = (l) => {
    setActiveId(l.id);
    setAmount(l.amount.default);
    setTenure(l.tenure.default);
    setRate(l.defaultRate);
  };

  const { emi, totalPayable, totalInterest } = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const months = tenure * 12;
    const e =
      monthlyRate === 0
        ? amount / months
        : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const payable = e * months;
    return { emi: e, totalPayable: payable, totalInterest: payable - amount };
  }, [amount, tenure, rate]);

  return (
    <div className="loans-page">
      <section className="lp-intro">
        <h1>Loans built around what you're financing</h1>
        <p>Pick a loan type to see rates, eligibility and an estimated EMI before you apply.</p>
      </section>

      {/* Loan type selector */}
      <section className="lp-type-tabs" role="tablist">
        {LOAN_TYPES.map((l) => (
          <button
            key={l.id}
            role="tab"
            aria-selected={activeId === l.id}
            className={`lp-type-tab ${activeId === l.id ? 'lp-type-tab--active' : ''}`}
            onClick={() => selectLoan(l)}
            type="button"
          >
            {l.label}
          </button>
        ))}
      </section>

      <section className="lp-overview">
        <p className="lp-tagline">{loan.tagline}</p>
        <div className="lp-stat-row">
          <div className="lp-stat">
            <span>Interest Rate</span>
            <strong>{loan.rateRange[0]}% – {loan.rateRange[1]}% p.a.</strong>
          </div>
          <div className="lp-stat">
            <span>Loan Amount</span>
            <strong>{currency(loan.amount.min)} – {currency(loan.amount.max)}</strong>
          </div>
          <div className="lp-stat">
            <span>Tenure</span>
            <strong>{loan.tenure.min} – {loan.tenure.max} years</strong>
          </div>
        </div>
      </section>

      {/* Features / eligibility / documents */}
      <section className="lp-details">
        <div className="lp-detail-card">
          <h3>Why this loan</h3>
          <ul>
            {loan.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div className="lp-detail-card">
          <h3>Eligibility</h3>
          <ul>
            {loan.eligibility.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div className="lp-detail-card">
          <h3>Documents required</h3>
          <ul>
            {loan.documents.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
      </section>

      {/* EMI calculator */}
      <section className="lp-calc">
        <h2 className="lp-calc-heading">{loan.label} EMI Calculator</h2>
        <div className="lp-calc-grid">
          <div className="lp-calc-panel">
            <CalcField
              label="Loan Amount"
              value={amount}
              min={loan.amount.min}
              max={loan.amount.max}
              step={loan.amount.step}
              onChange={setAmount}
              minLabel={currency(loan.amount.min)}
              maxLabel={currency(loan.amount.max)}
            />
            <CalcField
              label="Loan Tenure"
              value={tenure}
              min={loan.tenure.min}
              max={loan.tenure.max}
              step={1}
              onChange={setTenure}
              minLabel={`${loan.tenure.min} year${loan.tenure.min > 1 ? 's' : ''}`}
              maxLabel={`${loan.tenure.max} years`}
            />
            <CalcField
              label="Interest Rate"
              value={rate}
              min={loan.rateRange[0]}
              max={loan.rateRange[1]}
              step={0.05}
              onChange={setRate}
              minLabel={`${loan.rateRange[0]}% PA`}
              maxLabel={`${loan.rateRange[1]}% PA`}
            />
          </div>

          <div className="lp-calc-result">
            <div className="lp-result-highlight">
              <p>Your Monthly EMI will be</p>
              <p className="lp-result-amount">{currency(emi)}</p>
            </div>
            <div className="lp-result-row">
              <span>Amount Payable</span>
              <strong>{currency(totalPayable)}</strong>
            </div>
            <div className="lp-result-row">
              <span>Interest Amount</span>
              <strong>{currency(totalInterest)}</strong>
            </div>
            <div className="lp-result-row">
              <span>Principal Amount</span>
              <strong>{currency(amount)}</strong>
            </div>
            <div className="lp-result-actions">
              <button className="lp-btn lp-btn--primary" type="button">Apply Now →</button>
              <button className="lp-btn lp-btn--ghost" type="button">Know More →</button>
            </div>
          </div>
        </div>
        <p className="lp-disclaimer">
          EMI shown is indicative, based on the reducing-balance method at the rate you set. Final
          rate and eligibility depend on your credit profile and are confirmed on application.
        </p>
      </section>
    </div>
  );
}

function CalcField({ label, value, min, max, step, onChange, minLabel, maxLabel }) {
  return (
    <div className="lp-field">
      <div className="lp-field-head">
        <label>{label}</label>
        <input
          className="lp-field-input"
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
      <input
        className="lp-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="lp-field-range">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export default LoanCalculator;