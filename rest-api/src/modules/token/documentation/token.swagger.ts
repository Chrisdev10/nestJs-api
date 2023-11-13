import { ApiOperationOptions, ApiProperty, ApiResponseOptions } from '@nestjs/swagger';
export class AccountPayload {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
export const TokenControllerGet: ApiOperationOptions = {
  summary: 'token generator',
  description: 'return token with the given information',
};
export const TokenControllerDecode: ApiOperationOptions = {
  summary: 'get info token',
  description: 'return token payload within given token',
};
export const TokenControllerRefresh: ApiOperationOptions = {
  summary: 'refresh token',
  description: 'return new token based on refresh token',
};
export const TokenResponse2XX: ApiResponseOptions = {
  status: '2XX',
  description: 'return token',
};
export const TokenResponse4XX: ApiResponseOptions = {
  status: '4XX',
  description: 'invalid refresh token',
};
