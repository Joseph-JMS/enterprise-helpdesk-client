import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
})
export class Dashboard {

  private readonly authService = inject(AuthService);

  readonly isAdmin = this.authService.isAdmin;
  readonly isTechnician = this.authService.isTechnician;
  readonly isAdminOrTechnician = this.authService.isAdminOrTechnician;
  readonly user = this.authService.currentUser;

  readonly userRole = computed(() => {
    if (this.authService.isAdmin()) return 'ROLE_ADMIN';
    if (this.authService.isTechnician()) return 'ROLE_TECHNICIAN';
    return 'ROLE_USER';
  });
  
}
