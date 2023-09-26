import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Account } from 'entities';
import { Repository } from 'typeorm';
import { Builder } from 'builder-pattern';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from 'modules/auth/token/token.service';
import { SignInPayload } from '../payload';
import { DateUtils } from '@common/utils/date.utils';
import { AccountAlreadyExistException } from '@common/api/exception/impl/account.exist.exception';
const bcrypt = require('bcrypt');
@Injectable()
export class AccountService {
  private readonly myLogger = new Logger(AccountService.name);
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private readonly tokenService: TokenService,
  ) {}
  async signup(accountPayload: SignInPayload): Promise<String> {
    const resp: Account = await this.accountRepo.findOneBy({
      username: accountPayload.username,
    });
    if (resp) throw new AccountAlreadyExistException();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(accountPayload.password, salt);
    await this.accountRepo.save(
      Builder<Account>()
        .username(accountPayload.username)
        .password(hash)
        .audit({
          createdBy: accountPayload.username,
          createdOn: DateUtils.createDateAsUTC(new Date()),
        })
        .build(),
    );
    return await this.signin(accountPayload.username, accountPayload.password);
  }
  async signin(login: string, password: string) {
    if (!login || !password) throw new BadRequestException();
    const acc = await this.accountRepo.findOneBy({ username: login });
    if (!acc) {
      this.myLogger.error('Account already exist');
      throw new BadRequestException();
    }
    if (bcrypt.compareSync(password, acc.password))
      return this.tokenService.getToken({ login, password });
    else throw new BadRequestException();
  }
}
