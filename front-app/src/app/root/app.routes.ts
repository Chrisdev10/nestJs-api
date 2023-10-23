import { Routes } from '@angular/router';
import { DashboardGuard } from './dashboard/dashboard.guard';
import { AppNode } from './shared/routes/enum/node.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppNode.REDIRECT_TO_PUBLIC,
    pathMatch: 'full',
  },
  {
    path: AppNode.PUBLIC,
    loadChildren: () =>
      import('./security/security.routes').then(pages => pages.securityRoutes),
  },
  {
    path: AppNode.AUTHENTICATED,
    canActivate: [DashboardGuard()],
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then(r => r.DashboardRoutes),
  },
  {
    path: AppNode.FALL_BACK,
    loadChildren: () =>
      import(
        './shared/routes/global-fall-back-page/global-fall-back-page.component'
      ).then(pages => pages.GlobalFallBackPageComponent),
  },
];
