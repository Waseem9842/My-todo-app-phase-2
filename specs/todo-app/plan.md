# Todo App Architecture Plan - Phase II

## Overview
This document outlines the architectural decisions for transforming the Phase I console todo app into a secure, multi-user, full-stack web application.

## Architecture Layers

### 1. Frontend Layer (Next.js 16+)
- **Technology**: Next.js 16+ with App Router
- **Structure**:
  - `app/` directory with pages: `login`, `register`, `dashboard`, `todos`
  - Component library for reusable UI elements
  - API client for communicating with backend
- **Authentication**: Better Auth integration for user management
- **State Management**: Client-side state for UI interactions

### 2. Backend Layer (Python FastAPI)
- **Technology**: Python FastAPI framework
- **Structure**:
  - Main application entry point with CORS configuration
  - API router modules for different endpoints
  - Authentication middleware for JWT verification
  - Business logic services
- **Security**: JWT token validation, user isolation enforcement

### 3. Data Layer (SQLModel + Neon PostgreSQL)
- **Technology**: SQLModel ORM with Neon Serverless PostgreSQL
- **Structure**:
  - Database models for users and todos
  - Database session management
  - Connection pooling configuration
- **Security**: Encrypted connections, proper indexing

### 4. Authentication Layer (Better Auth + JWT)
- **Frontend**: Better Auth client integration
- **Backend**: JWT token verification middleware
- **Security**: Shared secret for token signing/validation

## API Design

### RESTful Endpoints
```
POST   /api/auth/login          # User login
POST   /api/auth/register       # User registration
GET    /api/todos               # Get user's todos
POST   /api/todos               # Create new todo
GET    /api/todos/{id}          # Get specific todo
PUT    /api/todos/{id}          # Update specific todo
DELETE /api/todos/{id}          # Delete specific todo
PATCH  /api/todos/{id}/complete # Toggle completion status
```

### Authentication Flow
1. User registers/logs in via Better Auth
2. Better Auth issues JWT token
3. Frontend stores token securely
4. Frontend includes token in Authorization header for API requests
5. Backend verifies JWT token and extracts user identity
6. Backend enforces user data isolation

## Database Schema

### Users Table
- `id`: UUID primary key
- `email`: Unique email address
- `name`: User's display name
- `hashed_password`: BCrypt hashed password
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Todos Table
- `id`: UUID primary key
- `user_id`: Foreign key to users table
- `title`: Todo title (string)
- `description`: Todo description (text, nullable)
- `is_completed`: Boolean completion status
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Security Considerations

### Authentication & Authorization
- JWT tokens with configurable expiration
- User isolation at the database level
- Input validation and sanitization
- Rate limiting considerations

### Data Protection
- Encrypted database connections
- Secure token storage
- Password hashing with BCrypt
- Environment-based secret management

## Deployment Architecture

### Infrastructure
- Neon Serverless PostgreSQL for database
- Next.js static hosting (Vercel, Netlify, etc.)
- FastAPI backend containerization
- Environment variable configuration

### Configuration
- Environment variables for database URLs
- JWT secret configuration
- CORS settings for frontend domain
- Logging and monitoring setup

## Error Handling Strategy

### HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

### Error Response Format
```json
{
  "detail": "Error message",
  "code": "error_code"
}
```

## Technology Stack Decisions

### Frontend: Next.js 16+ with App Router
- **Rationale**: Industry standard for React applications, excellent SEO, file-based routing
- **Trade-offs**: Learning curve for team members unfamiliar with React

### Backend: Python FastAPI
- **Rationale**: Fast development, excellent documentation, async support, type hints
- **Trade-offs**: Performance compared to compiled languages

### ORM: SQLModel
- **Rationale**: Combines SQLAlchemy and Pydantic, excellent for FastAPI integration
- **Trade-offs**: Newer technology with smaller community than pure SQLAlchemy

### Database: Neon Serverless PostgreSQL
- **Rationale**: Serverless scalability, PostgreSQL compatibility, easy management
- **Trade-offs**: Potential cold start latency

### Authentication: Better Auth + JWT
- **Rationale**: Modern authentication solution, good security practices, easy integration
- **Trade-offs**: Vendor lock-in with Better Auth ecosystem

## Scalability Considerations

### Horizontal Scaling
- Stateless backend design for horizontal scaling
- Database connection pooling
- CDN for static assets

### Performance Optimization
- Database indexing on foreign keys and frequently queried fields
- API response caching where appropriate
- Efficient database queries with proper joins

## Monitoring and Observability

### Logging
- Structured logging with correlation IDs
- Request/response logging for debugging
- Error logging with stack traces

### Metrics
- API response times
- Error rates
- Active user counts

## Risk Analysis

### Technical Risks
1. **Database Performance**: Mitigation - proper indexing, connection pooling
2. **Authentication Security**: Mitigation - JWT best practices, secure token storage
3. **Data Isolation**: Mitigation - strict user ID validation on all operations

### Operational Risks
1. **Dependency Updates**: Mitigation - automated testing, staging environment
2. **Secret Management**: Mitigation - environment variables, no hardcoded secrets

## Implementation Approach

### Phased Development
1. **Phase 1**: Authentication system and basic API
2. **Phase 2**: Database integration and models
3. **Phase 3**: Frontend implementation
4. **Phase 4**: Security hardening and testing