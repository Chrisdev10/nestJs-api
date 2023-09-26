import { HttpStatus } from '@nestjs/common';
import { ApiCodeResponse } from './api-code.response';

export interface ApiResponse {
  data: any;
  code: ApiCodeResponse;
  httpCode: HttpStatus;
}
