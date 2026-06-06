import json
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
# LOAD JSON FILES
# ==========================================

with open("users.json", "r") as f:
    users = json.load(f)

with open("accounts.json", "r") as f:
    accounts = json.load(f)

with open("transactions.json", "r") as f:
    transactions = json.load(f)

with open("goals.json", "r") as f:
    goals = json.load(f)

with open("assets.json", "r") as f:
    assets = json.load(f)

print("JSON files loaded")

# ==========================================
# INSERT ASSET TYPES
# ==========================================

asset_types = [
    ("Nifty 50 Index Fund", "Equity", True, "NSE_API"),
    ("Digital Gold", "Commodity", True, "Augmont"),
    ("Fixed Deposit", "Cash_Equivalent", False, "Bank_Internal"),
    ("Government Bonds", "Debt", True, "RBI_API"),
    ("Real Estate", "Property", False, "Manual_Appraisal"),
    ("PPF", "Retirement", False, "Government"),
    ("Mutual Fund", "Equity", True, "AMFI_API")
]

for asset_type in asset_types:

    cursor.execute(
        """
        INSERT INTO asset_types (
            asset_name,
            asset_category,
            is_liquid,
            valuation_source
        )
        VALUES (%s,%s,%s,%s)
        ON CONFLICT (asset_name)
        DO NOTHING
        """,
        asset_type
    )

conn.commit()

print("Asset types inserted")

# ==========================================
# FETCH ASSET TYPE IDS
# ==========================================

cursor.execute(
    """
    SELECT asset_type_id, asset_name
    FROM asset_types
    """
)

asset_type_map = {}

for asset_type_id, asset_name in cursor.fetchall():

    asset_type_map[asset_name] = asset_type_id

# ==========================================
# INSERT USERS
# ==========================================

user_map = {}

for user in users:

    cursor.execute(
        """
        INSERT INTO users (
            customer_id,
            full_name,
            email,
            contact,
            dob,
            occupation,
            annual_income,
            city,
            state,
            risk_profile,
            customer_segment,
            created_at
        )
        VALUES (
            %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s
        )
        RETURNING user_id
        """,
        (
            user["customer_id"],
            user["full_name"],
            user["email"],
            user["contact"],
            user["dob"],
            user["occupation"],
            user["annual_income"],
            user["city"],
            user["state"],
            user["risk_profile"],
            user["customer_segment"],
            user["created_at"]
        )
    )

    user_id = cursor.fetchone()[0]

    user_map[user["customer_id"]] = user_id

conn.commit()

print("Users inserted")

# ==========================================
# INSERT ACCOUNTS
# ==========================================

account_ids = []

for account in accounts:

    user_id = user_map[
        account["customer_id"]
    ]

    cursor.execute(
        """
        INSERT INTO accounts (
            user_id,
            bank_name,
            account_type,
            account_number_masked,
            ifsc_code,
            balance,
            linked_at
        )
        VALUES (
            %s,%s,%s,%s,%s,%s,%s
        )
        RETURNING account_id
        """,
        (
            user_id,
            account["bank_name"],
            account["account_type"],
            account["account_number_masked"],
            account["ifsc_code"],
            account["balance"],
            account["linked_at"]
        )
    )

    account_ids.append(
        cursor.fetchone()[0]
    )

conn.commit()

print("Accounts inserted")

# ==========================================
# INSERT GOALS
# ==========================================

for goal in goals:

    user_id = user_map[
        goal["customer_id"]
    ]

    cursor.execute(
        """
        INSERT INTO goals (
            user_id,
            goal_name,
            target_amount,
            current_amount,
            target_date,
            priority
        )
        VALUES (
            %s,%s,%s,%s,%s,%s
        )
        """,
        (
            user_id,
            goal["goal_name"],
            goal["target_amount"],
            goal["current_amount"],
            goal["target_date"],
            goal["priority"]
        )
    )

conn.commit()

print("Goals inserted")

# ==========================================
# INSERT ASSETS
# ==========================================

for asset in assets:

    user_id = user_map[
        asset["customer_id"]
    ]

    asset_type_id = asset_type_map[
        asset["asset_type_name"]
    ]

    cursor.execute(
        """
        INSERT INTO assets (
            user_id,
            asset_type_id,
            account_reference_id,
            asset_name_custom,
            current_value,
            currency,
            last_updated_at
        )
        VALUES (
            %s,%s,%s,%s,%s,%s,%s
        )
        """,
        (
            user_id,
            asset_type_id,
            asset["account_reference_id"],
            asset["asset_name_custom"],
            asset["current_value"],
            asset["currency"],
            asset["last_updated_at"]
        )
    )

conn.commit()

print("Assets inserted")

# ==========================================
# INSERT TRANSACTIONS
# ==========================================

for transaction in transactions:

    account_id = account_ids[
        0 if len(account_ids) == 1 else
        __import__("random").randint(
            0,
            len(account_ids) - 1
        )
    ]

    cursor.execute(
        """
        INSERT INTO transactions (
            account_id,
            amount,
            transaction_type,
            category,
            merchant,
            transaction_date
        )
        VALUES (
            %s,%s,%s,%s,%s,%s
        )
        """,
        (
            account_id,
            transaction["amount"],
            transaction["transaction_type"],
            transaction["category"],
            transaction["merchant"],
            transaction["transaction_date"]
        )
    )

conn.commit()

print("Transactions inserted")

# ==========================================
# FINISH
# ==========================================

cursor.close()
conn.close()

print("\nAll data inserted successfully.")