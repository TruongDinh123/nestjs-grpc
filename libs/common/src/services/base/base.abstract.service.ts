import { AbstractDocument } from '@app/common/databases';
import { BaseServiceInterface } from './base.interface.service';
import { BaseRepositoryInterface } from '@app/common/repositories';

export abstract class BaseServiceAbstract<T extends AbstractDocument>
  implements BaseServiceInterface<T>
{
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  async create(document: Omit<T, '_id'>): Promise<T> {
    return await this.repository.create(document);
  }

  async update(id: string, document: T): Promise<T> {
    return await this.repository.findOneAndUpdate({ _id: id }, document);
  }

  async find(item: T): Promise<T[]> {
    return await this.repository.find(item);
  }
}
