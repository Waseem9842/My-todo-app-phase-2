# Research: Phase II – Backend API & Data Layer

## Decision: SQLModel Configuration for Neon PostgreSQL
**Rationale**: SQLModel is the optimal choice as it combines SQLAlchemy and Pydantic, providing type hints and validation while maintaining compatibility with Neon PostgreSQL. It aligns with the constitution's technology stack requirement.
**Alternatives considered**:
- Pure SQLAlchemy: More complex setup without Pydantic benefits
- Tortoise ORM: Async-first but less mature than SQLModel
- Peewee: Simpler but lacks modern typing features

## Decision: FastAPI for API Layer
**Rationale**: FastAPI provides automatic OpenAPI documentation, excellent Pydantic integration, and asynchronous performance. It's explicitly mentioned in the constitution as required technology.
**Alternatives considered**:
- Flask: More traditional but lacks automatic documentation and typing
- Django: Heavy framework when lightweight API is needed
- Starlette: Lower-level than needed

## Decision: Layered Architecture Pattern
**Rationale**: Following the constitution's requirement for "Clear separation of frontend, backend, and authentication concerns", the three-layer architecture (API, Service, Data) provides clear separation of concerns and testability.
**Alternatives considered**:
- Monolithic structure: Harder to test and maintain
- Domain-driven design: Too complex for current scope
- MVC pattern: Less suitable for API-focused application

## Decision: User Scoping Strategy
**Rationale**: To enforce "No cross-user data access under any condition" from the constitution, each database query will include user ID filtering at the service layer to prevent unauthorized access.
**Alternatives considered**:
- Database-level row-level security: More complex to implement
- Middleware filtering: Less explicit and potentially bypassed
- Application-level checks: Most reliable and clear approach

## Decision: Error Handling Approach
**Rationale**: Following FastAPI best practices with custom exception handlers to return consistent error responses that align with REST conventions.
**Alternatives considered**:
- Generic HTTP exceptions: Less informative
- Raw error messages: Security concern
- Centralized error handler: Best practice for consistent API responses