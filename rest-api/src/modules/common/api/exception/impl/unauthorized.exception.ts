import { ApiCodeResponse } from '@common/api/response';
import { ApiException } from '@common/api/exception';

export class UnauthorizedExcepction extends ApiException {
  constructor() {
    super(ApiCodeResponse.UNAUTHORIZED, 403);
  }
}
