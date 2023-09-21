import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'entities';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService, Repository<Account>],
})
export class AccountModule {}