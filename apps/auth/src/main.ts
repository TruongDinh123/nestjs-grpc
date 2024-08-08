import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME, MyValidationPipe } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new MyValidationPipe());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../auth.proto'),
      url: configService.get('GRPC_CONNECTION_URL'),
      package: [AUTH_PACKAGE_NAME],
    },
  });
  await app.startAllMicroservices();
  console.log(`Auth service is running on port ${configService.get('PORT')}`);
}
bootstrap();
