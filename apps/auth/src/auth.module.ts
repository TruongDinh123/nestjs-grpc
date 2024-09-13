import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/post.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),

        GRPC_CONNECTION_URL: Joi.string().required(),

        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),

        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    UsersModule,
    PostsModule,
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
