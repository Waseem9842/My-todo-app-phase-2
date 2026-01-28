# Phase II – Todo Full-Stack Web Application Constitution

## Core Principles

### I. Spec-First, Agentic Workflow
All development follows the Agentic Dev Stack workflow: Spec → Plan → Tasks → Implementation. No manual coding is allowed; all behavior must be defined in specifications before implementation begins.

### II. Clear Separation of Frontend, Backend, and Authentication Concerns
Maintain strict separation between frontend (Next.js), backend (FastAPI), and authentication layers (Better Auth + JWT). Each layer has clearly defined responsibilities and interfaces.

### III. Security-by-Design with Strict User Isolation
Implement security measures from the ground up: JWT-based stateless authentication, shared secrets via environment variables, token verification on every request, and ownership checks enforced on all task operations.

### IV. Clean, Maintainable, and Extensible Architecture
Follow clean architecture principles with proper abstraction layers, dependency inversion, and single responsibility. Code must be readable, testable, and extendable for future enhancements.

### V. Production-Ready Practices with Minimal Over-Engineering
Apply production-quality standards (testing, documentation, error handling) while avoiding unnecessary complexity. Focus on core functionality with clean extensibility points.

### VI. RESTful API Conventions and Multi-User Data Isolation

All API endpoints follow REST conventions consistently. Each user may only access and modify their own data; no cross-user data access is permitted under any condition.

## Technology Stack Requirements
- Frontend: Next.js 16+ (App Router)
- Backend: Python FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth (Frontend) + JWT
- Authorization: JWT verification in FastAPI
- Runtime: Python 3.13+ using UV
- Spec-driven: Claude Code + Spec-Kit Plus

## Development Workflow
All behavior must be defined in specs before implementation. Authentication is mandatory for all API access. Environment-based configuration for all secrets. Follow Agentic Dev Stack: Spec → Plan → Tasks → Implementation. Each specification must be independently reviewable.

## Governance
This constitution governs all development activities for Phase II. All implementation must align with the spec-first, agentic workflow. Amendments require specification update and documented impact assessment. All changes must be traceable through the Agentic Dev Stack process.

Specifications drive all feature development; implementation follows documented requirements. Success criteria include: 5 basic todo features working end-to-end, multi-user support with strict data isolation, secure auth flow, persistent storage in Neon PostgreSQL, and clean, readable code.

**Version**: 3.0.0 | **Ratified**: 2026-01-22 | **Last Amended**: 2026-01-22
