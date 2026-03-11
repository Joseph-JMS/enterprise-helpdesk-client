import { Component, input, output } from '@angular/core';
import { TicketResponse } from '../../../../core/interfaces/ticket.interface';
import { StatusLabelPipe } from '../../../../core/pipes/status-label.pipe';
import { StatusClassPipe } from '../../../../core/pipes/status-class.pipe';
import { PriorityLabelPipe } from '../../../../core/pipes/priority-label.pipe';
import { PriorityClassPipe } from '../../../../core/pipes/priority-class.pipe';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../../../core/pipes/truncate.pipe';

@Component({
  selector: 'ticket-card',
  imports: [StatusLabelPipe, StatusClassPipe, PriorityLabelPipe, PriorityClassPipe, DatePipe, TruncatePipe],
  templateUrl: './ticket-card.html',
})
export class TicketCard {

  ticket = input.required<TicketResponse>();

  onView = output<number>();
  onCancel = output<number>();
  onAssign = output<number>();
  onChangeStatus = output<number>();
}
