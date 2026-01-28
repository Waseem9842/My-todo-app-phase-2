# Quickstart Guide: Phase II – Backend API & Data Layer

## Setup Instructions

### Prerequisites
- Python 3.13+
- UV package manager
- Neon PostgreSQL account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Create virtual environment and install dependencies**
   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   uv pip install -r backend/requirements.txt
   ```

3. **Configure environment variables**
   Copy `.env.example` to `.env` and update with your Neon PostgreSQL credentials:
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database connection string
   ```

4. **Initialize the database**
   ```bash
   cd backend
   # Run database migrations (or create tables initially)
   python -c "from src.database.database import engine, Base; Base.metadata.create_all(bind=engine)"
   ```

5. **Start the development server**
   ```bash
   cd backend
   uvicorn src.main:app --reload --port 8000
   ```

## API Usage Examples

### Creating a Task
```bash
curl -X POST http://localhost:8000/api/1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample task",
    "description": "This is a sample task description",
    "completed": false
  }'
```

### Retrieving All Tasks for User
```bash
curl -X GET http://localhost:8000/api/1/tasks
```

### Retrieving a Specific Task
```bash
curl -X GET http://localhost:8000/api/1/tasks/1
```

### Updating a Task
```bash
curl -X PUT http://localhost:8000/api/1/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated task title",
    "description": "Updated description",
    "completed": true
  }'
```

### Deleting a Task
```bash
curl -X DELETE http://localhost:8000/api/1/tasks/1
```

### Toggling Task Completion
```bash
curl -X PATCH http://localhost:8000/api/1/tasks/1/complete \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

## Development

### Running Tests
```bash
cd backend
python -m pytest tests/ -v
```

### Database Migrations
```bash
# Generate a new migration
alembic revision --autogenerate -m "Migration description"

# Apply migrations
alembic upgrade head
```

### Code Formatting
```bash
# Format code with black
black src/

# Check for linting issues
flake8 src/
```

## Architecture Overview

The backend follows a layered architecture:

1. **API Layer** (`src.api`): FastAPI routers handling HTTP requests/responses
2. **Service Layer** (`src.services`): Business logic and data validation
3. **Data Layer** (`src.models`): SQLModel definitions and database operations

This separation ensures maintainability and testability of the codebase.