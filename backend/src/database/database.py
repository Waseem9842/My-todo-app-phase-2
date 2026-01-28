from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy import Column, DateTime
from datetime import datetime
import os
from typing import Generator
from dotenv import load_dotenv

# Import models to register them with SQLModel - import here to ensure tables are registered
from src.models import user_model, task_model


# Load environment variables
load_dotenv()

# Database URL - should come from environment variables in production
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

# Create the engine
engine = create_engine(DATABASE_URL, echo=True)


def create_db_and_tables():
    """Create database tables"""
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """Get database session"""
    with Session(engine) as session:
        yield session