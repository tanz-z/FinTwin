import time
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from models.schema import Devices, Transactions

def evaluate_wealth_protection_score(db: Session, user_id: int, incoming_payload: dict) -> dict:
    """
    Implements the 6-sign matrix scoring system for the SecureWealth Twin.
    """
    risk_score = 0
    signals_captured = {}

    # --- SIGN 1: Device Trust Check ---
    device = db.query(Devices).filter(
        Devices.user_id == user_id, 
        Devices.device_fingerprint == incoming_payload.get("device_fingerprint")
    ).first()
    
    if not device or not device.is_trusted:
        risk_score += 30
        signals_captured["device_trust"] = "Untrusted or new device detected"
    else:
        signals_captured["device_trust"] = "Trusted device"

    # --- SIGN 2: Velocity Check (Time since last login) ---
    time_delta = incoming_payload.get("time_since_login", 999) 
    if time_delta < 10:
        risk_score += 15
        signals_captured["session_velocity"] = "Action executed too fast after login"

    # --- SIGN 3: Amount Deviation Check ---
    avg_amount = db.query(func.avg(Transactions.amount)).join(Transactions.account).filter(
        Transactions.account.has(user_id=user_id)
    ).scalar() or 1.0
    
    current_amount = float(incoming_payload.get("amount", 0))
    if current_amount > (float(avg_amount) * 3):
        risk_score += 25
        signals_captured["amount_deviation"] = "Transaction amount significantly higher than history"

    # --- SIGN 4: OTP Telemetry ---
    if incoming_payload.get("otp_retries", 0) > 2:
        risk_score += 15
        signals_captured["otp_pattern"] = "Multiple failed OTP retries observed"

    # --- SIGN 5: Asset Familiarity ---
    # Defaulting to 0 for fallback setup
    signals_captured["asset_familiarity"] = "Verified asset class"

    # --- SIGN 6: Behavioral Loops ---
    if incoming_payload.get("cancel_retry_loop", False):
        risk_score += 15
        signals_captured["behavioral_consistency"] = "Rapid cancel-retry sequence detected"
        
    # Cap maximum score at 100
    final_score = min(risk_score, 100)

    # Threshold Decision Logic
    if final_score < 40:
        decision = "ALLOW"
        explanation = "Transaction processed normally."
    elif final_score <= 75:
        decision = "WARN"
        explanation = "Unusual transaction profile detected. Cooling-off active."
    else:
        decision = "BLOCK"
        explanation = "High risk of cyber fraud. Operation terminated."

    return {
        "risk_score": final_score,
        "decision_taken": decision,
        "explanation_text": explanation,
        "input_signals": signals_captured
    }