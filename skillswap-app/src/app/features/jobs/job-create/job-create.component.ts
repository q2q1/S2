import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { JobService } from '../../../core/services/job.service';
import { AlertComponent } from '../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-job-create',
  standalone: true,
  imports: [FormsModule, NgIf, AlertComponent],
  templateUrl: './job-create.component.html'
})
export class JobCreateComponent {
  private jobService = inject(JobService);
  private router = inject(Router);

  title = '';
  description = '';
  budget: number | null = null;
  category = '';

  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  onSubmit(): void {
    // Validate required fields
    if (!this.title || !this.description || !this.budget || !this.category) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    this.jobService.createJob({
      title: this.title,
      description: this.description,
      budget: this.budget,
      category: this.category
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/my-postings']);
      },
      error: err => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'Failed to create job';
      }
    });
  }
}
