import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { AlertComponent } from '../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf, AlertComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Form fields
  name = '';
  username = '';
  email = '';
  password = '';
  bio = '';
  skillsInput = ''; // comma-separated, split before submit

  errorMessage: string | null = null;
  successMessage: string | null = null;
  suggestedUsername: string | null = null;
  loading = false;

  onSubmit(): void {
    // Basic validation
    if (!this.name || !this.username || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    // Convert comma-separated skills string to an array
    const skills = this.skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const data = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      bio: this.bio,
      skills
    };

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.suggestedUsername = null;

    this.authService.register(data).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'Registration failed.';
        // Show suggested username if there's a conflict (HTTP 409)
        if (err.status === 409 && err.error?.suggested_username) {
          this.suggestedUsername = err.error.suggested_username;
        }
      }
    });
  }
}
