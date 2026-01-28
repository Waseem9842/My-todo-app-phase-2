from pydantic_settings import BaseSettings
from typing import Optional
import os


class AuthConfig(BaseSettings):
    """Authentication configuration settings"""

    # JWT settings
    auth_secret: str = os.getenv("AUTH_SECRET", "your-default-dev-secret-change-in-production")
    auth_algorithm: str = os.getenv("AUTH_ALGORITHM", "HS256")
    auth_audience: Optional[str] = os.getenv("AUTH_AUDIENCE", "todo-api")
    auth_issuer: Optional[str] = os.getenv("AUTH_ISSUER", "better-auth")
    auth_access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

    model_config = {"env_file": ".env", "extra": "ignore"}


# Create global instance
auth_config = AuthConfig()