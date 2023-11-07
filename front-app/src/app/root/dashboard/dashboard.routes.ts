import { Routes } from '@angular/router';
export const DashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./router/dashboard-router/dashboard-router.component').then(
        c => c.DashboardRouterComponent
      ),
      // Settings children allow us to put another router-outlet anchor
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './home/page/dashboard-home-page/dashboard-home-page.component'
          ).then(c => c.DashboardHomePageComponent),
      },
      {
        path: 'member',
        loadChildren: () =>
          import('./feature/member/member.routes').then(r => r.memberRoutes),
      },
    ],
  },
];
