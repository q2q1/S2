import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Functional HTTP interceptor:
 * - Attaches the JWT Bearer token to every outgoing request
 * - Handles 401 Unauthorized by logging the user out
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Clone the request and add Authorization header if we have a token
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If 401, the token is invalid or expired — log the user out
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
