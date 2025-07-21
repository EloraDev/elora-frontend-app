export const AuthState = {
  IDLE: "idle",
  AUTHENTICATING: "authenticating",
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
  LOGOUT: "logout",
} as const;

export type AuthState = typeof AuthState[keyof typeof AuthState];
  
  export interface CreateAdminInput {
    first_name: string;
    last_name: string;
    email: string;
    state: string;
    city: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    password: string;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
    rememberMe?: boolean;
  }
  
  export interface UpdatePasswordInput {
    id: string;
    currentPassword: string;
    newPassword: string;
  }
  
  export interface PasswordRequirement {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  }