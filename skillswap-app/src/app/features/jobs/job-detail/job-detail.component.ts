import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { JobService } from '../../../core/services/job.service';
import { ProposalService } from '../../../core/services/proposal.service';
import { ReviewService } from '../../../core/services/review.service';
import { AuthService } from '../../../core/services/auth.service';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { Job, Proposal, User } from '../../../core/models';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, AlertComponent],
  templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private jobService = inject(JobService);
  private proposalService = inject(ProposalService);
  private reviewService = inject(ReviewService);
  authService = inject(AuthService);

  job: Job | null = null;
  proposals: Proposal[] = [];
  currentUser: User | null = null;

  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  // Proposal submission form fields
  proposalPrice: number | null = null;
  proposalCoverLetter = '';

  // Review form fields
  reviewTargetId: number | null = null;
  reviewRating: number = 5;
  reviewComment = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Load current user and job in parallel
    this.authService.currentUser$.subscribe(user => this.currentUser = user);
    this.loadJob(id);
  }

  loadJob(id: number): void {
    this.loading = true;
    this.jobService.getJob(id).subscribe({
      next: job => {
        this.job = job;
        this.loading = false;

        // If owner viewing an open job, load proposals
        if (this.isOwner() && job.status === 'open') {
          this.loadProposals(job.id);
        }

        // Pre-fill review target (the other participant)
        if (job.status === 'completed') {
          if (this.isOwner()) {
            this.reviewTargetId = job.freelancer_id || null;
          } else if (this.isFreelancer()) {
            this.reviewTargetId = job.owner_id;
          }
        }
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Failed to load job';
        this.loading = false;
      }
    });
  }

  loadProposals(jobId: number): void {
    this.jobService.getProposalsForJob(jobId).subscribe({
      next: data => this.proposals = data,
      error: err => this.errorMessage = err.error?.error || 'Failed to load proposals'
    });
  }

  isOwner(): boolean {
    return !!this.currentUser && !!this.job && this.currentUser.id === this.job.owner_id;
  }

  isFreelancer(): boolean {
    return !!this.currentUser && !!this.job && this.currentUser.id === this.job.freelancer_id;
  }

  acceptProposal(proposalId: number): void {
    this.errorMessage = null;
    this.proposalService.acceptProposal(proposalId).subscribe({
      next: () => this.loadJob(this.job!.id),
      error: err => this.errorMessage = err.error?.error || 'Failed to accept proposal'
    });
  }

  markCompleted(): void {
    this.errorMessage = null;
    this.jobService.completeJob(this.job!.id).subscribe({
      next: () => this.loadJob(this.job!.id),
      error: err => this.errorMessage = err.error?.error || 'Failed to mark job complete'
    });
  }

  submitProposal(): void {
    if (!this.proposalPrice || !this.proposalCoverLetter) {
      this.errorMessage = 'Please fill in price and cover letter.';
      return;
    }
    this.errorMessage = null;
    this.jobService.submitProposal(this.job!.id, {
      price: this.proposalPrice,
      cover_letter: this.proposalCoverLetter
    }).subscribe({
      next: () => {
        this.successMessage = 'Proposal submitted successfully!';
        this.proposalPrice = null;
        this.proposalCoverLetter = '';
      },
      error: err => this.errorMessage = err.error?.error || 'Failed to submit proposal'
    });
  }

  submitReview(): void {
    if (!this.reviewTargetId || !this.reviewRating) {
      this.errorMessage = 'Please fill in all review fields.';
      return;
    }
    this.errorMessage = null;
    this.reviewService.submitReview(this.job!.id, {
      target_id: this.reviewTargetId,
      rating: this.reviewRating,
      comment: this.reviewComment
    }).subscribe({
      next: () => {
        this.successMessage = 'Review submitted!';
      },
      error: err => this.errorMessage = err.error?.error || 'Failed to submit review'
    });
  }
}
