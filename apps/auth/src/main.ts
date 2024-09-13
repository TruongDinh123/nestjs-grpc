import { NestFactory, Reflector } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME, MyValidationPipe } from '@app/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { POST_PACKAGE_NAME } from '@app/common/types/post';
import { CATEGORY_PACKAGE_NAME } from '@app/common/types/category';
import { PRODUCT_PACKAGE_NAME } from '@app/common/types/product';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.useGlobalPipes(new MyValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      protoPath: [
        join(__dirname, '../auth.proto'),
        join(__dirname, '../post.proto'),
        join(__dirname, '../category.proto'),
        join(__dirname, '../product.proto'),
      ],
      url: process.env.GRPC_CONNECTION_URL,
      package: [
        AUTH_PACKAGE_NAME,
        POST_PACKAGE_NAME,
        CATEGORY_PACKAGE_NAME,
        PRODUCT_PACKAGE_NAME,
      ],
      loader: {
        includeDirs: [join(__dirname, '..', 'proto')],
      },
    },
  });
  await app.startAllMicroservices();
  console.log(
    `Auth service is running on port ${process.env.GRPC_CONNECTION_URL}`,
  );
}
bootstrap();
