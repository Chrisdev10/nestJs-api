import { ApiCodeResponse } from '@common/api/response';
import { ApiException } from '../api-exception';

export class AccountNotFoundException extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.ACCOUNT_NOT_FOUND,
      404,
      'Account not found in our database',
    );
  }
}
