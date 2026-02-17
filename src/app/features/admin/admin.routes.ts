import { Routes } from "@angular/router";
import { Users } from "./pages/users/users";
import { Technicians } from "./pages/technicians/technicians";
import { AdminDashboard } from "./pages/admin-dashboard/admin-dashboard";


export const adminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: AdminDashboard,
            },
            {
                path: 'users',
                component: Users,
            },
            {
                path: 'technicians',
                component: Technicians,
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            },
        ]
    }
];

export default adminRoutes;