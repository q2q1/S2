import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CurrencyPipe, AsyncPipe } from '@angular/common';
import { PlatformService } from '../../core/services/platform.service';
import { AuthService } from '../../core/services/auth.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { PlatformStats } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf, CurrencyPipe, AsyncPipe, AlertComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private platformService = inject(PlatformService);
  authService = inject(AuthService);

  stats: PlatformStats | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    // Load platform statistics for display on the landing page
    this.platformService.getStats().subscribe({
      next: data => this.stats = data,
      error: err => this.errorMessage = err.error?.error || 'Failed to load stats'
    });
  }
}
