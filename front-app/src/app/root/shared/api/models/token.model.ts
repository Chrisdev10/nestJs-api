import { IsEmpty } from './business.model';

export interface Token extends IsEmpty {
  token: string;
  refreshToken: string;
}
