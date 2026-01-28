// Authentication configuration settings
// This file contains the configuration settings for JWT authentication

import { z } from 'zod';

// Define the authentication configuration schema
const authConfigSchema = z.object({
  auth_secret: z.string().default(process.env.AUTH_SECRET || 'fallback-dev-secret-change-in-production'),
  auth_algorithm: z.string().default(process.env.AUTH_ALGORITHM || 'HS256'),
  auth_audience: z.string().optional().default(process.env.AUTH_AUDIENCE || 'todo-api'),
  auth_issuer: z.string().optional().default(process.env.AUTH_ISSUER || 'better-auth'),
  access_token_expire_minutes: z.number().default(parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || '30')),
});

// Define the AuthConfig interface
interface AuthConfig {
  auth_secret: string;
  auth_algorithm: string;
  auth_audience?: string;
  auth_issuer?: string;
  access_token_expire_minutes: number;
}

// Create and validate the configuration
const rawAuthConfig = {
  auth_secret: process.env.AUTH_SECRET || 'fallback-dev-secret-change-in-production',
  auth_algorithm: process.env.AUTH_ALGORITHM || 'HS256',
  auth_audience: process.env.AUTH_AUDIENCE || 'todo-api',
  auth_issuer: process.env.AUTH_ISSUER || 'better-auth',
  access_token_expire_minutes: parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || '30'),
};

// Validate the configuration against the schema
const parsedConfig = authConfigSchema.safeParse(rawAuthConfig);

if (!parsedConfig.success) {
  console.error('Invalid authentication configuration:', parsedConfig.error.flatten());
  throw new Error(`Invalid authentication configuration: ${JSON.stringify(parsedConfig.error.flatten())}`);
}

// Export the validated configuration
export const auth_config: AuthConfig = parsedConfig.data;