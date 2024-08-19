import { Metadata } from '@grpc/grpc-js/build/src/metadata';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { config } from 'dotenv';
import { ExtractJwtService } from './extract-jwt.service';

config();

export const CookieMetadata = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const metadata = new Metadata();
    const cookieName = data;

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
