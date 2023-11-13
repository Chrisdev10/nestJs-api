import { Module } from '@nestjs/common';
import { TokenService } from './services/token.service';
import { ConfigModule } from '@nestjs/config';
import { TokenController } from '@Modules/token/controllers/token.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule],
  providers: [TokenService, JwtService],
  exports: [TokenService, JwtService],
  controllers: [TokenController],
})
export class TokenModule {}
