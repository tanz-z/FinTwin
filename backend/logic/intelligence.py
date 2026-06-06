import numpy as np

def test_wealth_calc(amount: float):
    # This is a dummy calc using numpy to verify it work
    multiplier = np.array([1.05]) 
    return amount * multiplier[0]