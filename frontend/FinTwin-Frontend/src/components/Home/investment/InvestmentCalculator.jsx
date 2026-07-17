import { useMemo, useState } from 'react';
import '../../../App.css';
import './investments.css';

// ---------------------------------------------------------------------------
// Tabs: each maps to a calculation mode
//  - 'periodic'  → SIP-style: a recurring monthly contribution, compounded monthly
//  - 'lumpsum'   → a one-time amount, compounded annually
// ---------------------------------------------------------------------------

const TABS = [
  { id: 'sip', label: 'SIP', mode: 'periodic' },
  { id: 'lumpsum', label: 'Lumpsum', mode: 'lumpsum' },
  { id: 'fd', label: 'Fixed Deposit', mode: 'lumpsum' },
  { id: 'rd', label: 'Recurring Deposit', mode: 'periodic' },
  { id: 'ppf', label: 'PPF', mode: 'periodic' },
];

const currency = (n) =>
  Math.round(n).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

function InvestmentCalculator() {
  const [activeTab, setActiveTab] = useState('sip');
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const tab = TABS.find((t) => t.id === activeTab);

  const { maturity, invested, returns } = useMemo(() => {
    if (tab.mode === 'periodic') {
      const monthlyRate = rate / 100 / 12;
      const months = years * 12;
      const fv =
        monthlyRate === 0
          ? amount * months
          : amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      const inv = amount * months;
      return { maturity: fv, invested: inv, returns: fv - inv };
    }
    const fv = amount * Math.pow(1 + rate / 100, years);
    return { maturity: fv, invested: amount, returns: fv - amount };
  }, [tab.mode, amount, years, rate]);

  const amountLabel = tab.mode === 'periodic' ? 'Monthly Investment' : 'Investment Amount';
  const amountMin = tab.mode === 'periodic' ? 500 : 5000;
  const amountMax = tab.mode === 'periodic' ? 100000 : 5000000;
  const amountStep = tab.mode === 'periodic' ? 500 : 5000;

  return (
    <div className="investment-page">

      {/* Calculator */}
      <section className="ip-calc">
        <div className="ip-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              className={`ip-tab ${activeTab === t.id ? 'ip-tab--active' : ''}`}
              onClick={() => setActiveTab(t.id)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="ip-calc-grid">
          {/* Inputs */}
          <div className="ip-calc-panel">
            <CalcField
              label={amountLabel}
              value={amount}
              min={amountMin}
              max={amountMax}
              step={amountStep}
              onChange={setAmount}
              minLabel={`₹${amountMin.toLocaleString('en-IN')}`}
              maxLabel={`₹${amountMax.toLocaleString('en-IN')}`}
            />
            <CalcField
              label="Investment Duration"
              value={years}
              min={1}
              max={30}
              step={1}
              onChange={setYears}
              minLabel="1 year"
              maxLabel="30 years"
              suffix=" yr"
            />
            <CalcField
              label="Expected Return Rate"
              value={rate}
              min={1}
              max={20}
              step={0.1}
              onChange={setRate}
              minLabel="1% PA"
              maxLabel="20% PA"
              suffix="%"
            />
          </div>

          {/* Results */}
          <div className="ip-calc-result">
            <div className="ip-result-highlight">
              <p>Estimated Maturity Value</p>
              <p className="ip-result-amount">{currency(maturity)}</p>
            </div>
            <div className="ip-result-row">
              <span>Invested Amount</span>
              <strong>{currency(invested)}</strong>
            </div>
            <div className="ip-result-row">
              <span>Estimated Returns</span>
              <strong>{currency(returns)}</strong>
            </div>
            <div className="ip-result-actions">
              <button className="ip-btn ip-btn--primary" type="button">Start Investing →</button>
              <button className="ip-btn ip-btn--ghost" type="button">Know More →</button>
            </div>
          </div>
        </div>

        <p className="ip-disclaimer">
          This is an estimate for illustration only, based on the rate you set. Actual returns for
          market-linked products aren't guaranteed and will vary.
        </p>
      </section>
    </div>
  );
}

function CalcField({ label, value, min, max, step, onChange, minLabel, maxLabel, suffix = '' }) {
  return (
    <div className="ip-field">
      <div className="ip-field-head">
        <label>{label}</label>
        <div className="ip-field-input-row">
          <input
            className="ip-field-input"
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(Number(e.target.value))}
          />
          {suffix && <span className="ip-field-suffix">{suffix}</span>}
        </div>
      </div>
      <input
        className="ip-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="ip-field-range">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export default InvestmentCalculator;