import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { JobService } from '../../../core/services/job.service';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { Job } from '../../../core/models';

@Component({
  selector: 'app-my-postings',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, AlertComponent],
  templateUrl: './my-postings.component.html'
})
export class MyPostingsComponent implements OnInit {
  private jobService = inject(JobService);

  jobs: Job[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.jobService.getMyPostings().subscribe({
      next: data => {
        this.jobs = data;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Failed to load your postings';
        this.loading = false;
      }
    });
  }
}
