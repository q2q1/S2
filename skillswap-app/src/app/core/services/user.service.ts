import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';

const API_BASE = 'https://stingray-app-wxhhn.ondigitalocean.app';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  /** Get the current authenticated user's profile */
  getMe(): Observable<User> {
    return this.http.get<User>(`${API_BASE}/users/me`);
  }

  /** Get a user's public profile by their username */
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${API_BASE}/users/${username}`);
  }
}
