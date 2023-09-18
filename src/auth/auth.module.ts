import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [AuthService, TokenService, JwtService],
  controllers: [AuthController],
  imports: [TokenModule],
})
export class AuthModule {}
