import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionPayload {
  @ApiProperty() username: string;
  @ApiProperty() type: SubType;
  @ApiProperty() scope: SubScope;
}
export type SubType = 'NORMAL' | 'PREMIUM';
export type SubScope = 'SINGLE' | 'GLOBAL';
