import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { intersection, isEmpty, isNil, toUpper } from 'lodash';
import { payloadJWT } from 'modules/token/payload/payload.token';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
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
      const userRoles: payloadJWT = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const handlerRoles: string[] = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      );
      if (isEmpty(handlerRoles)) return true;
      if (isNil(userRoles.roles)) return false;
      return (
        intersection(handlerRoles, [toUpper(...userRoles.roles)]).length !== 0
      );
    })();
  }
}
