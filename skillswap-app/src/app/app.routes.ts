import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';
import { JobCreateComponent } from './features/jobs/job-create/job-create.component';
import { JobDetailComponent } from './features/jobs/job-detail/job-detail.component';
import { MyPostingsComponent } from './features/jobs/my-postings/my-postings.component';
import { MyBidsComponent } from './features/proposals/my-bids/my-bids.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'jobs', component: JobListComponent, canActivate: [authGuard] },
  { path: 'jobs/create', component: JobCreateComponent, canActivate: [authGuard] },
  { path: 'jobs/:id', component: JobDetailComponent, canActivate: [authGuard] },
  { path: 'my-postings', component: MyPostingsComponent, canActivate: [authGuard] },
  { path: 'my-bids', component: MyBidsComponent, canActivate: [authGuard] },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
