import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: ()=>import('./features/auth/auth.routes'),
        canActivate: [loginGuard]
    },
    {
        path: '',
        loadComponent: ()=>import('./layouts/main-layout/main-layout'),
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./features/dashboard/dashboard.routes'),
            },
            {
                path: 'tickets',
                loadChildren: () => import('./features/tickets/ticket.routes'),
            },
            {
                path: 'admin',
                loadChildren: () => import('./features/admin/admin.routes'),
            },
            {
                path: 'reports',
                loadChildren: () => import('./features/reports/reports.routes'),
            },
            {
                path: 'profile',
                loadChildren: () => import('./features/profile/profile.routes')
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
