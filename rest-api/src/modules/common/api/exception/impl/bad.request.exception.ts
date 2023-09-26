import { ApiCodeResponse } from '@common/api/response';
import { ApiException } from '../api-exception';

export class BadRequestException extends ApiException {
  constructor() {
    super(ApiCodeResponse.BAD_REQUEST, 403);
  }
}
