import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { payloadJWT } from '@Modules/token/payload';
import { TokenInvalidException } from '@common/api';

@Injectable()
export class TokenService {
  private readonly mylogger = new Logger(TokenService.name);
  constructor(private jwtService: JwtService) {}
  async getToken(credential: payloadJWT): Promise<Object> {
    const token = await this.jwtService.signAsync(credential, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES,
    });
    const refreshToken = await this.jwtService.signAsync(credential, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN,
    });
    return { token: token, refreshToken: refreshToken };
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
  // return a brand new token
  async refreshToken(token: string) {
    try {
      const info: payloadJWT = (await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      })) as payloadJWT;
      return await this.getToken({ login: info.login, password: info.password, roles: info.roles });
    } catch (err) {
      throw new TokenInvalidException();
    }
  }
}
