import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  helloWorld() {
    return 'hello from nest';
  }
}
