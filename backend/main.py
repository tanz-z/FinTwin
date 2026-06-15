from fastapi import FastAPI, Depends, HTTPException
from api import wealth,protection,users
from models.schema import Base
from sqlalchemy.orm import Session
from sqlalchemy import text  # <-- Make sure to import 'text'
from models.test_db_connection import engine,get_db # Adjust path based on your setup



Base.metadata.create_all(bind=engine)

app = FastAPI(title="SecureWealth Twin Core API")

# Mount Routers
app.include_router(wealth.router)
app.include_router(protection.router)
app.include_router(users.router)

@app.get("/")
def health_check():
    return {"status": "healthy", "system": "FinTwin Backend Engine"}

@app.get("/db-check")
def check_database_connection(db: Session = Depends(get_db)):
    try:
        # Run a simple, harmless query to test the live connection
        result = db.execute(text("SELECT 1")).fetchone()
        
        if result:
            return {
                "status": "success",
                "message": "Database connection is live and healthy!"
            }
        
    except Exception as e:
        # If the database is down or credentials are wrong, it will catch it here
        raise HTTPException(
            status_code=500, 
            detail=f"Database connection failed! Error: {str(e)}"
            )


@app.get("/")
def home():
    return (
        {"home":"data"}
    )