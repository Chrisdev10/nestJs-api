import { Controller, Post, Get, Query } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AccountControllerSignIn,
  AccountControllerSignup,
} from './account.swagger';
import { SignInPayload } from '../payload';
@ApiBearerAuth('access-token')
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @ApiOperation(AccountControllerSignup)
  @Post()
  async signup(@Body() accountPayload: SignInPayload) {
    return this.accountService.signup(accountPayload);
  }
  @ApiOperation(AccountControllerSignIn)
  @Get()
  async signin(@Query('login') login: string, @Query('pwd') pwd: string) {
    return this.accountService.signin(login, pwd);
  }
}