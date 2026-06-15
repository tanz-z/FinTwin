from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models.schema import Users
from models.test_db_connection import get_db

router = APIRouter()

@router.get("/users/{user_id}")
def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = (
        db.query(Users)
        .filter(Users.user_id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "user_id": user.user_id,
        "customer_id": user.customer_id,
        "full_name": user.full_name,
        "email": user.email,
        "occupation": user.occupation,
        "annual_income": (
            float(user.annual_income)
            if user.annual_income
            else None
        )
    }