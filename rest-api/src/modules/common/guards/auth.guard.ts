import { TokenInvalidException, TokenMissingException } from '@common/api/exception/impl';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isNil } from 'lodash';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (isNil(req.headers['authorization'])) throw new TokenMissingException();
    const token: string = req.headers['authorization']?.replace('Bearer', '').trim();
    try {
      this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (err) {
      throw new TokenInvalidException();
    }
    return true;
  }
}
