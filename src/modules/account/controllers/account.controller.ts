import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountDto } from '../dtos/account.dto';
import { Body } from '@nestjs/common';
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Post()
  async signup(@Body() accountPayload: AccountDto) {
    return this.accountService.signup(accountPayload)
      ? HttpStatus.CREATED
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
