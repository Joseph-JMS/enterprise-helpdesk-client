import { Routes } from '@angular/router';

export const reportsRoutes: Routes = [
    {   
        path: '',
        children: [
            {
                path: 'summary',
                loadComponent: () => import('./pages/summary-report/summary-report').then(m=>m.SummaryReport),
            },
            {
                path: 'performance',
                loadComponent: () => import('./pages/performance-report/performance-report').then(m=>m.PerformanceReport),
            },
            {
                path: 'sla',
                loadComponent: () => import('./pages/sla-report/sla-report').then(m=>m.SlaReport),
            },
            {
                path: 'categories',
                loadComponent: () => import('./pages/category-report/category-report').then(m=>m.CategoryReport),
            },
            {
                path: '',
                redirectTo: 'performance',
                pathMatch: 'full',
            }
        ]
    }
];

export default reportsRoutes;