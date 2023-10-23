import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
export class SignInPayload {
  @ApiProperty()
  @Length(4, 20)
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @Length(4, 20)
  @IsNotEmpty()
  password: string;
  @ApiProperty({ required: false })
  googleHash: string;
  @ApiProperty({ required: false })
  facebookHash: string;
  @ApiProperty({ required: false })
  socialLogin: boolean;
}
export class SignUpPayload {
  @ApiProperty()
  @Length(4, 20)
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @Length(4, 20)
  @IsNotEmpty()
  password: string;
}
export class SignUpFullPayload {
  @ApiProperty()
  @Length(4, 20)
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @Length(4, 20)
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  birthDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsOptional()
  phone: string;
}
