import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        GRPC_CONNECTION_URL: Joi.string().required(),
        GATEWAY_CONNECTION_URL: Joi.string().required(),
      }),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
