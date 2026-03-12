import { Component, inject, OnInit, signal } from '@angular/core';
import { TicketService } from '../../../../core/services/ticket.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketResponse, TicketStatusHistoryResponse } from '../../../../core/interfaces/ticket.interface';
import { TicketHistory } from "../../components/ticket-history/ticket-history";
import { StatusLabelPipe } from '../../../../core/pipes/status-label.pipe';
import { StatusClassPipe } from '../../../../core/pipes/status-class.pipe';
import { PriorityLabelPipe } from '../../../../core/pipes/priority-label.pipe';
import { PriorityClassPipe } from '../../../../core/pipes/priority-class.pipe';
import { DatePipe } from '@angular/common';
import { CommentService } from '../../../../core/services/comment.service';
import { CommentResponse } from '../../../../core/interfaces/comment.interface';

@Component({
  selector: 'ticket-detail',
  imports: [TicketHistory, StatusLabelPipe, StatusClassPipe, PriorityLabelPipe, PriorityClassPipe, DatePipe],
  templateUrl: './ticket-detail.html',
})
export class TicketDetail implements OnInit{

  private readonly ticketService = inject(TicketService);
  private readonly authService = inject(AuthService);
  private readonly commentService = inject(CommentService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  ticket = signal<TicketResponse | null>(null);
  history = signal<TicketStatusHistoryResponse[]>([]);
  comments = signal<CommentResponse[]>([]);

  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);
  isProcessing = signal<boolean>(false);
  isSubmittingComment = signal<boolean>(false);
  commentContent = signal<string>('');

  readonly isAdmin = this.authService.isAdmin;
  readonly isTechnician = this.authService.isTechnician;
  readonly isAdminOrTechnician = this.authService.isAdminOrTechnician;
  readonly currentUser = this.authService.currentUser;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTicket(id);
  }

  loadTicket(id: number) {
    this.isLoading.set(true);
    this.ticketService.getById(id).subscribe({
      next: (data) => {
        this.ticket.set(data);
        this.isLoading.set(false);
        this.loadHistory(id);
        this.loadComments(id);
      },
      error: () => {
        this.errorMessage.set('Error al cargar el ticket');
        this.isLoading.set(false);
      }
    });
  }

  loadHistory(id: number) {
    this.ticketService.getHistory(id).subscribe({
      next: (data) => this.history.set(data),
      error: () => {}
    });
  }

  loadComments(ticketId: number) {
    this.commentService.getByTicket(ticketId).subscribe({
      next: (data) => this.comments.set(data),
      error: () => {}
    });
  }

  submitComment() {
    const content = this.commentContent().trim();
    if (!content) return;

    const ticketId = this.ticket()?.id;
    if (!ticketId) return;

    this.isSubmittingComment.set(true);
    this.commentService.create(ticketId, { content }).subscribe({
      next: (comment) => {
        console.log('Comentario recibido:', comment);
        this.comments.update(list => [...list, comment]);
        this.commentContent.set('');
        this.isSubmittingComment.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al enviar el comentario');
        this.isSubmittingComment.set(false);
      }
    });
  }

  deleteComment(commentId: number) {
    const ticketId = this.ticket()?.id;
    if (!ticketId) return;

    this.commentService.delete(ticketId, commentId).subscribe({
      next: () => this.comments.update(list => list.filter(c => c.id !== commentId)),
      error: () => this.errorMessage.set('Error al eliminar el comentario')
    });
  }

  changeStatus(newStatus: string) {
    const id = this.ticket()?.id;
    if (!id) return;

    this.isProcessing.set(true);
    this.ticketService.changeStatus(id, newStatus).subscribe({
      next: (data) => {
        this.ticket.set(data);
        this.loadHistory(id);
        this.isProcessing.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cambiar el estado');
        this.isProcessing.set(false);
      }
    });
  }

  assignToMe() {
    const id = this.ticket()?.id;
    if (!id) return;

    this.isProcessing.set(true);
    this.ticketService.assign(id).subscribe({
      next: (data) => {
        this.ticket.set(data);
        this.isProcessing.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al asignar el ticket');
        this.isProcessing.set(false);
      }
    });
  }

  cancelTicket() {
    const id = this.ticket()?.id;
    if (!id) return;

    this.isProcessing.set(true);
    this.ticketService.cancel(id).subscribe({
      next: (data) => {
        this.ticket.set(data);
        this.isProcessing.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cancelar el ticket');
        this.isProcessing.set(false);
      }
    });
  }

  goBack() {
    history.back();
  }

}
