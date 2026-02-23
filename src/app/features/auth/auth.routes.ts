import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const authRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../../layouts/auth-layout/auth-layout'),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login').then(m=>m.Login)
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register').then(m=>m.Register)
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
]

export default authRoutes;