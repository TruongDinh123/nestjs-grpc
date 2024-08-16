import { Metadata } from '@grpc/grpc-js/build/src/metadata';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { config } from 'dotenv';
import { ExtractJwtService } from './extract-jwt.service';

config();
const configService = new ConfigService();

export const CookieMetadata = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const metadata = new Metadata();
    const cookieName = 'Refresh';

    if (!cookieName) {
      throw new Error(
        `Cookie name for '${data}' is not defined in configuration.`,
      );
    }

    const extractJwtService = new ExtractJwtService();

    metadata.add(
      cookieName,
      extractJwtService.fromRequest(
        context.switchToHttp().getRequest(),
        cookieName,
      ),
    );
    return metadata;
  },
);
