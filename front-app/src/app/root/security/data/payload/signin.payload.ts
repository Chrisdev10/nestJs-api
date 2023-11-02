import { Payload } from '@Shared/api';

export interface SignInPayload extends Payload {
  username: string;
  password: string;
}
