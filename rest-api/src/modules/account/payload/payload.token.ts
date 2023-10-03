import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class payloadJWT {
  @IsNotEmpty()
  @ApiProperty()
  login: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @ApiProperty()
  roles?: string[];
}
