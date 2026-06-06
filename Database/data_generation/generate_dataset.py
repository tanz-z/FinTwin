import random
import json
from datetime import date, datetime

from generator import (
    generate_user,
    generate_account,
    generate_transaction,
    generate_goal,
    generate_asset
)

# ==========================================
# CONFIG
# ==========================================

NUM_USERS = 100
NUM_ACCOUNTS = 200
NUM_TRANSACTIONS = 5000
NUM_GOALS = 200
NUM_ASSETS = 200

# ==========================================
# DATA CONTAINERS
# ==========================================

users = []
accounts = []
transactions = []
goals = []
assets = []

# ==========================================
# JSON SERIALIZER
# ==========================================

def json_serializer(obj):
    if isinstance(obj, (date, datetime)):
        return obj.isoformat()

    raise TypeError(
        f"Type {type(obj)} not serializable"
    )

# ==========================================
# GENERATE USERS
# ==========================================

print("Generating users...")

for i in range(1, NUM_USERS + 1):

    user = generate_user(i)

    users.append(user)

# ==========================================
# GENERATE ACCOUNTS
# Ensure every user gets at least one account
# ==========================================

print("Generating accounts...")

for user in users:

    account = generate_account(user)

    account["customer_id"] = user["customer_id"]

    accounts.append(account)

# Generate remaining accounts

remaining_accounts = NUM_ACCOUNTS - len(accounts)

for _ in range(remaining_accounts):

    user = random.choice(users)

    account = generate_account(user)

    account["customer_id"] = user["customer_id"]

    accounts.append(account)

# ==========================================
# GENERATE TRANSACTIONS
# ==========================================

print("Generating transactions...")

for _ in range(NUM_TRANSACTIONS):

    user = random.choice(users)

    transaction = generate_transaction(user)

    transaction["customer_id"] = user["customer_id"]

    transactions.append(transaction)

# ==========================================
# GENERATE GOALS
# ==========================================

print("Generating goals...")

for _ in range(NUM_GOALS):

    user = random.choice(users)

    goal = generate_goal(user)

    goal["customer_id"] = user["customer_id"]

    goals.append(goal)

# ==========================================
# GENERATE ASSETS
# ==========================================

print("Generating assets...")

for _ in range(NUM_ASSETS):

    user = random.choice(users)

    asset = generate_asset(user)

    asset["customer_id"] = user["customer_id"]

    assets.append(asset)

# ==========================================
# SAVE JSON FILES
# ==========================================

print("Saving JSON files...")

with open("users.json", "w") as f:
    json.dump(
        users,
        f,
        indent=4,
        default=json_serializer
    )

with open("accounts.json", "w") as f:
    json.dump(
        accounts,
        f,
        indent=4,
        default=json_serializer
    )

with open("transactions.json", "w") as f:
    json.dump(
        transactions,
        f,
        indent=4,
        default=json_serializer
    )

with open("goals.json", "w") as f:
    json.dump(
        goals,
        f,
        indent=4,
        default=json_serializer
    )

with open("assets.json", "w") as f:
    json.dump(
        assets,
        f,
        indent=4,
        default=json_serializer
    )

# ==========================================
# SUMMARY
# ==========================================

print("\n===================================")
print("DATASET GENERATED SUCCESSFULLY")
print("===================================")

print(f"Users        : {len(users)}")
print(f"Accounts     : {len(accounts)}")
print(f"Transactions : {len(transactions)}")
print(f"Goals        : {len(goals)}")
print(f"Assets       : {len(assets)}")

total_balance = sum(
    account["balance"]
    for account in accounts
)

print(
    f"\nTotal Account Balance: ₹{total_balance:,.2f}"
)

# ==========================================
# SAMPLE DATA
# ==========================================

print("\nSample User:")
print(users[0])

print("\nSample Account:")
print(accounts[0])

print("\nSample Transaction:")
print(transactions[0])

print("\nSample Goal:")
print(goals[0])

print("\nSample Asset:")
print(assets[0])