import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ProposalService } from '../../../core/services/proposal.service';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { Proposal } from '../../../core/models';

@Component({
  selector: 'app-my-bids',
  standalone: true,
  imports: [NgIf, NgFor, AlertComponent],
  templateUrl: './my-bids.component.html'
})
export class MyBidsComponent implements OnInit {
  private proposalService = inject(ProposalService);

  proposals: Proposal[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  ngOnInit(): void {
    this.loadBids();
  }

  loadBids(): void {
    this.loading = true;
    this.proposalService.getMyBids().subscribe({
      next: data => {
        this.proposals = data;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Failed to load your bids';
        this.loading = false;
      }
    });
  }

  withdrawBid(proposalId: number): void {
    this.errorMessage = null;
    this.proposalService.deleteProposal(proposalId).subscribe({
      next: () => {
        this.successMessage = 'Proposal withdrawn.';
        this.loadBids(); // Reload the list
      },
      error: err => this.errorMessage = err.error?.error || 'Failed to withdraw proposal'
    });
  }
}
