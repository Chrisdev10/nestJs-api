import { HttpException, ValidationError } from '@nestjs/common';
import { ApiCodeResponse } from '@common/api/response';

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    super(
      {
        code: ApiCodeResponse.BAD_REQUEST,
        data: errors.map(e => Object.values(e.constraints)).flat(),
        result: false,
      },
      499,
    );
  }
}
