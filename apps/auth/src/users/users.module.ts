import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule, UsersRepository } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '@app/common/entities/user.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'UsersRepositoryInterface', useClass: UsersRepository },
  ],
})
export class UsersModule {}
