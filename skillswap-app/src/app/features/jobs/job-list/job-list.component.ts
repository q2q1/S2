import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { JobService } from '../../../core/services/job.service';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { Job } from '../../../core/models';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, NgFor, AlertComponent],
  templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit {
  private jobService = inject(JobService);

  jobs: Job[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  // Search filter fields
  filterCategory = '';
  filterStatus = '';
  filterMinBudget: number | null = null;

  ngOnInit(): void {
    // Load all jobs on init
    this.loadJobs({});
  }

  onSearch(): void {
    const filters: any = {};
    if (this.filterCategory) filters['category'] = this.filterCategory;
    if (this.filterStatus) filters['status'] = this.filterStatus;
    if (this.filterMinBudget) filters['min_budget'] = this.filterMinBudget;
    this.loadJobs(filters);
  }

  private loadJobs(filters: any): void {
    this.loading = true;
    this.errorMessage = null;
    this.jobService.searchJobs(filters).subscribe({
      next: data => {
        this.jobs = data;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Failed to load jobs';
        this.loading = false;
      }
    });
  }
}
