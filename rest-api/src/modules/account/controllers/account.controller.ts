import { Controller, Post, Get, Query, Param, Delete } from '@nestjs/common';
import { AccountControllerDelete, AccountDelete200, AccountService } from '@Modules/account';
import { Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInPayload, SignUpFullPayload, AccountControllerInfo, AccountControllerSignIn, AccountControllerSignup, AccountDeleteResponse404, AccountResponse200, AccountSigninResponse400, AccountSignupResponse403 } from '@Modules/account';
import { Auth } from '@common/decorators';
@ApiBearerAuth('access-token')
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @ApiOperation(AccountControllerSignup)
  @ApiResponse(AccountResponse200)
  @ApiResponse(AccountSignupResponse403)
  @Post()
  async signup(@Body() accountPayload: SignInPayload) {
    return this.accountService.signup(accountPayload);
  }
  @ApiOperation(AccountControllerSignup)
  @ApiResponse(AccountResponse200)
  @ApiResponse(AccountSignupResponse403)
  @Post('info')
  async signupWithInfo(@Body() accountPayload: SignUpFullPayload) {
    return this.accountService.signupWithInfo(accountPayload);
  }
  @ApiOperation(AccountControllerSignIn)
  @ApiResponse(AccountSigninResponse400)
  @ApiResponse(AccountResponse200)
  @Get()
  async signin(@Query('login') login: string, @Query('pwd') pwd: string) {
    return this.accountService.signin(login, pwd);
  }
  @ApiOperation(AccountControllerInfo)
  @Auth('USER')
  @ApiResponse(AccountSigninResponse400)
  @ApiResponse(AccountResponse200)
  @Get(':id')
  async getUserInfo(@Param('id') id: string) {
    return this.accountService.getUserInfo(id);
  }
  @ApiOperation(AccountControllerDelete)
  @ApiResponse(AccountDeleteResponse404)
  @ApiResponse(AccountDelete200)
  @Auth('ADMIN')
  @Delete(':username')
  async removeAccountByUsername(@Param('username') username: string) {
    return this.accountService.removeAccount(username);
  }
}
