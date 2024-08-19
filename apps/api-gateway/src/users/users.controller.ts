import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Req,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, RegisterDto, UserAndToken } from '@app/common';
import { ICustomResponse } from '../interfaces/custom-response.interface';
import { lastValueFrom } from 'rxjs';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CookieMetadata } from '../decorators/use-cookie.decorator';
import { Metadata } from '@grpc/grpc-js';
import { User } from '@app/common/types/common';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: RegisterDto,
    @CookieMetadata() metadata: Metadata,
  ): Promise<ICustomResponse<User>> {
    const result = await lastValueFrom(
      this.usersService.create(createUserDto, metadata),
    );
    return {
      message: 'Đăng kí thành công',
      result: result,
    };
  }

  @Post('log-in')
  async login(
    @Body() loginDto: LoginDto,
    @CookieMetadata() metadata: Metadata,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ICustomResponse<UserAndToken>> {
    const result = await lastValueFrom(
      this.usersService.login(loginDto, metadata),
    );

    delete result.user.password;

    response?.setHeader('Set-Cookie', [
      result.accessTokenCookie,
      result.refreshTokenCookie,
    ]);

    return {
      message: 'Đăng nhập thành công',
      result: result,
    };
  }

  @Get('refresh-token')
  async refreshToken(
    @Req() request: Request,
    @CookieMetadata('Refresh') metadata: Metadata,
  ) {
    try {
      const result = await lastValueFrom(
        this.usersService.refreshToken({}, metadata),
      );

      const { user, accessTokenCookie } = result;
      request.res.setHeader('Set-Cookie', [accessTokenCookie]);
      return { user, accessTokenCookie };
    } catch (error) {
      throw new InternalServerErrorException('Error refreshing token');
    }
  }

  @Get()
  findAll(@CookieMetadata() metadata: Metadata) {
    return this.usersService.findAll(metadata);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @CookieMetadata() metadata: Metadata) {
    return this.usersService.findOne(id, metadata);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @CookieMetadata() metadata: Metadata) {
    return this.usersService.remove(id, metadata);
  }

  @Post('email')
  emailUsers(@CookieMetadata() metadata: Metadata) {
    return this.usersService.emailUsers(metadata);
  }
}
