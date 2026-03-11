import { Component, inject, signal } from '@angular/core';
import { TicketCard } from "../../components/ticket-card/ticket-card";
import { TicketService } from '../../../../core/services/ticket.service';
import { Router } from '@angular/router';
import { TicketResponse } from '../../../../core/interfaces/ticket.interface';

@Component({
  selector: 'app-my-tickets',
  imports: [TicketCard],
  templateUrl: './my-tickets.html',
})
export class MyTickets {

  private readonly ticketService = inject(TicketService);
  private readonly router = inject(Router);

  tickets = signal<TicketResponse[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  currentPage = signal<number>(0);
  totalPages = signal<number>(0);
  totalElements = signal<number>(0);
  pageSize = 10;

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets(page: number = 0) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.ticketService.getMyTickets(page, this.pageSize).subscribe({
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

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages()) {
      this.loadTickets(page);
    }
  }

  goToDetail(id: number) {
    this.router.navigate(['/tickets', id]);
  }

  cancelTicket(id: number) {
    this.ticketService.cancel(id).subscribe({
      next: () => this.loadTickets(this.currentPage()),
      error: () => this.errorMessage.set('Error al cancelar el ticket')
    });
  }

}
