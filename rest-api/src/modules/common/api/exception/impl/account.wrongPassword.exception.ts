import { ApiCodeResponse } from '@common/api/response';
import { ApiException } from '../api-exception';

export class AccountWrongPassword extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.BAD_REQUEST,
      402,
      'Account not found in our database',
    );
  }
}
