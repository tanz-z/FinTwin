OCCUPATION_INCOME_BRACKETS = {
    # Students
    "Student": (0, 50000),

    # Salaried Employees
    "Teacher": (400000, 1200000),
    "Government Employee": (500000, 1800000),
    "Bank Employee": (450000, 1600000),
    "Software Engineer": (800000, 3500000),
    "Data Scientist": (1000000, 4000000),
    "Business Analyst": (600000, 1800000),
    "Consultant": (700000, 2500000),
    "Chartered Accountant": (800000, 3500000),

    # Healthcare
    "Doctor": (1500000, 5000000),
    "Nurse": (300000, 1000000),

    # Business
    "Entrepreneur": (1200000, 10000000),
    "Shop Owner": (300000, 3000000),
    "Trader": (500000, 5000000),

    # Agriculture
    "Farmer": (100000, 2000000),

    # Skilled Workers
    "Engineer": (600000, 2500000),
    "Architect": (700000, 3000000),

    # Retired
    "Retired": (120000, 1200000),

    # Homemaker
    "Homemaker": (0, 100000)
}


RISK_PROFILE_BY_OCCUPATION = {
    "Student": ["Aggressive"],
    "Software Engineer": ["Moderate", "Aggressive"],
    "Data Scientist": ["Aggressive"],
    "Doctor": ["Moderate"],
    "Teacher": ["Conservative", "Moderate"],
    "Government Employee": ["Conservative"],
    "Bank Employee": ["Conservative", "Moderate"],
    "Entrepreneur": ["Aggressive"],
    "Farmer": ["Conservative"],
    "Retired": ["Conservative"],
    "Homemaker": ["Conservative"]
}


CUSTOMER_SEGMENTS = {
    "Student": "Mass",

    "Teacher": "Mass",
    "Government Employee": "Mass",
    "Bank Employee": "Mass",

    "Software Engineer": "Affluent",
    "Data Scientist": "Affluent",
    "Doctor": "Affluent",
    "Business Analyst": "Affluent",
    "Consultant": "Affluent",

    "Entrepreneur": "HNI",
    "Trader": "HNI",

    "Farmer": "Mass",
    "Retired": "Mass",
    "Homemaker": "Mass"
}


ACCOUNT_TYPES = [
    "Savings",
    "Salary",
    "Current",
    "Fixed Deposit"
]


MERCHANTS_BY_OCCUPATION = {

    "Student": [
        "Swiggy",
        "Zomato",
        "Netflix",
        "Uber",
        "Amazon"
    ],

    "Software Engineer": [
        "Amazon",
        "Flipkart",
        "Zomato",
        "Groww",
        "BookMyShow"
    ],

    "Doctor": [
        "Apollo Pharmacy",
        "LIC",
        "HDFC Mutual Fund",
        "Amazon"
    ],

    "Teacher": [
        "Big Bazaar",
        "LIC",
        "Amazon",
        "IRCTC"
    ],

    "Entrepreneur": [
        "Vendor Payment",
        "GST Portal",
        "Office Supplies",
        "Amazon Business"
    ]
}


TRANSACTION_CATEGORIES = [
    "Food",
    "Shopping",
    "Travel",
    "Bills",
    "Investment",
    "Healthcare",
    "Entertainment"
]


ASSET_TYPES = [
    ("Nifty 50 Index Fund", "Equity", True, "NSE_API"),
    ("Digital Gold", "Commodity", True, "Augmont"),
    ("Fixed Deposit", "Cash_Equivalent", False, "Bank_Internal"),
    ("Government Bonds", "Debt", True, "RBI_API"),
    ("Real Estate", "Property", False, "Manual_Appraisal"),
    ("PPF", "Retirement", False, "Government"),
    ("Mutual Fund", "Equity", True, "AMFI_API")
]

ASSETS_BY_OCCUPATION = {
    "Student": [
        "Digital Gold"
    ],

    "Software Engineer": [
        "Nifty 50 Index Fund",
        "Mutual Fund",
        "PPF"
    ],

    "Doctor": [
        "Mutual Fund",
        "Fixed Deposit",
        "Real Estate",
        "Digital Gold"
    ],

    "Teacher": [
        "PPF",
        "Fixed Deposit"
    ],

    "Entrepreneur": [
        "Real Estate",
        "Government Bonds",
        "Mutual Fund"
    ]
}



GOALS_BY_AGE = {
    "young": [
        "Emergency Fund",
        "Vacation",
        "Higher Education"
    ],

    "mid": [
        "Home Purchase",
        "Child Education",
        "Retirement"
    ],

    "senior": [
        "Retirement",
        "Healthcare Fund"
    ]
}