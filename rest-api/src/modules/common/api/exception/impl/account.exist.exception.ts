import { ApiCodeResponse } from '@common/api/response';
import { ApiException } from '@common/api/exception';

export class AccountAlreadyExistException extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.BAD_REQUEST,
      403,
      'Account already exist in our database',
    );
  }
}
