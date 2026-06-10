CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    customer_id VARCHAR(20) UNIQUE NOT NULL,

    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contact VARCHAR(15),

    dob DATE,
    occupation VARCHAR(100),
    annual_income DECIMAL(15,2),

    city VARCHAR(100),
    state VARCHAR(100),

    risk_profile VARCHAR(20),
    customer_segment VARCHAR(20),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE accounts (
    account_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,

    bank_name VARCHAR(100) NOT NULL,
    account_type VARCHAR(30) NOT NULL,

    account_number_masked VARCHAR(20) NOT NULL,
    ifsc_code VARCHAR(11),

    balance DECIMAL(15,2) DEFAULT 0,

    linked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);



CREATE TABLE transactions (
    transaction_id BIGSERIAL PRIMARY KEY,

    account_id BIGINT NOT NULL,

    amount DECIMAL(15,2) NOT NULL,

    transaction_type VARCHAR(20) NOT NULL,

    category VARCHAR(50),

    merchant VARCHAR(100),

    transaction_date TIMESTAMP NOT NULL,

    FOREIGN KEY (account_id)
    REFERENCES accounts(account_id)
);


CREATE TABLE asset_types (
    asset_type_id BIGSERIAL PRIMARY KEY,

    asset_name VARCHAR(50) UNIQUE NOT NULL,

    asset_category VARCHAR(30) NOT NULL,

    is_liquid BOOLEAN DEFAULT TRUE,

    valuation_source VARCHAR(30) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE assets (
    asset_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    asset_type_id BIGINT NOT NULL,

    account_reference_id VARCHAR(50),

    asset_name_custom VARCHAR(100),

    current_value DECIMAL(15,4) NOT NULL DEFAULT 0.0000,

    currency VARCHAR(3) DEFAULT 'INR',

    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    FOREIGN KEY (asset_type_id)
        REFERENCES asset_types(asset_type_id)
);


CREATE TABLE asset_history (
    history_id BIGSERIAL PRIMARY KEY,

    asset_id BIGINT NOT NULL,

    recorded_value DECIMAL(15,4) NOT NULL,

    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (asset_id)
        REFERENCES assets(asset_id)
        ON DELETE CASCADE
);


CREATE TABLE goals (
    goal_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    goal_name VARCHAR(100) NOT NULL,

    target_amount DECIMAL(15,2) NOT NULL,

    current_amount DECIMAL(15,2) DEFAULT 0,

    target_date DATE,

    priority VARCHAR(20),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);


CREATE TABLE financial_twin (
    twin_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT UNIQUE NOT NULL,

    monthly_income DECIMAL(15,2),

    monthly_expense DECIMAL(15,2),

    monthly_savings DECIMAL(15,2),

    net_worth DECIMAL(15,2),

    financial_health_score DECIMAL(5,2),

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);



CREATE TABLE recommendations (
    recommendation_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    recommendation_type VARCHAR(50) NOT NULL,

    recommendation_text TEXT NOT NULL,

    confidence_score DECIMAL(5,2),

    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);


CREATE TABLE fraud_alerts (
    fraud_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    transaction_id BIGINT,

    fraud_type VARCHAR(100),

    risk_score DECIMAL(5,2),

    status VARCHAR(20)
        CHECK(status IN ('OPEN','REVIEWED','CLOSED')),

    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    FOREIGN KEY (transaction_id)
        REFERENCES transactions(transaction_id)
);



CREATE TABLE devices (
    device_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    device_name VARCHAR(100),

    device_fingerprint VARCHAR(255),

    is_trusted BOOLEAN DEFAULT FALSE,

    last_login TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);


CREATE TABLE audit_logs (
    log_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    action VARCHAR(100) NOT NULL,

    action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    ip_address VARCHAR(45),

    request_metadata JSONB,

    risk_signal_type VARCHAR(100),

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);


CREATE TABLE risk_assessment_logs (
    assessment_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    transaction_id BIGINT,

    risk_score INTEGER NOT NULL
        CHECK (risk_score BETWEEN 0 AND 100),

    decision_taken VARCHAR(50) NOT NULL,

    explanation_text TEXT,

    input_signals JSONB,

    model_version VARCHAR(50),

    assessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    FOREIGN KEY (transaction_id)
        REFERENCES transactions(transaction_id)
);