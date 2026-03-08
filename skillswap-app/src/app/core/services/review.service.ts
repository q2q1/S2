import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models';

const API_BASE = 'https://stingray-app-wxhhn.ondigitalocean.app';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private http = inject(HttpClient);

  /** Submit a review for a completed job */
  submitReview(jobId: number, data: any): Observable<Review> {
    return this.http.post<Review>(`${API_BASE}/jobs/${jobId}/reviews`, data);
  }

  /** Get all reviews for a specific user */
  getUserReviews(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${API_BASE}/reviews/user/${userId}`);
  }
}
