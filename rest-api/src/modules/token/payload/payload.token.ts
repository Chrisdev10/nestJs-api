import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class payloadJWT {
  @IsNotEmpty()
  @Length(5, 25)
  @ApiProperty()
  login: string;
  @IsNotEmpty()
  @Length(5, 25)
  @ApiProperty()
  password: string;
  @ApiProperty()
  roles?: string[];
}
export class payloadForJwt {
  @IsNotEmpty()
  @Length(5, 25)
  @ApiProperty()
  login: string;
  @IsNotEmpty()
  @Length(5, 25)
  @ApiProperty()
  password: string;
}
