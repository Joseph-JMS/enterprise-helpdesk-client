import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: ()=>import('./features/auth/auth.routes'),
    },
    {
        path: '',
        loadComponent: ()=>import('./layouts/main-layout/main-layout'),
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard-wrapper/dashboard-wrapper').then(m=>m.DashboardWrapper),
            },
            {
                path: 'tickets',
                loadChildren: () => import('./features/tickets/ticket.routes'),
            },
            {
                path: 'users',
                loadChildren: () => import('./features/admin/admin.routes'),
            },
            {
                path: 'technicians',
                loadChildren: () => import('./features/tickets/ticket.routes'),
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ] 
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    }
];
