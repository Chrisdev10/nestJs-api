import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { payloadJWT } from '../../account/payload/payload.token';
@Injectable()
export class TokenService {
  private readonly mylogger = new Logger(TokenService.name);
  constructor(private jwtService: JwtService) {}
  async getToken(credential: payloadJWT): Promise<string> {
    return await this.jwtService.signAsync(credential, {
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
