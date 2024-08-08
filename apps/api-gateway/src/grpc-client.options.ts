import { AUTH_PACKAGE_NAME } from '@app/common';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: AUTH_PACKAGE_NAME,
    protoPath: join(__dirname, '../auth.proto'),
  },
};
