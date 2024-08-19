import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule, UsersRepository } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '@app/common/entities/user.entity';
import { JwtStrategy } from '../guard/jwt.strategy';
import { JwtRefreshTokenStrategy } from '../guard/jwt-refresh-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Address } from '@app/common/entities/adress.entity';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity, Address]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    { provide: 'UsersRepositoryInterface', useClass: UsersRepository },
  ],
})
export class UsersModule {}
