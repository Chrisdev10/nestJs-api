import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { payloadForJwt, payloadJWT } from '../payload/payload.token';
import { AccountService } from 'modules/account';
import { AccountNotFoundException, AccountWrongPassword } from '@common/api';
import { Account } from 'entities';
import { pwdChecker } from '@common/utils';
const bcrypt = require('bcrypt');
@Injectable()
export class TokenService {
  private readonly mylogger = new Logger(TokenService.name);
  constructor(
    private jwtService: JwtService,
    private accService: AccountService,
  ) {}
  async getToken(credential: payloadForJwt): Promise<string> {
    const acc: Account = await this.accService.getAccountByLogin(
      credential.login,
    );
    if (!acc) throw new AccountNotFoundException();
    if (!(await pwdChecker(credential.password, acc.password)))
      throw new AccountWrongPassword();
    const cred: payloadJWT = {
      login: credential.login,
      password: credential.password,
      roles: acc.role?.map(x => x.name),
    };
    return await this.jwtService.signAsync(cred, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES,
    });
  }
  async decodeJwt(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
  async verifyToken(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
