from faker import Faker
from datetime import datetime, timedelta
import random

from constants import (
    OCCUPATION_INCOME_BRACKETS,
    RISK_PROFILE_BY_OCCUPATION,
    CUSTOMER_SEGMENTS, 
    ACCOUNT_TYPES,
    MERCHANTS_BY_OCCUPATION,
    TRANSACTION_CATEGORIES, 
    ASSETS_BY_OCCUPATION, 
    ASSET_TYPES, 
    GOALS_BY_AGE
)

fake = Faker("en_IN")


def generate_user(customer_no):

    # Select occupation
    occupation = random.choice(
        list(OCCUPATION_INCOME_BRACKETS.keys())
    )

    # Generate income according to occupation
    min_income, max_income = (
        OCCUPATION_INCOME_BRACKETS[occupation]
    )

    annual_income = random.randint(
        min_income,
        max_income
    )

    # Generate age
    age = random.randint(18, 75)

    # Generate DOB from age
    dob = fake.date_of_birth(
        minimum_age=age,
        maximum_age=age
    )

    # Risk profile based on occupation
    risk_profile = random.choice(
        RISK_PROFILE_BY_OCCUPATION.get(
            occupation,
            ["Moderate"]
        )
    )

    # Customer segment
    customer_segment = CUSTOMER_SEGMENTS.get(
        occupation,
        "Mass"
    )

    created_at = fake.date_time_between(
        start_date="-5y",
        end_date="now"
    )

    return {
        "customer_id": f"PSB{customer_no:06d}",

        "full_name": fake.name(),

        "email": fake.email(),

        "contact": fake.msisdn()[:10],

        "dob": dob,

        "occupation": occupation,

        "annual_income": annual_income,

        "city": fake.city(),

        "state": fake.state(),

        "risk_profile": risk_profile,

        "customer_segment": customer_segment,

        "created_at": created_at
    }




def generate_account(user):

    annual_income = user["annual_income"]
    occupation = user["occupation"]

    # More realistic account types
    if occupation in [
        "Software Engineer",
        "Teacher",
        "Government Employee",
        "Bank Employee"
    ]:
        account_type = random.choice(
            ["Salary", "Savings"]
        )

    elif occupation in [
        "Entrepreneur",
        "Trader",
        "Shop Owner"
    ]:
        account_type = random.choice(
            ["Current", "Savings"]
        )

    elif occupation == "Student":
        account_type = "Savings"

    else:
        account_type = random.choice(
            ACCOUNT_TYPES
        )

    balance = round(
        annual_income * random.uniform(0.1, 1.5),
        2
    )

    linked_at = fake.date_time_between(
        start_date="-5y",
        end_date="now"
    )

    return {

        "bank_name": "Punjab & Sind Bank",

        "account_type": account_type,

        "account_number_masked":
            f"XXXX{random.randint(1000,9999)}",

        "ifsc_code": "PSIB0000123",

        "balance": balance,

        "linked_at": linked_at
    }




def generate_transaction(user):

    occupation = user["occupation"]

    merchants = MERCHANTS_BY_OCCUPATION.get(
        occupation,
        ["Amazon"]
    )

    amount = round(
        random.uniform(100, 25000),
        2
    )

    transaction_date = fake.date_time_between(
        start_date="-6M",
        end_date="now"
    )

    return {

        "amount": amount,

        "transaction_type":
            random.choice(
                ["DEBIT", "CREDIT"]
            ),

        "category":
            random.choice(
                TRANSACTION_CATEGORIES
            ),

        "merchant":
            random.choice(
                merchants
            ),

        "transaction_date":
            transaction_date
    }




def generate_asset(user):

    occupation = user["occupation"]

    asset_name = random.choice(
        ASSETS_BY_OCCUPATION.get(
            occupation,
            ["Mutual Fund"]
        )
    )

    asset_value = round(
        user["annual_income"]
        * random.uniform(0.2, 5),
        4
    )

    last_updated_at = fake.date_time_between(
        start_date="-2y",
        end_date="now"
    )

    return {

        # Used later to map to asset_types table
        "asset_type_name": asset_name,

        "account_reference_id":
            f"AST{random.randint(100000,999999)}",

        "asset_name_custom":
            asset_name,

        "current_value":
            asset_value,

        "currency":
            "INR",

        "last_updated_at":
            last_updated_at
    }




def generate_goal(user):

    age = datetime.now().year - user["dob"].year

    if age <= 30:
        goal_pool = GOALS_BY_AGE["young"]

    elif age <= 50:
        goal_pool = GOALS_BY_AGE["mid"]

    else:
        goal_pool = GOALS_BY_AGE["senior"]

    goal_name = random.choice(goal_pool)

    # Goal amount depends somewhat on income
    annual_income = user["annual_income"]

    target_amount = random.randint(
        max(100000, int(annual_income * 0.5)),
        max(500000, int(annual_income * 5))
    )

    current_amount = random.randint(
        0,
        int(target_amount * 0.8)
    )

    target_date = fake.date_between(
        start_date="+1y",
        end_date="+15y"
    )

    priority = random.choice(
        ["HIGH", "MEDIUM", "LOW"]
    )

    return {
        "goal_name": goal_name,

        "target_amount": target_amount,

        "current_amount": current_amount,

        "target_date": target_date,

        "priority": priority
    }