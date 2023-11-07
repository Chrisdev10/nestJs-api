import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../shared/api/services';

export function DashboardGuard(redirectRoute: string = ''): CanActivateFn {
  return () => {
    const tokenService = inject(TokenService);
    const canAccess: boolean = !tokenService.token$().isEmpty; // not empty ensure that the user is connected
    const routerr: Router = inject(Router); 
    return canAccess || routerr.createUrlTree([redirectRoute]);
  };
}
