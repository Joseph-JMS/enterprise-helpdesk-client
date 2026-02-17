import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: ()=>import('./layouts/auth-layout/auth-layout'),
        loadChildren: ()=>import('./features/auth/auth.routes'),
    },
    {
        path: '',
        loadComponent: ()=>import('./layouts/main-layout/main-layout'),
        children: [
            {
                path: 'admin',
                loadChildren: () => import('./features/admin/admin.routes'),
            },
            {
                path: 'technician',
                loadChildren: () => import('./features/technician/technician.routes'),
            },
            {
                path: 'user',
                loadChildren: () => import('./features/admin/admin.routes'),
            },
            {
                path: 'tickets',
                loadChildren: () => import('./features/tickets/ticket.routes'),
            },
        ] 
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    }
];
