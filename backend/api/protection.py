from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.test_db_connection import get_db
from logic.protection_engine import evaluate_wealth_protection_score
from models.schema import RiskAssessmentLogs


router = APIRouter(prefix="/api/protection", tags=["Wealth Protection"])

@router.post("/verify-action")
def verify_wealth_action(payload: dict, db: Session = Depends(get_db)):
    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=400, detail="Missing user_id")

    # Evaluate the 6 signs matrix
    assessment = evaluate_wealth_protection_score(db, user_id, payload)

    # Log assessment directly to your database table
    log_entry = RiskAssessmentLogs(
        user_id=user_id,
        risk_score=assessment["risk_score"],
        decision_taken=assessment["decision_taken"],
        explanation_text=assessment["explanation_text"],
        input_signals=assessment["input_signals"]
    )
    db.add(log_entry)
    db.commit()

    return assessment