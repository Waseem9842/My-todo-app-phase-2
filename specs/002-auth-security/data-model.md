# Data Model: Phase II – Authentication & API Security

## JWT Token Entity

### Claims Structure
- **iss** (Issuer): String
  - Identity of the token issuer (Better Auth)
  - Used to verify token source
- **sub** (Subject): String
  - Subject of the token (typically user ID)
  - Primary identifier for user identity extraction
- **aud** (Audience): String or Array
  - Intended recipients of the token
  - Verifies token is meant for this API
- **exp** (Expiration Time): Integer (Unix timestamp)
  - Time when token expires
  - Used for automatic token rejection
- **iat** (Issued At): Integer (Unix timestamp)
  - Time when token was issued
  - Used for token age validation
- **nbf** (Not Before): Integer (Unix timestamp)
  - Time before which token is not valid
  - Used for delayed activation
- **jti** (JWT ID): String
  - Unique identifier for the token
  - Used for replay attack prevention (if implemented)

### Token Validation Rules
- Token signature must be valid using shared secret
- Token must not be expired (exp > current time)
- Token must not be before effective time (nbf <= current time)
- Audience must match expected value(s)
- Issuer must match expected value

## Authenticated User Entity (Runtime)

### Properties
- **user_id**: String or Integer
  - Extracted from JWT subject claim
  - Primary identifier for user isolation
- **claims**: Dictionary
  - All validated claims from JWT
  - Available for additional authorization decisions
- **authenticated**: Boolean
  - Flag indicating successful authentication
  - Ensures only valid users proceed

### Validation Rules
- User ID must be present in JWT subject
- User ID must pass format validation
- All required claims must be present and valid

## Authentication Configuration Entity

### Properties
- **secret**: String
  - Shared secret for JWT signing/verification
  - Loaded from environment variables
- **algorithm**: String
  - Algorithm used for JWT signing (e.g., HS256)
  - Configurable for security requirements
- **audience**: String
  - Expected audience value for token validation
  - Ensures tokens are intended for this API
- **issuer**: String
  - Expected issuer value for token validation
  - Ensures tokens come from trusted source

### Security Constraints
- Secret must not be hardcoded in source code
- Algorithm should be strong (HS256, RS256, etc.)
- Audience and issuer should be validated against expected values
- Configuration must be loaded from secure sources (environment variables)

## Error Response Entity

### Properties
- **type**: String (URI)
  - Error type identifier
  - Helps with programmatic error handling
- **title**: String
  - Human-readable error summary
  - Provides clear error messaging
- **status**: Integer
  - HTTP status code
  - Standardized status reporting
- **detail**: String
  - Specific error details
  - Provides context for troubleshooting
- **instance**: String (URI)
  - Instance-specific error identifier
  - Helps with error correlation

### Standard Error Types
- **Unauthorized**: 401 status code for authentication failures
- **ExpiredToken**: Subtype of Unauthorized for expired tokens
- **InvalidToken**: Subtype of Unauthorized for malformed tokens
- **InsufficientScope**: 403 status code for authorization failures