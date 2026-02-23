import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AdminDashboard } from "../../admin/pages/admin-dashboard/admin-dashboard";
import { TechDashboard } from "../../technician/pages/tech-dashboard/tech-dashboard";
import { UserDashboard } from "../../user/pages/user-dashboard/user-dashboard";

@Component({
  selector: 'app-dashboard-wrapper',
  imports: [AdminDashboard, TechDashboard, UserDashboard],
  templateUrl: './dashboard-wrapper.html',
})
export class DashboardWrapper {

  public authService = inject(AuthService);

}
