from sqlmodel import SQLModel, Field, Column, String
from typing import Optional
from datetime import datetime
import uuid

class UserBase(SQLModel):
    email: str = Field(sa_column=Column(String, unique=True, index=True, nullable=False))
    name: str = Field(nullable=False)


class User(UserBase, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(sa_column=Column(String, unique=True, index=True, nullable=False))
    name: str = Field(nullable=False)
    hashed_password: str = Field(nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class UserCreate(UserBase):
    password: str


class UserUpdate(SQLModel):
    name: Optional[str] = None
    email: Optional[str] = None


class UserPublic(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime