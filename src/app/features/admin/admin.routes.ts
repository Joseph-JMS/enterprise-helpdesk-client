import { Routes } from "@angular/router";
import { Users } from "./pages/users/users";
import { Technicians } from "./pages/technicians/technicians";

export const adminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'users',
                component: Users,
            },
            {
                path: 'technicians',
                component: Technicians,
            },
            {
                path: '',
                redirectTo: 'users'
            },
        ]
    }
];

export default adminRoutes;