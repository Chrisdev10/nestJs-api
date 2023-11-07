import { Injectable, Logger } from '@nestjs/common';
import { Person } from 'entities';
import { Account } from '@common/models';
import { Repository } from 'typeorm';
import { Builder } from 'builder-pattern';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInPayload, SignUpFullPayload } from '../models/payload';
import { AccountAlreadyExistException } from '@common/api/exception/impl/account.exist.exception';
import { AccountNotFoundException } from '@common/api/exception/impl/account.notFound.exception';
import { AccountWrongPassword } from '@common/api/exception/impl/account.wrongPassword.exception';
import { payloadJWT } from '../../token/payload/payload.token';
import { RolesService } from './roles.service';
import { pwdChecker, pwdHashing } from '@common/utils';
import { Audit } from '@common/models/entity/audit';
import { TokenService } from 'modules/token/services/token.service';
@Injectable()
export class AccountService {
  private readonly myLogger = new Logger(AccountService.name);
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private readonly tokenService: TokenService,
    private readonly roleService: RolesService,
  ) {}
  async signupWithInfo(accountFullPayload: SignUpFullPayload): Promise<any> {
    const resp: Account = await this.accountRepo.findOneBy({
      username: accountFullPayload.username,
    });
    const obj = this.accountRepo.create(
      Builder<Account>()
        .id(resp ? resp.id : null)
        .username(accountFullPayload.username)
        .password(await pwdHashing(accountFullPayload.password))
        .person(
          Builder<Person>()
            .lastname(accountFullPayload.lastName)
            .firstname(accountFullPayload.firstName)
            .birthdate(accountFullPayload.birthDate)
            .email(accountFullPayload.email)
            .phone(accountFullPayload.phone)
            .audit(Builder<Audit>().createdBy(accountFullPayload.username).build())
            .build(),
        )
        .role(await this.roleService.getRoleByName('USER'))
        .audit(Builder<Audit>().createdBy(accountFullPayload.username).build())
        .build(),
    );
    await this.accountRepo.save(obj);
    return await this.signin(accountFullPayload.username, accountFullPayload.password);
  }
  async signup(accountPayload: SignInPayload): Promise<any> {
    const resp: Account = await this.accountRepo.findOneBy({
      username: accountPayload.username,
    });
    if (resp) throw new AccountAlreadyExistException();
    const obj = this.accountRepo.create(
      Builder<Account>()
        .username(accountPayload.username)
        .password(await pwdHashing(accountPayload.password))
        .role(await this.roleService.getRoleByName('USER'))
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
    const acc: Account = await this.accountRepo.findOneBy({ username: login });
    if (!acc) {
      throw new AccountNotFoundException();
    }
    if (await pwdChecker(password, acc.password)) {
      const payload: payloadJWT = {
        login: acc.username,
        password: acc.password,
        roles: acc.role?.map(x => x.name),
      };
      return { id: acc.id, auth: await this.tokenService.getToken(payload) };
    } else throw new AccountWrongPassword();
  }
  async getUserInfo(id: string) {
    const acc: Account = await this.accountRepo.findOneBy({ id: id });
    if (!acc) {
      throw new AccountNotFoundException();
    }
    return acc;
  }
  async getAccountByLogin(username: string): Promise<Account> {
    return await this.accountRepo.findOneBy({ username: username });
  }
  async removeAccount(username: string) {
    const exist: number = (await this.accountRepo.findAndCountBy({ username: username })).length;
    if (!exist) throw new AccountNotFoundException();
    return (await this.accountRepo.delete({ username: username })).affected !== 0;
  }
}
