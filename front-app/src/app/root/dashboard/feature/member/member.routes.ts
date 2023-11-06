import { Routes } from '@angular/router';
import { DashboardGuard } from '../../dashboard.guard';

export const memberRoutes: Routes = [
  {
    path: 'detail/:id',
    loadComponent: () => import('./page/member-detail-page/member-detail-page.component').then(page => page.MemberDetailPageComponent),
    canActivate: [DashboardGuard()],
  },
];
