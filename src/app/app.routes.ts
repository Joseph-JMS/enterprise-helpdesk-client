import { Routes } from '@angular/router';
import { AuthLayout } from './auth/layout/auth-layout/auth-layout';

export const routes: Routes = [
    {
        path: '',
        loadChildren: ()=>import('./auth/auth.routes'),
    },
    {
        path: '**',
        redirectTo: ''
    }
];
