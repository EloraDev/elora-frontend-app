import { AUTH_STORAGE_KEY } from "../constants";
import type { LoginUser } from "../features/auth/types";

const USER_STORAGE_KEY = "auth-user";

class AuthService {
  private readonly tokenKey = AUTH_STORAGE_KEY;
  private readonly userKey = USER_STORAGE_KEY;

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    const token = localStorage.getItem(this.tokenKey);
    return token;
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  setUser(user: LoginUser) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): LoginUser | null {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as LoginUser;
    } catch {
      return null;
    }
  }

  removeUser() {
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated() {
    const hasToken = !!this.getToken();
    return hasToken;
  }

  async logout() {
    this.removeToken();
    this.removeUser();
  }
}

export const authService = new AuthService();
