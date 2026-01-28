// Utility functions for the frontend application

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to merge class names with tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}