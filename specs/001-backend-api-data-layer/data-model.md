# Data Model: Phase II – Backend API & Data Layer

## Task Entity

### Fields
- **id**: Integer (Primary Key, Auto-generated)
  - Unique identifier for each task
  - Auto-incrementing integer
- **title**: String (Required, Max 255 characters)
  - Title of the task
  - Cannot be empty
- **description**: String (Optional, Max 1000 characters)
  - Detailed description of the task
  - Can be null/empty
- **completed**: Boolean (Required)
  - Completion status of the task
  - Defaults to False
- **owner_id**: Integer (Required, Foreign Key)
  - Reference to the user who owns this task
  - Enforces user data isolation
- **created_at**: DateTime (Required)
  - Timestamp when the task was created
  - Auto-populated on creation
- **updated_at**: DateTime (Required)
  - Timestamp when the task was last updated
  - Auto-updated on modifications

### Relationships
- **Owner**: Many-to-One relationship with User entity
  - Each task belongs to one user
  - User can have many tasks

### Validation Rules
- Title must be between 1-255 characters
- Description, if provided, must be ≤ 1000 characters
- Owner_id must reference an existing user
- Completed field must be boolean type
- created_at and updated_at are automatically managed

### State Transitions
- **Creation**: New task with completed=False
- **Update**: Task details can be modified (title, description)
- **Toggle Completion**: completed field can be switched between True/False
- **Deletion**: Task is permanently removed from user's collection

## User Entity (Referenced)

### Fields
- **id**: Integer (Primary Key, Auto-generated)
  - Unique identifier for each user
  - Referenced by owner_id in Task entity
- **email**: String (Unique)
  - User's email address
- **created_at**: DateTime
  - When the user account was created
- **updated_at**: DateTime
  - When the user account was last updated

### Relationships
- **Tasks**: One-to-Many relationship with Task entity
  - Each user can own multiple tasks
  - Each task belongs to only one user

## Database Constraints
- Foreign key constraint on owner_id referencing User.id
- Non-null constraints on required fields
- Unique constraints where applicable
- Indexes on owner_id for efficient user-based queries
- Indexes on updated_at for sorting operations