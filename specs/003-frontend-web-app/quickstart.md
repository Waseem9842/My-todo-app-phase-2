# Quickstart Guide: Phase II – Frontend Web Application

## Setup Instructions

### Prerequisites
- Node.js 18+ (or latest LTS)
- npm or yarn package manager
- Access to the backend API (Phase II backend running)
- Better Auth configured on frontend

### Installation

1. **Clone and navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend API URL and other configuration
   ```

   Example `.env.local`:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Visit `http://localhost:3000` to access the application

## Development Workflow

### Running in Development
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Building for Production
```bash
npm run build
npm start
```

### Running Tests
```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e
```

## Key Features Walkthrough

### 1. Authentication Flow
- Navigate to `/signup` to create a new account
- Use `/signin` to log in with existing credentials
- Better Auth handles JWT token management automatically
- All API requests automatically include the JWT token

### 2. Task Management
- Once logged in, visit `/dashboard` or `/tasks` to see your task list
- Click "Create Task" to add a new todo item
- Use checkboxes to mark tasks as complete/incomplete
- Edit or delete tasks as needed

### 3. Responsive Design
- The UI adapts to different screen sizes automatically
- Mobile view optimizes for touch interactions
- Desktop view provides more space for task details

## API Integration

### Making Authenticated Requests
The frontend automatically attaches JWT tokens to all API requests through the API client wrapper:

```typescript
// Example of how API calls are made
const response = await apiClient.get(`/api/${userId}/tasks`);
```

### Error Handling
The application implements centralized error handling:
- Network errors display user-friendly messages
- Authentication errors redirect to login
- Validation errors highlight specific form fields

## Component Structure

### App Router Pages
- `/(auth)/` - Authentication-related pages (signup, signin)
- `/dashboard` - Main application shell
- `/tasks` - Task management views

### Component Categories
- `components/auth/` - Authentication UI components
- `components/tasks/` - Task management components
- `components/ui/` - Base UI primitives
- `components/layouts/` - Layout components

## Testing

### Running Tests
- Unit tests: `npm run test:unit` - Tests individual components and hooks
- Integration tests: `npm run test:integration` - Tests component interactions
- E2E tests: `npm run test:e2e` - Tests complete user flows

### Test Coverage
- Components have unit tests with React Testing Library
- API integration tested with mocked responses
- Critical user flows covered in E2E tests

## Troubleshooting

### Common Issues
1. **API requests returning 401 errors**
   - Verify JWT token is properly stored and attached
   - Check that the backend is running and accessible

2. **Authentication not working**
   - Confirm Better Auth is properly configured
   - Check that environment variables are set correctly

3. **Styling issues on mobile**
   - Verify Tailwind CSS is properly configured
   - Check responsive classes are applied correctly

### Development Tips
- Use the React DevTools to inspect component state
- Check browser console for API request details
- Verify environment variables are loaded properly