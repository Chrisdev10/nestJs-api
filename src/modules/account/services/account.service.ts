import { Injectable } from '@nestjs/common';
import { Account } from 'entities';
import { Repository } from 'typeorm';
import { AccountDto } from '../dtos/account.dto';
import { Builder } from 'builder-pattern';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}
  async signup(accountPayload: AccountDto): Promise<Account> {
    let acc: Account = Builder<Account>()
      .username(accountPayload.username)
      .password(accountPayload.password)
      .build();
    return await this.accountRepo.save(acc);
  }
}
