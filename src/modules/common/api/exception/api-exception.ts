import { HttpException } from '@nestjs/common';
import { ApiCodeResponse } from '../response/api-code.response';

export class ApiException extends HttpException {
  constructor(apiRespCode: ApiCodeResponse, status: number) {
    super(
      {
        code: apiRespCode,
        data: null,
      },
      status,
    );
  }
}
