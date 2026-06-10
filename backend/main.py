# from fastapi import FastAPI
# from api import wealth

# app = FastAPI(title="FinTwin API")

# # Include your routers
# app.include_router(wealth.router, prefix="/wealth", tags=["Wealth"])
# # app.include_router(security.router, prefix="/security", tags=["Security"])

# @app.get("/")
# def read_root():
#     return {"message": "FinTwin Backend is Online"}


# from fastapi import FastAPI, Depends
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import select
# from models.schema import init_db, get_db, Base

# app = FastAPI()

# @app.on_event("startup")
# async def startup():
#     # Load the tables once when the app starts
#     await init_db()

# @app.get("/data/{table_name}")
# async def get_table_data(table_name: str, db: AsyncSession = Depends(get_db)):
#     table_class = getattr(Base.classes, table_name)
    
#     result = await db.execute(select(table_class))
#     return result.scalars().all()


from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text  # <-- Make sure to import 'text'
from models.test_db_connection import get_db # Adjust path based on your setup

app = FastAPI()

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