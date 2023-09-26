import { ApiOperationOptions, ApiProperty } from '@nestjs/swagger';
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
export const AccountControllerSignIn: ApiOperationOptions = {
  summary: 'SignIn',
  description: 'Allow user to log in an account',
};
