import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { User } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, AlertComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);

  user: User | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  ngOnInit(): void {
    // Load current user data when dashboard loads
    this.authService.loadCurrentUser().subscribe({
      next: user => this.user = user,
      error: err => this.errorMessage = err.error?.error || 'Failed to load user data'
    });
  }
}
