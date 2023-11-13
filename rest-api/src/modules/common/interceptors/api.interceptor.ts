import { ApiCodeResponse, ApiResponse } from '@common/api';
import { CallHandler, ExecutionContext, HttpStatus, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { instanceToPlain } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ApiInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(value =>
        // format success response
        Builder<ApiResponse>().httpCode(HttpStatus.OK).data(instanceToPlain(value)).code(ApiCodeResponse.SUCCESS).build(),
      ),
    );
  }
}
