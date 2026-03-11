import { Routes } from '@angular/router';

export const ticketRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'my-tickets',
                pathMatch: 'full'
            },
            {
                path: 'my-tickets',
                loadComponent: () => import('./pages/my-tickets/my-tickets').then(m=>m.MyTickets),
            },
            {
                path: 'create',
                loadComponent: () => import('./pages/ticket-create/ticket-create').then(m=>m.TicketCreate),
            },
            {
                path: 'unassigned',
                loadComponent: () => import('./pages/unassigned-tickets/unassigned-tickets').then(m=>m.UnassignedTickets),
            },
            {
                path: 'assigned',
                loadComponent: () => import('./pages/assigned-tickets/assigned-tickets').then(m=>m.AssignedTickets),
            },
            {
                path: ':id',
                loadComponent: () => import('./pages/ticket-detail/ticket-detail').then(m=>m.TicketDetail),
            },
        ],
    },
];

export default ticketRoutes;