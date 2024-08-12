import { Injectable } from '@nestjs/common';
import { UserDocument } from '../models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { UsersRepositoryInterface } from 'apps/auth/src/users/users.interface';

@Injectable()
export class UsersRepository
  extends BaseRepositoryAbstract<UserDocument>
  implements UsersRepositoryInterface
{
  constructor(
    @InjectModel(UserDocument.name)
    private readonly users_repository: Model<UserDocument>,
  ) {
    super(users_repository);
  }
}
