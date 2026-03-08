import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models';

const API_BASE = 'https://stingray-app-wxhhn.ondigitalocean.app';
const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // BehaviorSubject holds the currently logged-in user (or null)
  currentUser$ = new BehaviorSubject<User | null>(null);

  /** Register a new user account */
  register(data: any): Observable<any> {
    return this.http.post(`${API_BASE}/auth/register`, data);
  }

  /** Login: stores token and fetches user profile */
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${API_BASE}/auth/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem(TOKEN_KEY, res.token);
        this.loadCurrentUser().subscribe();
      })
    );
  }

  /** Logout: clears storage and redirects to /login */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUser$.next(null);
    this.router.navigate(['/login']);
  }

  /** Returns the stored JWT token */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /** True if a token exists in localStorage */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** Fetch the current user profile and push it into currentUser$ */
  loadCurrentUser(): Observable<User> {
    return this.http.get<User>(`${API_BASE}/users/me`).pipe(
      tap(user => this.currentUser$.next(user))
    );
  }
}
