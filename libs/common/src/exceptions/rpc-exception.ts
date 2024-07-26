import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class GrpcException extends RpcException {
  constructor({
    status,
    message,
    error,
  }: {
    status: HttpStatus;
    message: string | object;
    error?: any;
  }) {
    super(JSON.stringify({ status, message, error }));
  }
}

/*
    - status: Mã trạng thái HTTP.
    - message: Thông điệp lỗi.
    - error: Lỗi gốc (nếu có).
    
    - super(JSON.stringify({ status, message, error }));: Gọi hàm constructor của lớp cha RpcException với
     đối số là chuỗi JSON chứa thông tin lỗi.
     - JSON.stringify({ status, message, error }): Chuyển đổi đối tượng thành chuỗi JSON.
     
*/
