// Authentication-related TypeScript types

// Authenticated user interface
export interface AuthenticatedUser {
  id: string | null;
  isAuthenticated: boolean;
}

// Authentication state interface
export interface AuthState {
  user: AuthenticatedUser | null;
  loading: boolean;
  error: string | null;
}

// Login credentials interface
export interface LoginCredentials {
  email: string;
  password: string;
}

// Signup credentials interface
export interface SignupCredentials {
  email: string;
  password: string;
  name?: string;
}

// Login response interface
export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: AuthenticatedUser;
  error?: string;
}

// Signup response interface
export interface SignupResponse {
  success: boolean;
  token?: string;
  user?: AuthenticatedUser;
  error?: string;
}

// JWT token payload interface
export interface JwtPayload {
  sub: string; // Subject (user ID)
  exp: number; // Expiration time (timestamp)
  iat: number; // Issued at time (timestamp)
  email?: string;
  name?: string;
  aud?: string | string[]; // Audience
  iss?: string; // Issuer
}

// Authentication context interface
export interface AuthContextType {
  user: AuthenticatedUser | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  error: string | null;
}