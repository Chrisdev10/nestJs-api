import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { payloadJWT } from '../payload/payload.token';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  @Post()
  getToken(@Body() credential: payloadJWT) {
    return this.tokenService.getToken(credential);
  }
  @Get(':token')
  decodeToken(@Param('token') token: string) {
    return this.tokenService.decodeJwt(token);
  }
  @Post('refresh')
  refreshToken(@Query('token') token: string) {
    return this.tokenService.refreshToken(token);
  }
}
