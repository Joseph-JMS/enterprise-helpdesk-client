import { Routes } from '@angular/router';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { MainLayout } from '../layouts/main-layout/main-layout';

export const dashboardRoutes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                title: 'Dashboard',
                component: UserDashboard
            },
            {
                path: 'tickets',
                loadChildren: () => import('../tickets/ticket.routes'),
            },
        ],
    }
]

export default dashboardRoutes;