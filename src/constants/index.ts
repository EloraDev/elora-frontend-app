export const AUTH_STORAGE_KEY = "auth-session";
export const DEFAULT_PAGE_SIZE = 10;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_EXISTS: "Email already registered",
  WEAK_PASSWORD: "Password does not meet security requirements",
  SESSION_EXPIRED: "Session has expired",
  RATE_LIMIT: "Too many attempts. Please try again later",
  UNAUTHORIZED: "Unauthorized",
  REGISTRATION_FAILED: "Registration failed. Please try again.",
} as const;