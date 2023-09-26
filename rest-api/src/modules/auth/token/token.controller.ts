import { Body, Controller, Get, Param } from '@nestjs/common';
import { TokenService } from './token.service';
import { payloadJWT } from '../../account/payload/payload.token';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  @Get()
  getToken(@Body() credential: payloadJWT) {
    console.log(credential);

    return this.tokenService.getToken(credential);
  }
  @Get(':token')
  decodeToken(@Param() { token }: any) {
    return this.tokenService.decodeJwt(token);
  }
}
