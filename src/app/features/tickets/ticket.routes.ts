import { Routes } from '@angular/router';
import { TicketDetail } from './pages/ticket-detail/ticket-detail';
import { MyTickets } from './pages/my-tickets/my-tickets';
import { TicketCreate } from './pages/ticket-create/ticket-create';
import { UnassignedTickets } from './pages/unassigned-tickets/unassigned-tickets';
import { AssignedTickets } from './pages/assigned-tickets/assigned-tickets';

export const ticketRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'my-tickets',
                component: MyTickets,
            },
            {
                path: 'create',
                component: TicketCreate,
            },
            {
                path: 'unassigned',
                component: UnassignedTickets,
            },
            {
                path: 'assigned',
                component: AssignedTickets,
            },
            {
                path: ':id',
                component: TicketDetail,
            },
            // {
            //     path: ':id/history',
            //     component: TicketHistory,
            // },
            {
                path: '',
                redirectTo: 'my-tickets',
                pathMatch: 'full'
            }
            
        ],
    },
];

export default ticketRoutes;