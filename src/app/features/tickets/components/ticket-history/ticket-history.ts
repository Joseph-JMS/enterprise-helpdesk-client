import { Component, input } from '@angular/core';
import { TicketStatusHistoryResponse } from '../../../../core/interfaces/ticket.interface';
import { StatusLabelPipe } from '../../../../core/pipes/status-label.pipe';
import { StatusClassPipe } from '../../../../core/pipes/status-class.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ticket-history',
  imports: [StatusLabelPipe, StatusClassPipe, DatePipe],

  templateUrl: './ticket-history.html',
})
export class TicketHistory {

  history = input.required<TicketStatusHistoryResponse[]>();

}
