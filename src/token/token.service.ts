import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}
  async getToken(credential: UserCredential): Promise<string> {
    return await this.jwtService.sign(credential, {
      secret: process.env.JWT_SECRET,
    });
  }
  decodeJwt(token: string) {
    return this.jwtService.decode(token, { json: true });
  }
}
