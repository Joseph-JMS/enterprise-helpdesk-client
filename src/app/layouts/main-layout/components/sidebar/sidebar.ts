import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class Sidebar {

  authService = inject(AuthService);
  
  protected user = signal(this.authService.currentUser());
  protected roles = signal(this.authService.getUserRoles());

  logout() {
    this.authService.logout();
  }

}
