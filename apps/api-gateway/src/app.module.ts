import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({}),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
