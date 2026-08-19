import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Admin {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    admin: Admin;
  };
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: {
    admin: Admin;
  };
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  getCurrentAdmin(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.apiUrl}/me`);
  }

  saveToken(token: string): void {
    localStorage.setItem('kostku_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('kostku_token');
  }

  logout(): void {
    localStorage.removeItem('kostku_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}