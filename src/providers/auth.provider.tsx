import { createContext, useContext, useEffect, useState } from "react";
// import { useLogoutMutation } from "~/features/auth/api/mutations";
// import { useAuthUser } from "~/features/auth/api/queries";
// import { AuthState } from "~/types/auth";
// import { AuthUser } from "~/types/users";
import { authService } from "../service/auth.service";
import { AuthState } from "../types/auth";
import { useLogoutMutation } from "../features/auth/api/mutations";
import { useAuthUser } from "../features/auth/api/queries";
import type { AuthUser } from "../features/auth/types";

export interface AuthContextType {
  user: AuthUser | null | undefined;
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
  const [authState, setAuthState] = useState<AuthState>(AuthState.IDLE);
  const { data: user, isError, isLoading, refetch } = useAuthUser();
  const logoutMutation = useLogoutMutation();

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
    authState: isLoading ? AuthState.AUTHENTICATING : authState,
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
