import { Controller, HttpStatus, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountDto } from '../dtos/account.dto';
import { Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountControllerSignup } from './account.swagger';
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @ApiOperation(AccountControllerSignup)
  @Post()
  async signup(@Body() accountPayload: AccountDto) {
    return this.accountService.signup(accountPayload)
      ? HttpStatus.CREATED
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
