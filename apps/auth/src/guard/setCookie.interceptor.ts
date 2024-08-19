import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      tap((user) => {
        // Assuming user contains the necessary information to generate cookies
        const accessTokenCookie = 'accessTokenCookie'; // Replace with actual logic
        const refreshTokenCookie = 'refreshTokenCookie'; // Replace with actual logic

        response.setHeader('Set-Cookie', [
          accessTokenCookie,
          refreshTokenCookie,
        ]);
      }),
    );
  }
}
