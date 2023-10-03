import { ApiCodeResponse } from '@common/api/response';
import { ApiException } from '../api-exception';

export class TokenInvalidException extends ApiException {
  constructor() {
    super(ApiCodeResponse.TOKEN_INVALID, 402, 'Given token is not valid');
  }
}
