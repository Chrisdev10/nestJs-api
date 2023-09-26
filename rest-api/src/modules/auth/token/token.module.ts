import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TokenController } from './token.controller';

@Module({
  imports: [ConfigModule],
  providers: [TokenService, JwtService],
  exports: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
