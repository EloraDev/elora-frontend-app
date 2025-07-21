import { AUTH_STORAGE_KEY } from "../constants";


class AuthService {
  private readonly tokenKey = AUTH_STORAGE_KEY;

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

  isAuthenticated() {
    const hasToken = !!this.getToken();
    return hasToken;
  }

  async logout() {
    this.removeToken();
  }
}

export const authService = new AuthService();
