import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TokenService, payloadJWT } from '@Modules/token';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenControllerDecode, TokenControllerGet, TokenControllerRefresh, TokenResponse2XX, TokenResponse4XX } from '../documentation';
@ApiTags('Token')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  @ApiOperation(TokenControllerGet)
  @ApiResponse(TokenResponse2XX)
  @Post()
  getToken(@Body() credential: payloadJWT) {
    return this.tokenService.getToken(credential);
  }
  @ApiOperation(TokenControllerDecode)
  @ApiResponse(TokenResponse2XX)
  @Get(':token')
  decodeToken(@Param('token') token: string) {
    return this.tokenService.decodeJwt(token);
  }
  @ApiOperation(TokenControllerRefresh)
  @ApiResponse(TokenResponse2XX)
  @ApiResponse(TokenResponse4XX)
  @Post('refresh')
  refreshToken(@Query('token') token: string) {
    return this.tokenService.refreshToken(token);
  }
}
