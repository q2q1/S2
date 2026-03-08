import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../models';

const API_BASE = 'https://stingray-app-wxhhn.ondigitalocean.app';

@Injectable({ providedIn: 'root' })
export class ProposalService {
  private http = inject(HttpClient);

  /** Get all proposals submitted by the current user */
  getMyBids(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${API_BASE}/proposals/my-bids`);
  }

  /** Accept a proposal (owner action) */
  acceptProposal(id: number): Observable<Proposal> {
    return this.http.patch<Proposal>(`${API_BASE}/proposals/${id}/accept`, {});
  }

  /** Delete/withdraw a proposal (freelancer action) */
  deleteProposal(id: number): Observable<any> {
    return this.http.delete(`${API_BASE}/proposals/${id}`);
  }
}
