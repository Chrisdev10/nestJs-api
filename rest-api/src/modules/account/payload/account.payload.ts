import { ApiProperty } from '@nestjs/swagger';
export class SignInPayload {
  @ApiProperty()
  username: string;
  @ApiProperty() password: string;
  @ApiProperty({ required: false }) googleHash: string;
  @ApiProperty({ required: false }) facebookHash: string;
  @ApiProperty({ required: false })
  socialLogin: boolean;
}
export class SignUpPayload {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
