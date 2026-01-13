import { AuthApi } from '@/api/AuthApi';
import type { LoginRequest, User } from '@/interfaces/Login';

export class AuthService {

  private static readonly JWT_KEY = 'jwt_token';
  private static readonly USER_KEY = 'user';

  static async login(loginRequest: LoginRequest): Promise<boolean> {
    try {
      const response = await AuthApi.login(loginRequest);
      
      this.setToken(response.token);
      this.setUser(response.user);

      return true;
    } catch (error) {
      console.error('Login Exception:', error);
      return false;
    }
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    try {
      await AuthApi.changePassword(currentPassword, newPassword);
      return true;
    } catch (error) {
      console.error('Change Password Exception:', error);
      return false;
    }
  }

  static logout(): void {
    localStorage.removeItem(this.JWT_KEY);
    localStorage.removeItem(this.USER_KEY);
    window.location.reload();
  }

  static isAuthenticated(): boolean {
    return this.getJwtToken() !== null && this.getUser() !== null;
  }

  static getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_KEY);
  }

  static getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  private static setToken(token: string): void {
    localStorage.setItem(this.JWT_KEY, token);
  }

  private static setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

}