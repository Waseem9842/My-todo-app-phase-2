from fastapi import HTTPException, status
from typing import Optional


class AuthErrorDetail:
    """Standardized error detail formats for authentication errors"""

    @staticmethod
    def unauthorized(detail: str = "Valid JWT token required for this operation") -> dict:
        """Return standardized 401 Unauthorized error response"""
        return {
            "type": "https://todoapi.example.com/errors/unauthorized",
            "title": "Unauthorized",
            "status": 401,
            "detail": detail
        }

    @staticmethod
    def expired_token(detail: str = "Token has expired") -> dict:
        """Return standardized 401 Expired Token error response"""
        return {
            "type": "https://todoapi.example.com/errors/expired-token",
            "title": "Expired Token",
            "status": 401,
            "detail": detail
        }

    @staticmethod
    def invalid_token(detail: str = "Invalid or malformed token") -> dict:
        """Return standardized 401 Invalid Token error response"""
        return {
            "type": "https://todoapi.example.com/errors/invalid-token",
            "title": "Invalid Token",
            "status": 401,
            "detail": detail
        }

    @staticmethod
    def forbidden(detail: str = "Insufficient permissions for this operation") -> dict:
        """Return standardized 403 Forbidden error response"""
        return {
            "type": "https://todoapi.example.com/errors/forbidden",
            "title": "Forbidden",
            "status": 403,
            "detail": detail
        }


def create_unauthorized_exception(detail: str = "Valid JWT token required for this operation") -> HTTPException:
    """Create a standardized 401 Unauthorized HTTPException"""
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=AuthErrorDetail.unauthorized(detail),
        headers={"WWW-Authenticate": "Bearer"},
    )


def create_forbidden_exception(detail: str = "Insufficient permissions for this operation") -> HTTPException:
    """Create a standardized 403 Forbidden HTTPException"""
    return HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail=AuthErrorDetail.forbidden(detail),
    )


def create_expired_token_exception(detail: str = "Token has expired") -> HTTPException:
    """Create a standardized 401 Expired Token HTTPException"""
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=AuthErrorDetail.expired_token(detail),
        headers={"WWW-Authenticate": "Bearer"},
    )


def create_invalid_token_exception(detail: str = "Invalid or malformed token") -> HTTPException:
    """Create a standardized 401 Invalid Token HTTPException"""
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=AuthErrorDetail.invalid_token(detail),
        headers={"WWW-Authenticate": "Bearer"},
    )