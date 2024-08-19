import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { POST_PACKAGE_NAME, POST_SERVICE_NAME } from '@app/common/types/post';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: POST_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: POST_PACKAGE_NAME,
            protoPath: join(__dirname, '../post.proto'),
            url: configService.get('GRPC_CONNECTION_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
