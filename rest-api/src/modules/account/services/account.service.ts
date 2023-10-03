import { Injectable, Logger } from '@nestjs/common';
import { Account } from 'entities';
import { Repository } from 'typeorm';
import { Builder } from 'builder-pattern';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from 'modules/auth/token/token.service';
import { SignInPayload } from '../payload';
import { AccountAlreadyExistException } from '@common/api/exception/impl/account.exist.exception';
import { AccountNotFoundException } from '@common/api/exception/impl/account.notFound.exception';
import { AccountWrongPassword } from '@common/api/exception/impl/account.wrongPassword.exception';
const bcrypt = require('bcrypt');
@Injectable()
export class AccountService {
  private readonly myLogger = new Logger(AccountService.name);
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private readonly tokenService: TokenService,
  ) {}
  /**
   *
   * @param accountPayload
   * @returns
   */
  async signup(accountPayload: SignInPayload): Promise<String> {
    const resp: Account = await this.accountRepo.findOneBy({
      username: accountPayload.username,
    });
    if (resp) throw new AccountAlreadyExistException();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(accountPayload.password, salt);
    const obj = this.accountRepo.create(
      Builder<Account>()
        .username(accountPayload.username)
        .password(hash)
        .audit({
          createdBy: accountPayload.username,
          createdOn: new Date(),
        })
        .build(),
    );
    await this.accountRepo.save(obj);
    return await this.signin(accountPayload.username, accountPayload.password);
  }
  async signin(login: string, password: string) {
    const acc = await this.accountRepo.findOneBy({ username: login });
    if (!acc) {
      throw new AccountNotFoundException();
    }
    if (bcrypt.compareSync(password, acc.password))
      return this.tokenService.getToken({ login, password });
    else throw new AccountWrongPassword();
  }
  async removeAccount(username: string) {
    const exist: number = (
      await this.accountRepo.findAndCountBy({ username: username })
    ).length;
    if (!exist) throw new AccountNotFoundException();
    return (
      (await this.accountRepo.delete({ username: username })).affected !== 0
    );
  }
}
