from fastapi import FastAPI
from api import wealth
app = FastAPI(title="FinTwin API")

# Include your routers
app.include_router(wealth.router, prefix="/wealth", tags=["Wealth"])
# app.include_router(security.router, prefix="/security", tags=["Security"])

@app.get("/")
def read_root():
    return {"message": "FinTwin Backend is Online"}