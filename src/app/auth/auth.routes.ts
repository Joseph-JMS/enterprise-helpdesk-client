import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { Login } from './pages/login/login';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                component: Login
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    }
]

export default authRoutes;