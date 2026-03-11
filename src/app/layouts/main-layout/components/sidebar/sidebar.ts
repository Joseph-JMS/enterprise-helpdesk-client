import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class Sidebar {

  private readonly authService = inject(AuthService);
  
  protected readonly user = this.authService.currentUser;
  protected readonly isAdmin = this.authService.isAdmin;
  protected readonly isTechnician = this.authService.isTechnician;
  protected readonly isAdminOrTechnician = this.authService.isAdminOrTechnician;

  protected readonly roleLabel = computed(() => {
    if (this.authService.isAdmin()) return 'Administrador';
    if (this.authService.isTechnician()) return 'Tecnico';
    return 'Usuario';
  })

  logout() {
    this.authService.logout().subscribe();
  }

}
