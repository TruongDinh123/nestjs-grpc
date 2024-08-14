import { Injectable } from '@nestjs/common';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import UserEntity from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepositoryInterface } from './users.interface';

@Injectable()
export class UsersRepository
  extends BaseRepositoryAbstract<UserEntity>
  implements UsersRepositoryInterface
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly users_repository: Repository<UserEntity>,
  ) {
    super(users_repository);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.users_repository.findOne({ where: { email } });
  }
}
