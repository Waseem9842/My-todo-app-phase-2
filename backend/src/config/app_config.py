from pydantic_settings import BaseSettings
from typing import Optional
import os


class AppConfig(BaseSettings):
    """Application configuration settings"""

    # Database settings
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./todo_app.db")

    # Debug settings
    debug: bool = os.getenv("DEBUG", "False").lower() == "true"

    # Logging settings
    log_level: str = os.getenv("LOG_LEVEL", "info")

    model_config = {"env_file": ".env", "extra": "ignore"}


# Create global instance
app_config = AppConfig()