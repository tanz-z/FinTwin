import os
from dotenv import load_dotenv

# Load variables from .env into the environment
load_dotenv()

# Access them securely
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")