##Tech Stack : Postgres, VS Code, DBeaver, Git and GitHub
*********************************************************
##Database Structure: 
1. User and Banking
-users
-account
-transactions
2. Asset Management
-asset_types
-assets
-asset_history
3. Financial Planning
-goals
-financial_twin
4. AI and recommendation
-recommendations
5. Security and Fraud Detection
-fraud_alerts
-devices
-audit_logs
-risk_assesment_logs
*********************************************************
##seed.sql : this is to store the sample records
*********************************************************
##Entity relationship
users
├── accounts
│   └── transactions
│       ├── fraud_alerts
│       └── risk_assessment_logs
│
├── assets
│   ├── asset_types
│   └── asset_history
│
├── goals
├── financial_twin
├── recommendations
├── devices
├── audit_logs
└── risk_assessment_logs
*********************************************************
