# API Contracts: Frontend Web Application

## Authentication Flows

### Signup Flow
- **Endpoint**: `/auth/signup` (handled by Better Auth)
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**:
  - Success: Redirect to dashboard or login page with JWT token stored securely
  - Error: Display validation errors to user
- **Headers**:
  - `Content-Type: application/json`
  - JWT token automatically attached to subsequent requests after login

### Signin Flow
- **Endpoint**: `/auth/signin` (handled by Better Auth)
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**:
  - Success: Redirect to dashboard with JWT token stored securely
  - Error: Display authentication errors to user
- **Headers**:
  - `Content-Type: application/json`

## Protected API Endpoints

All the following endpoints require a valid JWT token in the Authorization header:
`Authorization: Bearer <jwt_token>`

### Create Task Endpoint
- **Method**: `POST`
- **Path**: `/api/{user_id}/tasks`
- **Description**: Creates a new task for the authenticated user
- **Request Body**:
  ```json
  {
    "title": "string (required, 1-255 chars)",
    "description": "string (optional, max 1000 chars)",
    "completed": "boolean (optional, default: false)"
  }
  ```
- **Response**:
  - Status: `201 Created`
  - Body:
    ```json
    {
      "id": "integer",
      "title": "string",
      "description": "string",
      "completed": "boolean",
      "owner_id": "integer",
      "created_at": "datetime",
      "updated_at": "datetime"
    }
    ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `400 Bad Request`: Invalid input data
  - `403 Forbidden`: User ID mismatch (attempting to create for different user)

### Get All Tasks Endpoint
- **Method**: `GET`
- **Path**: `/api/{user_id}/tasks`
- **Description**: Retrieves all tasks belonging to the authenticated user
- **Response**:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "tasks": [
        {
          "id": "integer",
          "title": "string",
          "description": "string",
          "completed": "boolean",
          "owner_id": "integer",
          "created_at": "datetime",
          "updated_at": "datetime"
        }
      ]
    }
    ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `403 Forbidden`: User ID mismatch
  - `404 Not Found`: User ID does not exist

### Get Specific Task Endpoint
- **Method**: `GET`
- **Path**: `/api/{user_id}/tasks/{id}`
- **Description**: Retrieves a specific task by ID for the authenticated user
- **Response**:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "id": "integer",
      "title": "string",
      "description": "string",
      "completed": "boolean",
      "owner_id": "integer",
      "created_at": "datetime",
      "updated_at": "datetime"
    }
    ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `403 Forbidden`: User ID mismatch or task doesn't belong to user
  - `404 Not Found`: Task ID or User ID does not exist

### Update Task Endpoint
- **Method**: `PUT`
- **Path**: `/api/{user_id}/tasks/{id}`
- **Description**: Updates a specific task by ID for the authenticated user
- **Request Body**:
  ```json
  {
    "title": "string (required, 1-255 chars)",
    "description": "string (optional, max 1000 chars)",
    "completed": "boolean (required)"
  }
  ```
- **Response**:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "id": "integer",
      "title": "string",
      "description": "string",
      "completed": "boolean",
      "owner_id": "integer",
      "created_at": "datetime",
      "updated_at": "datetime"
    }
    ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `400 Bad Request`: Invalid input data
  - `403 Forbidden`: User ID mismatch or task doesn't belong to user
  - `404 Not Found`: Task ID or User ID does not exist

### Toggle Task Completion Endpoint
- **Method**: `PATCH`
- **Path**: `/api/{user_id}/tasks/{id}/complete`
- **Description**: Toggles the completion status of a specific task for the authenticated user
- **Request Body**:
  ```json
  {
    "completed": "boolean (required)"
  }
  ```
- **Response**:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "id": "integer",
      "title": "string",
      "description": "string",
      "completed": "boolean",
      "owner_id": "integer",
      "created_at": "datetime",
      "updated_at": "datetime"
    }
    ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `400 Bad Request`: Invalid input data
  - `403 Forbidden`: User ID mismatch or task doesn't belong to user
  - `404 Not Found`: Task ID or User ID does not exist

### Delete Task Endpoint
- **Method**: `DELETE`
- **Path**: `/api/{user_id}/tasks/{id}`
- **Description**: Deletes a specific task by ID for the authenticated user
- **Response**:
  - Status: `204 No Content`
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing JWT
  - `403 Forbidden`: User ID mismatch or task doesn't belong to user
  - `404 Not Found`: Task ID or User ID does not exist

## Frontend Component Contracts

### Authentication Components
- **AuthForm Component**: Handles common form functionality for auth pages
  - Props: onSubmit, children, title
  - Events: form submission handling
- **LoginForm Component**: Specific functionality for login
  - Props: onForgotPassword, onSignupClick
  - Events: login submission, navigation to signup
- **SignupForm Component**: Specific functionality for signup
  - Props: onLoginClick
  - Events: signup submission, navigation to login

### Task Components
- **TaskList Component**: Displays list of tasks
  - Props: tasks (array), onTaskClick, loading state
  - Events: task selection, refresh trigger
- **TaskCard Component**: Displays individual task
  - Props: task object, onEdit, onDelete, onCompleteToggle
  - Events: edit, delete, completion toggle actions
- **TaskForm Component**: Handles task creation/editing
  - Props: task (optional for editing), onSubmit, onCancel
  - Events: form submission, cancellation

## Error Handling Contracts

### Frontend Error Responses
All API error responses follow this structure:
```json
{
  "detail": "Error message describing the issue"
}
```

### Common Error Types
- **401 Unauthorized**:
  - Cause: Invalid or expired JWT token
  - Frontend Action: Redirect to login page and clear stored token
- **403 Forbidden**:
  - Cause: Attempting to access resources that don't belong to the user
  - Frontend Action: Show user-friendly error message
- **404 Not Found**:
  - Cause: Requested resource doesn't exist
  - Frontend Action: Show appropriate error or empty state
- **500 Server Error**:
  - Cause: Backend server error
  - Frontend Action: Show generic error message to user

## Loading States Contract

### Loading Indicators
- **Page-level loading**: Full page spinner or skeleton screens
- **Component-level loading**: Localized spinners or skeleton elements
- **Button loading**: Disable button and show spinner
- **List loading**: Skeleton cards for each expected list item

## UI State Management Contract

### Global States
- **Authentication State**: User login status and token
- **Task Data State**: Cached task data from API
- **Loading States**: Per-resource loading indicators
- **Error States**: Error messages for display to user