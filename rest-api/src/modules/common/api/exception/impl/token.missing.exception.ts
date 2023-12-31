import { ApiCodeResponse } from '@common/api/response';
import { ApiException } from '@common/api/exception';

export class TokenMissingException extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.TOKEN_NOT_FOUND,
      404,
      'Authorization is required for the requested info',
    );
  }
}
