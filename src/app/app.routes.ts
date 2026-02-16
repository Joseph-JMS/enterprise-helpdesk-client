import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: ()=>import('./features/auth/auth.routes'),
    },
    {
        path: '',
        loadChildren: () => import('./features/dashboard/dashboard.routes'), 
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    }
];
