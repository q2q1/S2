import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job, Proposal } from '../models';

const API_BASE = 'https://stingray-app-wxhhn.ondigitalocean.app';

@Injectable({ providedIn: 'root' })
export class JobService {
  private http = inject(HttpClient);

  /** Search jobs with optional filters (category, status, min_budget) */
  searchJobs(filters: any = {}): Observable<Job[]> {
    return this.http.post<Job[]>(`${API_BASE}/jobs/search`, filters);
  }

  /** Create a new job posting */
  createJob(data: any): Observable<Job> {
    return this.http.post<Job>(`${API_BASE}/jobs`, data);
  }

  /** Get a single job by its ID */
  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(`${API_BASE}/jobs/${id}`);
  }

  /** Update a job (partial update) */
  updateJob(id: number, data: any): Observable<Job> {
    return this.http.patch<Job>(`${API_BASE}/jobs/${id}`, data);
  }

  /** Get all jobs posted by the current user */
  getMyPostings(): Observable<Job[]> {
    return this.http.get<Job[]>(`${API_BASE}/jobs/my-postings`);
  }

  /** Mark a job as completed */
  completeJob(id: number): Observable<Job> {
    return this.http.patch<Job>(`${API_BASE}/jobs/${id}/complete`, {});
  }

  /** Get all proposals submitted for a job */
  getProposalsForJob(id: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${API_BASE}/jobs/${id}/proposals`);
  }

  /** Submit a proposal for a job */
  submitProposal(jobId: number, data: any): Observable<Proposal> {
    return this.http.post<Proposal>(`${API_BASE}/jobs/${jobId}/proposals`, data);
  }
}
