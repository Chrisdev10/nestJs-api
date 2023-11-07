import { Routes } from '@angular/router';
import { AppNode } from '../shared/routes/enum/node.enum';
//using lazy loading in child routes make app more optimized. Instead of fetching all import, it will fetch
//the requested ones.
export const securityRoutes: Routes = [
  {
    path: '',
    redirectTo: AppNode.SIGN_IN,
    pathMatch: 'full',
    // Angular will split the route path into multiple segment. Each of them will be checked if it s set to full.
    // if not, it will give the first route who match with even the first segment routes
  },
  {
    path: AppNode.SIGN_IN,
    loadComponent: () =>
      import('./page/sign-in-page/sign-in-page.component').then(
        c => c.SignInPageComponent
      ),
  },
  {
    // always put fallback at the end. Routes are evaluated in an ordered way from top to bottom
    path: AppNode.FALL_BACK,
    loadChildren: () =>
      import(
        '../shared/routes/global-fall-back-page/global-fall-back-page.component'
      ).then(pages => pages.GlobalFallBackPageComponent),
  },
];
