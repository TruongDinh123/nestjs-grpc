import { BaseServiceInterface } from './base.interface.service';
import { BaseRepositoryInterface, HasId } from '@app/common/repositories';
import { DeepPartial } from 'typeorm';
export abstract class BaseServiceAbstract<T extends HasId>
  implements BaseServiceInterface<T>
{
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  async create(document: DeepPartial<T>): Promise<T> {
    return await this.repository.create(document);
  }
}
