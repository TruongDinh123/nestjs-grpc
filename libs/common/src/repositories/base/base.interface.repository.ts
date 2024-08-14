import { DeepPartial, FindOneOptions } from 'typeorm';

export interface BaseRepositoryInterface<T> {
  create(data: DeepPartial<T>): Promise<T>;

  findOne(filterQuery: FindOneOptions<T>): Promise<T>;

  findOneAndUpdate(
    filterQuery: FindOneOptions<T>,
    update: DeepPartial<T>,
  ): Promise<T>;

  find(filterQuery: FindOneOptions<T>): Promise<T[]>;

  findOneAndDelete(filterQuery: FindOneOptions<T>): Promise<T>;
}
