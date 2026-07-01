import { Routes } from "@angular/router";

export const profileRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/profile-view/profile-view').then(m=>m.ProfileView),
    },
    {
        path: 'edit',
        loadComponent: () => import('./pages/edit-profile/edit-profile').then(m=>m.EditProfile),
    },
    {
        path: 'change-password',
        loadComponent: () => import('./pages/change-password/change-password').then(m=>m.ChangePassword),
    },
];

export default profileRoutes;