from fastapi import APIRouter
from logic.intelligence import test_wealth_calc

router = APIRouter()

@router.get("/calculate")
async def calculate(amount: float):
    result = test_wealth_calc(amount)
    return {"input": amount, "calculated_growth": result}