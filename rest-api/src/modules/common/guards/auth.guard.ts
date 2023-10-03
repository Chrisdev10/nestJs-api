import { TokenInvalidException } from '@common/api/exception/impl/token.invalid.exception';
import { TokenMissingException } from '@common/api/exception/impl/token.missing.exception';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isNil } from 'lodash';
import { TokenService } from 'modules/auth/token/token.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (isNil(req.headers['authorization'])) throw new TokenMissingException();
    const token: string = req.headers['authorization']
      ?.replace('Bearer', '')
      .trim();
    try {
      this.tokenService.verifyToken(token);
    } catch (err) {
      throw new TokenInvalidException();
    }
    return true;
  }
}
