# Quickstart Guide: Phase II – Authentication & API Security

## Setup Instructions

### Prerequisites
- Python 3.13+
- UV package manager
- Better Auth configured on frontend
- Shared secret for JWT verification

### Installation

1. **Install authentication dependencies**
   ```bash
   # Navigate to backend directory
   cd backend

   # Add authentication dependencies to requirements.txt
   # PyJWT for token handling
   # python-jose for JWT/JWS/JWE handling
   pip install PyJWT python-jose[cryptography]
   ```

2. **Configure environment variables**
   ```bash
   # Copy .env.example to .env
   cp .env

   # Edit .env with your shared secret and other auth settings
   vim .env
   ```

   Example `.env`:
   ```
   AUTH_SECRET=your-super-secret-key-here
   AUTH_ALGORITHM=HS256
   AUTH_AUDIENCE=todo-api
   AUTH_ISSUER=better-auth
   ```

3. **Update requirements.txt**
   Add authentication dependencies:
   ```
   PyJWT==2.9.0
   python-jose[cryptography]==3.3.0
   ```

## Implementation Overview

### Authentication Components

1. **JWT Handler** (`src/auth/jwt_handler.py`)
   - Token validation and decoding
   - Signature verification
   - Expiration checking

2. **Auth Dependencies** (`src/auth/auth_dependencies.py`)
   - FastAPI dependencies for authentication
   - User identity extraction
   - Error handling

3. **Configuration** (`src/config/auth_config.py`)
   - Authentication settings
   - Constants and validation rules

4. **Middleware** (if needed) (`src/middleware/auth_middleware.py`)
   - Global authentication handling
   - Token processing

### Integration Points

1. **Update existing API routes** to use authentication dependencies
2. **Modify service layer** to accept user identity from token
3. **Enhance error handling** for authentication failures

## API Usage with Authentication

### Getting a JWT Token
First, authenticate via your Better Auth frontend to obtain a JWT token.

### Making Authenticated Requests
```bash
# Example request with JWT token
curl -X GET http://localhost:8000/api/1/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Expected Responses
- `200 OK`: Request successful
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found or not owned by user

## Development

### Running Tests
```bash
# Run authentication-specific unit tests
python -m pytest tests/unit/test_jwt_handler.py

# Run integration tests for protected endpoints
python -m pytest tests/integration/test_protected_endpoints.py
```

### Testing Authentication Locally
For local development, you can use tools like jwt.io to generate test tokens, or set up a local Better Auth instance.

### Error Debugging
- Check logs for authentication error details
- Verify AUTH_SECRET matches between frontend and backend
- Confirm JWT token format and claims
- Validate audience and issuer settings

## Security Best Practices

### Secret Management
- Store AUTH_SECRET in environment variables, never in code
- Use different secrets for development and production
- Rotate secrets periodically

### Token Handling
- Set appropriate token expiration times
- Validate all required claims
- Implement proper error handling for invalid tokens

### User Isolation
- Always verify user ID from token matches requested resource
- Return 403/404 for unauthorized access attempts
- Log authentication failures for security monitoring