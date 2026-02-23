import { inject } from '@angular/core';
import type { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanMatchFn => {
  return (route, segments) => {
    const authService = inject(AuthService);
    const userRoles = authService.getUserRoles();
    const hasPermission = userRoles.some(role => allowedRoles.includes(role));

    if (hasPermission) {
      return true;
    }

    console.warn('Acceso denegado. Roles requeridos:', allowedRoles);
    return false;
  };
};