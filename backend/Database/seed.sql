-- 1. INSERT MOCK USERS
-- Generates individual retail clients and business accounts for testing
INSERT INTO users (user_id, customer_id, full_name, email, contact, dob, occupation, annual_income, city, state, risk_profile, customer_segment) VALUES
(1, 'CUST1001', 'Tanya Gupta', 'tanya@securewealth.com', '+919876543210', '2004-02-12', 'Software Engineer', 1200000.00, 'Meerut', 'Uttar Pradesh', 'Moderate', 'Retail'),
(2, 'CUST1002', 'Aarav Sharma', 'aarav@securewealth.com', '+919999888777', '1995-08-20', 'Data Scientist', 1800000.00, 'Noida', 'Delhi NCR', 'Aggressive', 'Retail'),
(3, 'CUST1003', 'FinTwin Enterprises', 'ops@fintwincorp.com', '+91114567890', NULL, 'Corporate Entity', 15000000.00, 'New Delhi', 'Delhi', 'Conservative', 'Corporate');

-- 2. INSERT MOCK ACCOUNTS
-- Links bank balances to users via Account Aggregator simulation
INSERT INTO accounts (account_id, user_id, bank_name, account_type, account_number_masked, ifsc_code, balance) VALUES
(10, 1, 'State Bank of India', 'Savings', 'XXXXXX1234', 'SBIN0001234', 75000.00),
(11, 1, 'HDFC Bank', 'Salary', 'XXXXXX5678', 'HDFC0000456', 120000.00),
(12, 2, 'ICICI Bank', 'Savings', 'XXXXXX9876', 'ICIC0000111', 450000.00),
(13, 3, 'Axis Bank', 'Current', 'XXXXXX0000', 'UTIB0000222', 2500000.00);

-- 3. INSERT BASELINE HISTORICAL TRANSACTIONS
-- Gives your engine a statistical history to compute "Amount Deviation" (Sign 3)
INSERT INTO transactions (transaction_id, account_id, amount, transaction_type, category, merchant, transaction_date) VALUES
(100, 10, 1500.00, 'DEBIT', 'Food', 'Zomato', CURRENT_TIMESTAMP - INTERVAL '5 days'),
(101, 10, 800.00, 'DEBIT', 'Travel', 'Uber', CURRENT_TIMESTAMP - INTERVAL '3 days'),
(102, 11, 95000.00, 'CREDIT', 'Salary', 'Amity Corp', CURRENT_TIMESTAMP - INTERVAL '10 days'),
(103, 11, 12000.00, 'DEBIT', 'Investment', 'Zerodha SIP', CURRENT_TIMESTAMP - INTERVAL '1 days'),
(104, 12, 5000.00, 'DEBIT', 'Shopping', 'Amazon', CURRENT_TIMESTAMP - INTERVAL '2 days');

-- 4. INSERT ASSET TYPES
INSERT INTO asset_types (asset_type_id, asset_name, asset_category, is_liquid, valuation_source) VALUES
(1, 'Digital Gold', 'Commodity', TRUE, 'Live Bullion API'),
(2, 'Mutual Funds (SIP)', 'Equity', TRUE, 'NAV Direct Feed'),
(3, 'Real Estate Property', 'Fixed Asset', FALSE, 'Circle Rate Registry');

-- 5. INSERT CURRENT ASSETS
-- Populates the asset landscape for total Net Worth calculations
INSERT INTO assets (asset_id, user_id, asset_type_id, account_reference_id, asset_name_custom, current_value, currency) VALUES
(50, 1, 1, 'GOLD-099', 'Sovereign Gold Bonds', 50000.0000, 'INR'),
(51, 1, 2, 'MF-HDFC-99', 'HDFC Top 100 Index Fund', 140000.0000, 'INR'),
(52, 2, 3, 'PROP-NOIDA', 'Sector 62 Apartment', 6500000.0000, 'INR');

-- 6. INSERT FINANCIAL GOALS
INSERT INTO goals (goal_id, user_id, goal_name, target_amount, current_amount, target_date, priority) VALUES
(201, 1, 'Higher Education / Japan Certifications', 200000.00, 40000.00, '2027-04-01', 'High'),
(202, 1, 'Emergency Fund Build', 300000.00, 195000.00, '2026-12-31', 'Medium');

-- 7. INSERT VERIFIED TRUSTED DEVICES
-- Ensures Sign 1 (Device Trust) can pass cleanly or fail correctly
INSERT INTO devices (device_id, user_id, device_name, device_fingerprint, is_trusted, last_login) VALUES
(301, 1, 'Tanya Laptop (VS Code Editor)', 'trusted_device_001', TRUE, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
(302, 2, 'Aarav iPhone', 'aarav_ios_fingerprint', TRUE, CURRENT_TIMESTAMP - INTERVAL '1 days');

-- 8. INITIALIZE THE DIGITAL WEALTH TWIN PROFILE
INSERT INTO financial_twin (twin_id, user_id, monthly_income, monthly_expense, monthly_savings, net_worth, financial_health_score) VALUES
(401, 1, 95000.00, 45000.00, 50000.00, 385000.00, 82.50);