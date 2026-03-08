import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { ReviewService } from '../../core/services/review.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { User, Review } from '../../core/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgFor, AlertComponent],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private reviewService = inject(ReviewService);

  user: User | null = null;
  reviews: Review[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username')!;
    this.loading = true;

    // Load user profile by username
    this.userService.getUserByUsername(username).subscribe({
      next: user => {
        this.user = user;
        this.loading = false;
        // Then load their reviews
        this.reviewService.getUserReviews(user.id).subscribe({
          next: data => this.reviews = data,
          error: err => this.errorMessage = err.error?.error || 'Failed to load reviews'
        });
      },
      error: err => {
        this.errorMessage = err.error?.error || 'User not found';
        this.loading = false;
      }
    });
  }

  /** Convert rating number to star string for display */
  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }
}
