import { ApiCodeResponse } from '@common/api/response';
import { ApiException } from '@common/api/exception';

export class AccountWrongPassword extends ApiException {
  constructor() {
    super(ApiCodeResponse.ACCOUNT_WRONG_PWD, 402, 'Wrong password');
  }
}
