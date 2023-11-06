import { ApiOperationOptions, ApiProperty, ApiResponseOptions } from '@nestjs/swagger';
export class AccountPayload {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
export const AccountControllerSignup: ApiOperationOptions = {
  summary: 'Signup',
  description: 'Allow user to create an account',
};
export const AccountControllerInfo: ApiOperationOptions = {
  summary: 'account info',
  description: 'return complete info of the specified account',
};
export const AccountResponse200: ApiResponseOptions = {
  status: '2XX',
  description: 'return token',
};
export const AccountSignupResponse403: ApiResponseOptions = {
  status: '4XX',
  description: 'Account Already Exist Exception',
};
export const AccountControllerSignIn: ApiOperationOptions = {
  summary: 'SignIn',
  description: 'Allow user to log in an account',
};
export const AccountSigninResponse400: ApiResponseOptions = {
  status: '4XX',
  description: 'Account not found or wrong password',
};
export const AccountDeleteResponse404: ApiResponseOptions = {
  status: '4XX',
  description: 'Account not found',
};
