import { Routes } from "@angular/router";

export const technicianRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/tech-dashboard/tech-dashboard').then(m=>m.TechDashboard),
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            }
        ],

    }
];

export default technicianRoutes;