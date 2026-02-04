import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: ()=>import('./auth/auth.routes'),
    },
    {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.routes'), 
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    }
];
