import { Routes } from "@angular/router";

export const userRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/user-dashboard/user-dashboard').then(m=>m.UserDashboard),
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            }
        ],

    }
];

export default userRoutes;