import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        GRPC_CONNECTION_URL: Joi.string().required(),
      }),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
