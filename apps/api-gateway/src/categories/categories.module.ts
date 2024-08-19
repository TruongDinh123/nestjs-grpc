import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  CATEGORY_PACKAGE_NAME,
  CATEGORY_SERVICE_NAME,
} from '@app/common/types/category';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: CATEGORY_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: CATEGORY_PACKAGE_NAME,
            protoPath: join(__dirname, '../category.proto'),
            url: configService.get('GRPC_CONNECTION_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
