import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Role } from 'entities';
import { Repository } from 'typeorm';
import { RolesService } from './services/roles.service';
import { TokenModule } from 'modules/token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Role]), TokenModule],
  controllers: [AccountController],
  providers: [AccountService, Repository<Account>, RolesService],
  exports: [AccountService],
})
export class AccountModule {}
