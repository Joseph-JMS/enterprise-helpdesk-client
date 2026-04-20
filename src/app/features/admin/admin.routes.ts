import { Routes } from "@angular/router";
import { CategoryManagement } from "./pages/category-management/category-management";
import { CategoryForm } from "./pages/category-form/category-form";
import { UserManagement } from "./pages/user-management/user-management";
import { UserForm } from "./pages/user-form/user-form";

export const adminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'categories',
                children: [
                    {
                        path: '',
                        component: CategoryManagement,
                    },
                    {
                        path: 'new',
                        component: CategoryForm,
                    },
                    {
                        path: 'edit/:id',
                        component: CategoryForm,
                    },
                ],
            },
            {
                path: 'users',
                children: [
                    {
                        path: '',
                        component: UserManagement,
                    },
                    {
                        path: 'new',
                        component: UserForm,
                    },
                    // {
                    //     path: 'edit/:id',
                    //     component: UserForm,
                    // }
                ],
            },
            {
                path: '',
                redirectTo: 'categories',
                pathMatch: 'full',
            }
        ]
    }
];

export default adminRoutes;