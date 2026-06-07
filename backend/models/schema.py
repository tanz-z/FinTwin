from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import declarative_base
from config import DATABASE_URL


engine = create_engine(DATABASE_URL)
metadata = MetaData()

# This is the "Reflection" part: it loads the tables from the live DB
metadata.reflect(bind=engine)

# Now you can access your tables as objects
UserTable = Table('users', metadata, autoload_with=engine)
TransactionTable = Table('transactions', metadata, autoload_with=engine)