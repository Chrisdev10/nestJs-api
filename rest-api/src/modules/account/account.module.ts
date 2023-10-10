import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Role } from 'entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from './services/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Role])],
  controllers: [AccountController],
  providers: [AccountService, Repository<Account>, JwtService, RolesService],
  exports: [AccountService],
})
export class AccountModule {}
