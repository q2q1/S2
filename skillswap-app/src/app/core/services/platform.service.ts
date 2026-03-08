import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlatformStats } from '../models';

const API_BASE = 'https://stingray-app-wxhhn.ondigitalocean.app';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  private http = inject(HttpClient);

  /** Get aggregate platform statistics */
  getStats(): Observable<PlatformStats> {
    return this.http.get<PlatformStats>(`${API_BASE}/platform/stats`);
  }
}
