import { HttpException } from '@nestjs/common';
import { ApiCodeResponse } from '@common/api/response';

export abstract class ApiException extends HttpException {
  constructor(apiRespCode: ApiCodeResponse, status: number, msg?: string) {
    super(
      {
        code: apiRespCode,
        data: null,
        message: msg,
      },
      status,
    );
  }
}
