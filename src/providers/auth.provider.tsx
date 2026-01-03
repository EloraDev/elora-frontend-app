import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../service/auth.service";
import { AuthState } from "../types/auth";
import { useLogoutMutation } from "../features/auth/api/mutations";
import { useAuthUser } from "../features/auth/api/queries";
import type { LoginUser } from "../features/auth/types";

export interface AuthContextType {
  user: LoginUser | null | undefined;
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
  logout: () => void;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authState: AuthState.IDLE,
  setAuthState: () => console.warn("AuthContext not initialized"),
  logout: () => console.warn("AuthContext not initialized"),
  refetch: () => console.warn("AuthContext not initialized"),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize with cached user from localStorage for immediate display
  const [cachedUser] = useState<LoginUser | null>(() => authService.getUser());
  const [authState, setAuthState] = useState<AuthState>(() => 
    authService.isAuthenticated() ? AuthState.AUTHENTICATED : AuthState.IDLE
  );
  
  const { data: fetchedUser, isError, isLoading, refetch } = useAuthUser();
  const logoutMutation = useLogoutMutation();

  // Use fetched user if available, otherwise fall back to cached user
  const user = fetchedUser ?? cachedUser;

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAuthState(AuthState.UNAUTHENTICATED);
    }
  };

  useEffect(() => {
    if (authService.isAuthenticated()) {
      setAuthState(AuthState.AUTHENTICATED);
      return;
    };

    if (isLoading) return;

    const newAuthState = user && !isError ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED;
    setAuthState(newAuthState);

    if (isError && !authService.isAuthenticated()) {
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isError, isLoading]);


  const contextValue = {
    user: user ?? undefined,
    // Only show authenticating if we have no cached user and are loading
    authState: (isLoading && !cachedUser) ? AuthState.AUTHENTICATING : authState,
    setAuthState,
    logout: handleLogout,
    refetch,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
