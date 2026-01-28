---
id: 003
title: "Update Constitution for Phase II Todo App"
stage: constitution
date_iso: 2026-01-22
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: "sp.constitution"
labels: ["constitution", "setup", "todo-app", "phase2", "full-stack"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - .specify/memory/constitution.md
tests_yaml: |
  - none
---

# Update Constitution for Phase II Todo App

## User Input
```
###Please restart the project and follow the SDD work flow and here is sp.constitution updated prompt###   /sp.constitution

Project: Phase II – Todo Full-Stack Web Application

Objective:
Transform the Phase I console todo app into a secure, multi-user, full-stack web
application using spec-driven, agentic development.

Core principles:
- Spec-first, agentic workflow (no manual coding)
- Clear separation of frontend, backend, and authentication concerns
- Security-by-design with strict user isolation
- Clean, maintainable, and extensible architecture
- Production-ready practices with minimal over-engineering

Key standards:
- All behavior must be defined in specs before implementation
- RESTful API conventions must be followed consistently
- Authentication is mandatory for all API access
- Each user may only access and modify their own data
- Environment-based configuration for all secrets
- Official tools and SDKs only

Technology constraints:
- Frontend: Next.js 16+ (App Router)
- Backend: Python FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth (Frontend) + JWT
- Authorization: JWT verification in FastAPI
- Runtime: Python 3.13+ using UV
- Spec-driven: Claude Code + Spec-Kit Plus

Security standards:
- JWT-based stateless authentication
- Shared secret via environment variables
- Token verification on every request
- 401 Unauthorized for unauthenticated requests
- Ownership checks enforced on all task operations
- No cross-user data access under any condition

Process constraints:
- Agentic Dev Stack workflow required:
  Spec → Plan → Tasks → Implementation
- Each of the three specs must be independently reviewable
- Prompts, iterations, and decisions must be traceable

Not building:
- Advanced task features (priority, due dates, reminders)
- Non-REST APIs (GraphQL, gRPC)
- Mobile or desktop applications
- AI features or cloud orchestration
- Manual coding or ad-hoc changes

Success criteria:
- All 5 basic todo features work end-to-end
- Multi-user support with strict data isolation
- Secure auth flow between frontend and backend
- Persistent storage in Neon PostgreSQL
- Clean, readable code across all layers
- Passes spec and architecture review for hackathon evaluation
```

## Response Summary
Updated the constitution to reflect the Phase II Todo Full-Stack Web Application requirements. The new constitution establishes 6 core principles:

1. Spec-First, Agentic Workflow - Following the Agentic Dev Stack: Spec → Plan → Tasks → Implementation
2. Clear Separation of Frontend, Backend, and Authentication Concerns - Proper layering
3. Security-by-Design with Strict User Isolation - JWT authentication and data isolation
4. Clean, Maintainable, and Extensible Architecture - Clean architecture principles
5. Production-Ready Practices with Minimal Over-Engineering - Quality without over-engineering
6. RESTful API Conventions and Multi-User Data Isolation - API standards and security

Also added technology stack requirements, development workflow constraints, and governance rules aligned with Phase II objectives.

## Outcome
- Updated constitution at `.specify/memory/constitution.md` to reflect Phase II requirements
- Established core principles aligned with the full-stack web application development
- Set foundation for following SDD methodology specifically for Phase II
- Version incremented to 3.0.0 to reflect major changes for Phase II focus

## Evaluation
The constitution now properly aligns with the Phase II requirements provided, establishing a clear framework for developing the secure, multi-user, full-stack web application. All requirements from the user input have been incorporated into the constitutional principles, emphasizing the agentic workflow, security, and technology stack constraints.