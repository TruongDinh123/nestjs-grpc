import { BaseServiceInterface } from './base.interface.service';
import { BaseRepositoryInterface, HasId } from '@app/common/repositories';
import { DeepPartial, FindOneOptions } from 'typeorm';
export abstract class BaseServiceAbstract<T extends HasId>
  implements BaseServiceInterface<T>
{
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  async create(document: DeepPartial<T>): Promise<T> {
    return await this.repository.create(document);
  }

  async findOneBy(filterQuery: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOneBy(filterQuery);
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.repository.preload(entityLike);
  }
}

/*
  - Service này sử dụng repository để tạo một thực thể mới. Nó có thể mở rộng để bao gồm các tác vụ phức tạp hơn như xác thực dữ liệu, 
  áp dụng các quy tắc kinh doanh, hoặc thực hiện các tác vụ liên quan đến nhiều đối tượng.
*/
