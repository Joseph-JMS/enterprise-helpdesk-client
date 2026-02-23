import { Component } from '@angular/core';
import { TicketCard } from "../../components/ticket-card/ticket-card";

@Component({
  selector: 'app-my-tickets',
  imports: [TicketCard],
  templateUrl: './my-tickets.html',
})
export class MyTickets { }
