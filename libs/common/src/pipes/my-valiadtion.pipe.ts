import { HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { GrpcException } from '../exceptions/rpc-exception';

export class MyValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[]) => {
        return new GrpcException({
          status: HttpStatus.BAD_REQUEST,
          message: validationErrors
            .map((error) => {
              return `${error.property}: ${error.value}`;
            })
            .join(', '),
          error: 'Bad Request',
        });
      },
    });
  }
}

/*
    - transform: Thiết lập này cho phép tự động chuyển đổi dữ liệu đầu vào thành 
    kiểu dữ liệu mong muốn của DTO.
    - exceptionFactory: Thiết lập này cho phép tùy chỉnh hành vi của ValidationPipe khi xảy ra lỗi
    xác thực.
*/
