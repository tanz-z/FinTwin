import psycopg2

# ==========================================
# DATABASE CONNECTION
# ==========================================

conn = psycopg2.connect(
    host="localhost",
    database="fintwin",
    user="postgres",
    password="postgres123",
    port="5432"
)

cursor = conn.cursor()

print("Connected to PostgreSQL")

# ==========================================
# FETCH USERS
# ==========================================

cursor.execute("""
SELECT
    user_id,
    annual_income
FROM users
""")

users = cursor.fetchall()

print(f"Found {len(users)} users")

# ==========================================
# BUILD FINANCIAL TWIN
# ==========================================

for user in users:

    user_id = user[0]
    annual_income = float(user[1] or 0)

    # ----------------------------
    # Monthly Income
    # ----------------------------

    monthly_income = annual_income / 12

    # ----------------------------
    # Account Balance
    # ----------------------------

    cursor.execute("""
    SELECT COALESCE(SUM(balance),0)
    FROM accounts
    WHERE user_id = %s
    """, (user_id,))

    account_balance = float(
        cursor.fetchone()[0] or 0
    )

    # ----------------------------
    # Asset Value
    # ----------------------------

    cursor.execute("""
    SELECT COALESCE(SUM(current_value),0)
    FROM assets
    WHERE user_id = %s
    """, (user_id,))

    asset_value = float(
        cursor.fetchone()[0] or 0
    )

    # ----------------------------
    # Net Worth
    # ----------------------------

    net_worth = (
        account_balance +
        asset_value
    )

    # ----------------------------
    # Monthly Expense
    # Based on Debit Transactions
    # ----------------------------

    cursor.execute("""
    SELECT COALESCE(SUM(t.amount),0)
    FROM transactions t
    JOIN accounts a
        ON t.account_id = a.account_id
    WHERE a.user_id = %s
    AND t.transaction_type = 'DEBIT'
    """, (user_id,))

    total_debit = float(
        cursor.fetchone()[0] or 0
    )

    # Data covers ~6 months

    monthly_expense = total_debit / 6

    # ----------------------------
    # Monthly Savings
    # ----------------------------

    monthly_savings = (
        monthly_income -
        monthly_expense
    )

    # ----------------------------
    # Financial Health Score
    # ----------------------------

    if monthly_income > 0:

        savings_ratio = (
            monthly_savings /
            monthly_income
        )

        financial_health_score = max(
            0,
            min(
                100,
                round(
                    savings_ratio * 100,
                    2
                )
            )
        )

    else:

        financial_health_score = 0

    # ----------------------------
    # Insert / Update
    # ----------------------------

    cursor.execute("""
    INSERT INTO financial_twin(
        user_id,
        monthly_income,
        monthly_expense,
        monthly_savings,
        net_worth,
        financial_health_score
    )
    VALUES (
        %s,%s,%s,%s,%s,%s
    )

    ON CONFLICT (user_id)

    DO UPDATE SET

        monthly_income =
            EXCLUDED.monthly_income,

        monthly_expense =
            EXCLUDED.monthly_expense,

        monthly_savings =
            EXCLUDED.monthly_savings,

        net_worth =
            EXCLUDED.net_worth,

        financial_health_score =
            EXCLUDED.financial_health_score,

        last_updated =
            CURRENT_TIMESTAMP
    """,
    (
        user_id,
        round(monthly_income, 2),
        round(monthly_expense, 2),
        round(monthly_savings, 2),
        round(net_worth, 2),
        financial_health_score
    ))

# ==========================================
# COMMIT
# ==========================================

conn.commit()

print("Financial Twin populated successfully")

# ==========================================
# VERIFY
# ==========================================

cursor.execute("""
SELECT COUNT(*)
FROM financial_twin
""")

count = cursor.fetchone()[0]

print(
    f"Rows in financial_twin: {count}"
)

# ==========================================
# CLEANUP
# ==========================================

cursor.close()
conn.close()

print("Connection closed")