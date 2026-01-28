// Authentication utilities for the frontend
// Safe, defensive, and JWT-format aware

import { jwtDecode } from 'jwt-decode';

/**
 * Normalize token:
 * - Removes "Bearer " prefix
 * - Trims spaces
 * - Prevents null / undefined / empty strings
 */
const normalizeToken = (token?: string | null): string | null => {
  if (!token || typeof token !== 'string') return null;

  const cleaned = token.startsWith('Bearer ')
    ? token.replace('Bearer ', '').trim()
    : token.trim();

  return cleaned.length > 0 ? cleaned : null;
};

/**
 * Store JWT token
 */
export const storeToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt_token', token);
  }
};

/**
 * Get JWT token
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('jwt_token');
  if (token === 'null' || token === 'undefined') return null;

  return token;
};

/**
 * Remove JWT token
 */
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt_token');
  }
};

/**
 * Decode JWT token safely
 */
export const decodeToken = (token?: string | null): any | null => {
  const cleanedToken = normalizeToken(token);
  if (!cleanedToken) return null;

  const parts = cleanedToken.split('.');
  if (parts.length !== 3) {
    console.warn('Invalid JWT format:', cleanedToken);
    return null;
  }

  try {
    return jwtDecode(cleanedToken);
  } catch (error) {
    console.warn('JWT decode failed:', error);
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token?: string | null): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  return !isTokenExpired(token);
};

/**
 * Get user ID from JWT token
 * Assumes "sub" contains user ID
 */
export const getUserIdFromToken = (): string | null => {
  const decoded = decodeToken(getToken());
  if (decoded?.sub) {
    // Ensure the user ID is returned as a string for consistency
    return typeof decoded.sub === 'number' ? decoded.sub.toString() : decoded.sub;
  }
  return null;
};
