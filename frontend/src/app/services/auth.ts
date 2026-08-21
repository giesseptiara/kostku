import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // 1. Tambahkan import ini
import { environment } from '../../environments/environment';

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
  private apiUrl = `${environment.apiUrl}/auth`;
  private isBrowser: boolean; // 2. Tambahkan variabel penanda

  // 3. Inject PLATFORM_ID di constructor
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Cek apakah kode running di browser atau server
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

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
    if (this.isBrowser) {
      localStorage.setItem('kostku_token', token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('kostku_token');
    }
    return null; // Kembalikan null jika sedang di-render oleh server Vercel
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('kostku_token');
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && token !== 'undefined' && token !== 'null';
  }
}
