from models.schema import engine, UserTable

try:
    with engine.connect() as conn:
        print("Success! Connection established.")
        print(f"Table found: {UserTable.name}")
except Exception as e:
    print(f"Connection failed: {e}")