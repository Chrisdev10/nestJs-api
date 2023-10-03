import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { intersection, isNil, toUpper } from 'lodash';
import { payloadJWT } from 'modules/account/payload/payload.token';
import { TokenService } from 'modules/auth/token/token.service';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token: string = context
      .switchToHttp()
      .getRequest()
      .headers['authorization']?.replace('Bearer', '')
      .trim();
    if (isNil(token)) return false;
    return (async () => {
      const userRoles: payloadJWT = await this.tokenService.decodeJwt(token);
      const handlerRoles: string[] = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      );
      if (!handlerRoles) return true;
      if (!userRoles.roles) return false;
      return (
        intersection(handlerRoles, [toUpper(...userRoles.roles)]).length !== 0
      );
    })();
  }
}
