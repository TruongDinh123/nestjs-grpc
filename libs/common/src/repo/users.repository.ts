import { Model } from 'mongoose';
import { AbstractRepository } from '../databases';
import { UserDocument } from '../models';

export class UserRepository extends AbstractRepository<UserDocument> {
  constructor(protected readonly userModel: Model<UserDocument>) {
    super(userModel);
  }
}
