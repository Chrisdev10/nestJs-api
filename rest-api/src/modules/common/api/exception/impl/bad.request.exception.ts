import { ApiCodeResponse } from '@common/api/response';
import { ApiException } from '@common/api/exception';

export class BadRequestException extends ApiException {
  constructor() {
    super(ApiCodeResponse.BAD_REQUEST, 403);
  }
}
