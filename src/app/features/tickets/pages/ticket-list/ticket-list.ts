import { Component } from '@angular/core';
import { TicketCard } from "../../components/ticket-card/ticket-card";

@Component({
  selector: 'ticket-list',
  imports: [TicketCard],
  templateUrl: './ticket-list.html',
})
export class TicketList { }
