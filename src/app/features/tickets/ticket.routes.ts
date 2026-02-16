import { Routes } from '@angular/router';
import { TicketList } from './pages/ticket-list/ticket-list';
import { TicketCreate } from './pages/ticket-create/ticket-create';
import { TicketDetail } from './pages/ticket-detail/ticket-detail';

export const ticketRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: TicketList,
            },
            {
                path: 'nuevo',
                component: TicketCreate,
            },
            {
                path: ':id',
                component: TicketDetail,
            },
            
        ],
    },
];

export default ticketRoutes;