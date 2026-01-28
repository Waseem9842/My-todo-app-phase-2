# API Contracts: Authentication & Security

## Authentication Headers

### Required Authorization Header
- **Header**: `Authorization`
- **Format**: `Bearer <jwt_token>`
- **Description**: All protected endpoints require JWT token in Authorization header
- **Validation**: Token must be valid, unexpired, and properly signed

## Error Response Format

### Standard Error Response
```json
{
  "type": "string (URI to error type)",
  "title": "string (human readable error title)",
  "status": "integer (HTTP status code)",
  "detail": "string (specific error details)",
  "instance": "string (optional, URI to specific occurrence)"
}
```

### 401 Unauthorized Response
- **Status**: `401 Unauthorized`
- **Body**:
  ```json
  {
    "type": "https://todoapi.example.com/errors/unauthorized",
    "title": "Unauthorized",
    "status": 401,
    "detail": "Valid JWT token required for this operation"
  }
  ```
- **Scenarios**:
  - Missing Authorization header
  - Invalid JWT token format
  - Expired JWT token
  - Invalid JWT signature
  - Invalid token audience or issuer

## Protected Endpoints

### All Existing Task Endpoints
The following endpoints from the task API now require authentication:

#### POST /api/{user_id}/tasks
- **Authentication**: Required
- **Authorization**: Token user ID must match {user_id} in path
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `403 Forbidden`: User ID mismatch

#### GET /api/{user_id}/tasks
- **Authentication**: Required
- **Authorization**: Token user ID must match {user_id} in path
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `403 Forbidden`: User ID mismatch

#### GET /api/{user_id}/tasks/{id}
- **Authentication**: Required
- **Authorization**: Token user ID must match {user_id} in path
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `403 Forbidden`: User ID mismatch
  - `404 Not Found`: Task does not belong to user

#### PUT /api/{user_id}/tasks/{id}
- **Authentication**: Required
- **Authorization**: Token user ID must match {user_id} in path
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `403 Forbidden`: User ID mismatch
  - `404 Not Found`: Task does not belong to user

#### DELETE /api/{user_id}/tasks/{id}
- **Authentication**: Required
- **Authorization**: Token user ID must match {user_id} in path
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `403 Forbidden`: User ID mismatch
  - `404 Not Found`: Task does not belong to user

#### PATCH /api/{user_id}/tasks/{id}/complete
- **Authentication**: Required
- **Authorization**: Token user ID must match {user_id} in path
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `403 Forbidden`: User ID mismatch
  - `404 Not Found`: Task does not belong to user

## JWT Token Validation Contract

### Token Structure
- **Algorithm**: HS256 (or configurable algorithm)
- **Claims Required**:
  - `sub` (subject): User identifier
  - `exp` (expiration): Token expiration timestamp
  - `aud` (audience): Token audience (API identifier)
  - `iss` (issuer): Token issuer (Better Auth)

### Validation Steps
1. Verify token signature using shared secret
2. Check token has not expired (exp > current time)
3. Validate audience matches expected value
4. Validate issuer matches expected value
5. Extract user ID from subject claim
6. Confirm user ID matches requested resource scope

## Security Requirements

### Rate Limiting
- Unauthenticated requests may be subject to rate limiting
- Authentication tokens do not exempt from general rate limits

### Token Lifetime
- JWT tokens should have reasonable expiration times
- Short-lived tokens preferred for security
- Token refresh mechanisms may be implemented separately

### User Isolation
- User A cannot access User B's resources
- All API calls enforce user ID matching between token and path
- Cross-user access attempts result in 403 or 404 responses