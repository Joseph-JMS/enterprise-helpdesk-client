import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TechnicianDashboard } from "../technician-dashboard/technician-dashboard";
import { UserDashboard } from "../user-dashboard/user-dashboard";
import { AdminDashboard } from '../admin-dashboard/admin-dashboard';

@Component({
  selector: 'app-dashboard-wrapper',
  imports: [AdminDashboard, TechnicianDashboard, TechnicianDashboard, UserDashboard],
  templateUrl: './dashboard-wrapper.html',
})
export class DashboardWrapper {

  public authService = inject(AuthService);

}
