import { ApiCodeResponse } from '@common/api/response';
import { ApiException } from '@common/api/exception';

export class InternalErrorException extends ApiException {
  constructor() {
    super(ApiCodeResponse.INTERNAL_ERROR, 500);
  }
}
