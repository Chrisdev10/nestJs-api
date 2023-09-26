import { ApiCodeResponse } from '@common/api/response';
import { ApiException } from '../api-exception';

export class InternalErrorException extends ApiException {
  constructor() {
    super(ApiCodeResponse.INTERNAL_ERROR, 500);
  }
}
