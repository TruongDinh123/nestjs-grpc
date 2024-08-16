import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ExtractJwtService {
  public fromRequest(request: Request, cookieName: string): string {
    if (
      request.headers.authorization &&
      typeof request.headers.authorization === 'string'
    ) {
      return request.headers.authorization.split(' ')[1];
    }

    return request.cookies[cookieName];
  }
}
