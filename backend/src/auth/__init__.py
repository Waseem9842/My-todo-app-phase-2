"""Authentication package for the Todo API."""

from .jwt_handler import JWTHandler
from .auth_dependencies import get_current_user, get_user_id_from_token, require_user_ownership
from .error_handlers import (
    AuthErrorDetail,
    create_unauthorized_exception,
    create_forbidden_exception,
    create_expired_token_exception,
    create_invalid_token_exception
)

__all__ = [
    "JWTHandler",
    "get_current_user",
    "get_user_id_from_token",
    "require_user_ownership",
    "AuthErrorDetail",
    "create_unauthorized_exception",
    "create_forbidden_exception",
    "create_expired_token_exception",
    "create_invalid_token_exception"
]