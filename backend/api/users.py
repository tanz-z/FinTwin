
from fastapi import FastAPI, HTTPException
from sqlalchemy import text  # <-- Make sure to
from models  import schema
app=FastAPI()


@app.get("/users/{customer_id}")
async def get_user_by_id(customer_id: str): # <--- Notice 'int' type hinting
    # Your SQL query here: SELECT * FROM users WHERE user_id = :user_id
    user = await schema.fetch_one("SELECT * FROM users WHERE user_id = :user_id", {"user_id": customer_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found in database")
    return user