import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isEmpty, isNil } from 'lodash';
import { TokenService } from '../shared/api/services';

export function DashboardGuard(redirectRoute: string = ''): CanActivateFn {
  return () => {
    const tokenService = inject(TokenService);
    const canAccess: boolean = !tokenService.token$().isEmpty;
    const routerr: Router = inject(Router); // Nous faisons une DI pour récupérer le système de Router
    return canAccess || routerr.createUrlTree([redirectRoute]);
  };
}
