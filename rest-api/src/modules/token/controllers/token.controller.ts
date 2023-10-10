import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { payloadForJwt, payloadJWT } from '../payload/payload.token';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  @Post()
  getToken(@Body() credential: payloadForJwt) {
    return this.tokenService.getToken(credential);
  }
  @Get(':token')
  decodeToken(@Param('token') token: string) {
    return this.tokenService.decodeJwt(token);
  }
}
