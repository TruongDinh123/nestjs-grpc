import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';

export function GRPCFactory(configService: ConfigService, url: string): any {
  return ClientProxyFactory.create({
    transport: Transport.GRPC,
    options: {
      ...grpcClientOptions.options,
      url: url || configService.get('GRPC_CONNECTION_URL'),
    },
  });
}
