import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  BaseServiceAbstract,
  GrpcException,
  RegisterDto,
  UsersRepositoryInterface,
} from '@app/common';
import * as bcrypt from 'bcrypt';
import UserEntity from '@app/common/entities/user.entity';
import PostgresErrorCode from '@app/common/databases/postgresErrorCode.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from '../guard/tokenPayload.interface';
import { User } from '@app/common/types/common';

@Injectable()
export class UsersService
  extends BaseServiceAbstract<UserEntity>
  implements OnModuleInit
{
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly users_repository: UsersRepositoryInterface,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super(users_repository);
  }

  onModuleInit() {}

  public async register(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    try {
      const createdUser = await this.create({
        ...registerDto,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new GrpcException({
          status: 400,
          message: 'User already exists',
          error: error.message,
        });
      }
      throw new GrpcException({
        status: 400,
        message: 'User already exists',
        error: error.message,
      });
    }
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return await this.users_repository.findOneByEmail(email);
  }

  public getCookieWithJwtAccessToken(
    userId: number,
    isSecondFactorAuthenticated = false,
  ) {
    const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    if (!user.currentHashedRefreshToken) {
      console.error('No current hashed refresh token available for user.');
      return null; // or handle this case as needed
    }

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    } else {
      console.error('Refresh token does not match.');
      return null; // or handle this case as needed
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    const user = await this.preload({
      id: userId,
      currentHashedRefreshToken,
    });
    if (user) {
      user.currentHashedRefreshToken = currentHashedRefreshToken;
    }
  }

  public async getById(id: number) {
    const user = await this.findOneBy({ where: { id } });
    return user;
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.findByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new GrpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Wrong credentials provided',
      });
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new GrpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Wrong credentials provided',
      });
    }
  }
}
