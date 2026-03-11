import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { TicketService } from '../../../../core/services/ticket.service';
import { ReportService } from '../../../../core/services/report.service';
import { SummaryResponse, TechnicianReportResponse } from '../../../../core/interfaces/report.interface';
import { TicketResponse } from '../../../../core/interfaces/ticket.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit{

  private readonly authService = inject(AuthService);
  private readonly ticketService = inject(TicketService);
  private readonly reportService = inject(ReportService);

  readonly user = this.authService.currentUser;
  readonly isAdmin = this.authService.isAdmin;
  readonly isTechnician = this.authService.isTechnician;

  readonly userRole = computed(() => {
    if (this.authService.isAdmin()) return 'ROLE_ADMIN';
    if (this.authService.isTechnician()) return 'ROLE_TECHNICIAN';
    return 'ROLE_USER';
  });

  summary = signal<SummaryResponse | null>(null);
  unassignedCount = signal<number>(0);

  myPerformance = signal<TechnicianReportResponse | null>(null);
  assignedTickets = signal<TicketResponse[]>([]);

  myTickets = signal<TicketResponse[]>([]);

  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    switch (this.userRole()) {
      case 'ROLE_ADMIN':
        this.loadAdminData();
        break;
      case 'ROLE_TECHNICIAN':
        this.loadTechnicianData();
        break;
      default:
        this.loadUserData();
    }
  }

  private loadAdminData() {
    this.reportService.getSummary().subscribe({
      next: (data) => {
        this.summary.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar los datos');
        this.isLoading.set(false);
      }
    });

    this.ticketService.getUnassigned(0, 5).subscribe({
      next: (data) => this.unassignedCount.set(data.page.totalElements)
    });
  }

  private loadTechnicianData() {
    this.reportService.getMyPerformance().subscribe({
      next: (data) => {
        this.myPerformance.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar los datos');
        this.isLoading.set(false);
      }
    });

    this.ticketService.getAssigned(0, 5).subscribe({
      next: (data) => this.assignedTickets.set(data.content)
    });
  }

  private loadUserData() {
    this.ticketService.getMyTickets(0, 5).subscribe({
      next: (data) => {
        this.myTickets.set(data.content);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar los datos');
        this.isLoading.set(false);
      }
    });
  }
}