import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class SubscriptionPayload {
  @ApiProperty()
  username: string;
  @ApiProperty()
  @Matches(/^NORNAL|PREMIUM$/, { message: 'type must be Normal or Premium' })
  type: SubType;
  @ApiProperty()
  @Matches(/^SIMPLE|GLOBAL$/, { message: 'scope must be Simple or Global' })
  scope: SubScope;
}
export enum SubType {
  NORMAL = 'N',
  PREMIUM = 'P',
}
export enum SubScope {
  SIMPLE = 'S',
  GLOBAL = 'G',
}
