import { Component, inject, signal } from '@angular/core';
import { TicketCardSkeleton } from "../../../../shared/components/ticket-card-skeleton/ticket-card-skeleton";
import { Pagination } from "../../../../shared/components/pagination/pagination";
import { TicketResponse } from '../../../../core/interfaces/ticket.interface';
import { TicketService } from '../../../../core/services/ticket.service';
import { Router } from '@angular/router';
import { TicketCard } from "../../components/ticket-card/ticket-card";
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { UserResponse } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-unassigned-tickets',
  imports: [TicketCardSkeleton, Pagination, TicketCard],
  templateUrl: './unassigned-tickets.html',
})
export class UnassignedTickets {

  private readonly ticketService = inject(TicketService);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  tickets = signal<TicketResponse[]>([]);
  technicians = signal<UserResponse[]>([]);
  selectedTechnicianMap = signal<Record<number, string>>({});
  isLoading = signal<boolean>(true);
  isProcessing = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  currentPage = signal<number>(0);
  totalPages = signal<number>(0);
  totalElements = signal<number>(0);
  pageSize = 10;

  readonly isAdmin = this.authService.isAdmin;
  readonly isTechnician = this.authService.isTechnician;

  ngOnInit() {
    this.loadTickets();
    if (this.isAdmin()) {
      this.loadTechnicians();
    }
  }

  loadTickets(page: number = 0) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.ticketService.getUnassigned(page, this.pageSize).subscribe({
      next: (data) => {
        this.tickets.set(data.content);
        this.currentPage.set(data.page.number);
        this.totalPages.set(data.page.totalPages);
        this.totalElements.set(data.page.totalElements);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar los tickets');
        this.isLoading.set(false);
      }
    });
  }

  loadTechnicians() {
    this.userService.getByRole('ROLE_TECHNICIAN').subscribe({
      next: (data) => this.technicians.set(data.content),
      error: () => {}
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages()) {
      this.loadTickets(page);
    }
  }

  goToDetail(id: number) {
    this.router.navigate(['/tickets', id]);
  }

  onTechnicianSelect(ticketId: number, username: string) {
    this.selectedTechnicianMap.update(map => ({ ...map, [ticketId]: username }));
  }

  assignToMe(id: number) {
    this.isProcessing.set(true);
    this.ticketService.assign(id).subscribe({
      next: () => {
        this.isProcessing.set(false);
        this.loadTickets(this.currentPage());
      },
      error: () => {
        this.errorMessage.set('Error al asignar el ticket');
        this.isProcessing.set(false);
      }
    });
  }

  assignTo(ticketId: number) {
    const username = this.selectedTechnicianMap()[ticketId];
    if (!username) return;

    this.isProcessing.set(true);
    this.ticketService.assign(ticketId, username).subscribe({
      next: () => {
        this.isProcessing.set(false);
        this.loadTickets(this.currentPage());
      },
      error: () => {
        this.errorMessage.set('Error al asignar el ticket');
        this.isProcessing.set(false);
      }
    });
  }

}
