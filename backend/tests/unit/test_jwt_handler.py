import pytest
from datetime import datetime, timedelta
from jose import jwt
from src.auth.jwt_handler import JWTHandler
from src.config.auth_config import auth_config


def test_create_access_token():
    """Test creating an access token with data"""
    data = {"sub": "test_user"}
    token = JWTHandler.create_access_token(data=data)

    # Decode the token to verify it was created correctly
    decoded = jwt.decode(token, auth_config.auth_secret, algorithms=[auth_config.auth_algorithm])

    assert decoded["sub"] == "test_user"
    assert "exp" in decoded


def test_verify_valid_token():
    """Test verifying a valid token"""
    data = {"sub": "test_user"}
    token = JWTHandler.create_access_token(data=data)

    payload = JWTHandler.verify_token(token)

    assert payload["sub"] == "test_user"


def test_extract_user_id_from_token():
    """Test extracting user ID from a valid token"""
    data = {"sub": "12345"}
    token = JWTHandler.create_access_token(data=data)

    user_id = JWTHandler.extract_user_id_from_token(token)

    assert user_id == "12345"


def test_validate_token_claims():
    """Test validating all required claims in a token"""
    data = {"sub": "test_user", "name": "John Doe"}
    token = JWTHandler.create_access_token(data=data)

    payload = JWTHandler.validate_token_claims(token)

    assert payload["sub"] == "test_user"
    assert payload["name"] == "John Doe"


def test_verify_invalid_token():
    """Test that an invalid token raises an exception"""
    with pytest.raises(Exception):
        JWTHandler.verify_token("invalid.token.string")


def test_verify_expired_token():
    """Test that an expired token raises an exception"""
    expired_date = datetime.utcnow() - timedelta(minutes=1)
    data = {"sub": "test_user", "exp": expired_date}
    token = JWTHandler.create_access_token(data=data)

    with pytest.raises(Exception):
        JWTHandler.verify_token(token)


def test_extract_user_id_from_invalid_token():
    """Test extracting user ID from an invalid token raises an exception"""
    with pytest.raises(Exception):
        JWTHandler.extract_user_id_from_token("invalid.token.string")