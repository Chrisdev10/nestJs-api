import { Body, Controller, Get } from '@nestjs/common';
import { TokenService } from '../token/token.service';
@Controller('auth')
export class AuthController {
  constructor(private tokenService: TokenService) {}
  @Get('login')
  login(@Body() credential: UserCredential): Promise<string> {
    console.log(process.env.JWT_SECRET);

    return this.tokenService.getToken(credential);
  }
}
