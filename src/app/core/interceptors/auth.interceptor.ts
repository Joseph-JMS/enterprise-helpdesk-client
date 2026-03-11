import type { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const excludedUrls = ['/auth/login', '/auth/register', '/auth/refresh'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (isExcluded) {
    return next(req);
  }

  const token = authService.accessToken();
  const authReq = token ? addToken(req, token) : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status !== 401 || !token) {
        return throwError(() => error);
      }

      return authService.refresh().pipe(
        switchMap(() => {
          const newToken = authService.accessToken();
          return next(addToken(req, newToken));
        }),
        catchError(refreshError => {
          authService.logout().subscribe();
          return throwError(() => refreshError);
        })
      );
    })
  );
};

function addToken(req: HttpRequest<unknown>, token: string|null): HttpRequest<unknown> {
  if (!token) return req;

  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
