from generator import generate_user
from generator import generate_account
from generator import generate_transaction
from generator import generate_asset
from generator import generate_goal
user = generate_user(1)
account = generate_account(user)


for _ in range(5):
    print(generate_transaction(user))

asset = generate_asset(user)

goal = generate_goal(user)
print(goal)