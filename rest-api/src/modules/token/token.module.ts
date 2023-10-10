import { Module } from '@nestjs/common';
import { TokenService } from './services/token.service';
import { ConfigModule } from '@nestjs/config';
import { TokenController } from './controllers/token.controller';
import { AccountModule } from 'modules/account/account.module';
import { Account } from 'entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), ConfigModule, AccountModule],
  providers: [TokenService, JwtService],
  exports: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
