import { Routes } from "@angular/router";

export const ticketRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard-wrapper/dashboard-wrapper').then(m=>m.DashboardWrapper),
    }
];

export default ticketRoutes;