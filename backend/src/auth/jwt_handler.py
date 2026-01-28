from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from jose import JWTError, jwt
from fastapi import HTTPException, status
from src.config.auth_config import auth_config


class JWTHandler:
    """Handles JWT token creation, validation, and decoding"""

    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
        """Create an access token with the provided data"""
        to_encode = data.copy()

        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=auth_config.auth_access_token_expire_minutes)

        to_encode.update({"exp": expire})

        encoded_jwt = jwt.encode(
            to_encode,
            auth_config.auth_secret,
            algorithm=auth_config.auth_algorithm
        )
        return encoded_jwt

    @staticmethod
    def verify_token(token: str) -> Optional[Dict[str, Any]]:
        """Verify and decode a JWT token"""
        try:
            # Decode without audience/issuer validation first
            # These are validated manually in validate_token_claims
            payload = jwt.decode(
                token,
                auth_config.auth_secret,
                algorithms=[auth_config.auth_algorithm],
                options={"verify_aud": False, "verify_iss": False}
            )
            return payload
        except JWTError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Could not validate credentials: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Token validation error: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )

    @staticmethod
    def extract_user_id_from_token(token: str) -> Optional[str]:
        """Extract user ID from JWT token"""
        payload = JWTHandler.verify_token(token)
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials: No user ID found in token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user_id

    @staticmethod
    def validate_token_claims(token: str) -> Dict[str, Any]:
        """Validate all required claims in the JWT token"""
        payload = JWTHandler.verify_token(token)

        # Validate required claims
        required_claims = ["sub", "exp", "iat"]
        for claim in required_claims:
            if claim not in payload:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail=f"Missing required claim: {claim}",
                    headers={"WWW-Authenticate": "Bearer"},
                )

        # Validate expiration (already done by jwt.decode, but adding extra check)
        exp = payload.get("exp")
        if exp and datetime.utcfromtimestamp(exp) < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Validate audience if specified
        if auth_config.auth_audience:
            aud = payload.get("aud")
            # Handle both string and array audiences
            if isinstance(aud, str):
                if aud != auth_config.auth_audience:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Invalid token audience",
                        headers={"WWW-Authenticate": "Bearer"},
                    )
            elif isinstance(aud, list):
                if auth_config.auth_audience not in aud:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Invalid token audience",
                        headers={"WWW-Authenticate": "Bearer"},
                    )

        # Validate issuer if specified
        if auth_config.auth_issuer:
            iss = payload.get("iss")
            if iss != auth_config.auth_issuer:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token issuer",
                    headers={"WWW-Authenticate": "Bearer"},
                )

        return payload