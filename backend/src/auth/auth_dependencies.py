from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict, Any
from src.auth.jwt_handler import JWTHandler


# Define the security scheme
security = HTTPBearer()


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """
    Get the current user from the JWT token in the Authorization header.
    This dependency will be used to protect endpoints.
    """
    token = credentials.credentials

    try:
        # Validate the token and extract user information
        payload = JWTHandler.validate_token_claims(token)
        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials: No user ID found in token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Return user information
        user_info = {
            "user_id": user_id,
            "claims": payload,
            "authenticated": True
        }

        return user_info
    except HTTPException:
        # Re-raise HTTP exceptions (like 401 errors)
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_user_id_from_token(request: Request) -> int:
    """
    Extract and return the user ID from the JWT token.
    This can be used to validate that the user ID in the token matches the one in the path.
    """
    # Extract the authorization header
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing or invalid",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = auth_header[len("Bearer "):]

    try:
        # Validate the token and extract user ID
        payload = JWTHandler.validate_token_claims(token)
        user_id_claim = payload.get("sub")

        if user_id_claim is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials: No user ID found in token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Convert to int if it's a string representation of a number
        try:
            user_id = int(user_id_claim)
        except ValueError:
            # If it's not numeric, we assume it's a string ID
            user_id = user_id_claim

        return user_id
    except HTTPException:
        # Re-raise HTTP exceptions (like 401 errors)
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


def require_user_ownership(user_id_from_path: int = None):
    """
    Dependency to enforce user ownership.
    Compares the user ID in the JWT token with the user ID in the path parameter.
    """
    async def check_user_ownership(current_user: Dict[str, Any] = Depends(get_current_user)):
        token_user_id = int(current_user["user_id"])

        if user_id_from_path is not None and token_user_id != user_id_from_path:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied: You can only access your own resources",
            )

        return current_user

    return check_user_ownership