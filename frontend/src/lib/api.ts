// API client utilities for the frontend
// Centralized API client for making authenticated requests to the backend

import { getToken } from './auth';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

/**
 * Makes an authenticated API request
 * @param endpoint - The API endpoint to call
 * @param options - Request options including method, body, etc.
 * @returns Promise with the response data
 */
export async function authenticatedRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Prepare headers with JWT token if available
  const headers = new Headers(options.headers);

  // Add JWT token to authorization header if authenticated
  const token = getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Set default content type if not already set
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  // Construct full URL
  const url = `${API_BASE_URL}${endpoint}`;
  let response;

  try {
    response = await fetch(url, {
      ...options,
      headers,
    });

    // If response is 401 (Unauthorized), consider token expired
    if (response.status === 401) {
      // In a real app, we'd want to remove the token and redirect to login
      // localStorage.removeItem('jwt_token');
      throw new Error('Unauthorized: Please sign in again');
    }

    // If response is 403 (Forbidden), handle accordingly
    if (response.status === 403) {
      throw new Error('Forbidden: Access denied');
    }

    // Try to parse response as JSON
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // For non-JSON responses (like DELETE with 204 status)
      if (response.status === 204) {
        return undefined as any; // Return undefined for 204 responses
      }
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(data?.detail || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API request error for ${url}:`, error);
    throw error;
  }
}

// Export individual methods for convenience
export const apiClient = {
  get: <T>(endpoint: string) => authenticatedRequest<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, data?: any) => authenticatedRequest<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  }),
  put: <T>(endpoint: string, data: any) => authenticatedRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  patch: <T>(endpoint: string, data: any) => authenticatedRequest<T>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: <T>(endpoint: string) => authenticatedRequest<T>(endpoint, { method: 'DELETE' }),
};