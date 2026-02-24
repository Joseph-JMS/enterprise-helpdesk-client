import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/dashboard-wrapper/dashboard-wrapper').then(m=>m.DashboardWrapper),
    }
];

export default dashboardRoutes;