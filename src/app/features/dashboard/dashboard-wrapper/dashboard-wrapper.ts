import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AdminDashboard } from "../../admin/pages/admin-dashboard/admin-dashboard";
import { TechnicianDashboard } from "../technician-dashboard/technician-dashboard";
import { UserDashboard } from "../user-dashboard/user-dashboard";

@Component({
  selector: 'app-dashboard-wrapper',
  imports: [AdminDashboard, TechnicianDashboard, TechnicianDashboard, UserDashboard],
  templateUrl: './dashboard-wrapper.html',
})
export class DashboardWrapper {

  public authService = inject(AuthService);

}
