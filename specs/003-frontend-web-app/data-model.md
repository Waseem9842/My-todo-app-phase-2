# Data Model: Phase II – Frontend Web Application

## Authenticated User Entity (Frontend State)

### Properties
- **id**: String or Integer
  - Unique identifier for the authenticated user
  - Retrieved from JWT token payload or auth service
- **email**: String
  - User's email address for identification
  - Retrieved during authentication process
- **isLoggedIn**: Boolean
  - Flag indicating current authentication status
  - Used for conditional UI rendering and route protection
- **token**: String (JWT)
  - Authentication token for API requests
  - Stored securely and attached to API calls

### Validation Rules
- User ID must be present after successful authentication
- Email must be valid if provided
- Token must be valid and unexpired for API access

## Todo Task Entity (Frontend Representation)

### Properties
- **id**: Integer (Primary Identifier)
  - Unique identifier for each task
  - Provided by backend API
- **title**: String (Required, 1-255 characters)
  - Title of the task
  - Displayed prominently in UI
- **description**: String (Optional, max 1000 characters)
  - Detailed description of the task
  - Optional additional information
- **completed**: Boolean (Required)
  - Completion status of the task
  - Determines visual styling and actions
- **owner_id**: Integer (Foreign Key Reference)
  - Reference to the user who owns this task
  - Used for data isolation on frontend
- **created_at**: DateTime (ISO 8601 string)
  - Timestamp when the task was created
  - Provided by backend API
- **updated_at**: DateTime (ISO 8601 string)
  - Timestamp when the task was last updated
  - Provided by backend API

### Validation Rules
- Title must be between 1-255 characters
- Description, if provided, must be ≤ 1000 characters
- Completed field must be boolean type
- owner_id must match the authenticated user's ID for access

### State Transitions
- **Creation**: New task with completed=false
- **Update**: Task details can be modified (title, description)
- **Toggle Completion**: completed field switched between true/false
- **Deletion**: Task removed from UI and backend

## API Response Entity

### Properties
- **success**: Boolean
  - Indicates whether the API request was successful
  - Used for conditional UI behavior
- **data**: Object or Array
  - The actual response data from the API
  - Varies based on the specific endpoint
- **error**: String (Optional)
  - Error message if the request failed
  - Used for displaying user-friendly error messages
- **statusCode**: Integer
  - HTTP status code of the response
  - Used for determining error handling strategy

## Loading State Entity

### Properties
- **isLoading**: Boolean
  - Indicates whether data is currently being loaded
  - Used for showing loading indicators
- **error**: String (Optional)
  - Error message if loading failed
  - Used for displaying error states
- **hasLoaded**: Boolean
  - Indicates if data has been successfully loaded
  - Used for conditional rendering

## Form State Entity

### Properties
- **formData**: Object
  - Current values of form fields
  - Used for controlled components
- **errors**: Object
  - Validation errors for each field
  - Used for displaying field-specific errors
- **isSubmitting**: Boolean
  - Indicates if form is currently being submitted
  - Used for disabling submit button and showing submission indicator