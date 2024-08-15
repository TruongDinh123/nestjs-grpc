import { DeepPartial, FindOneOptions } from 'typeorm';

export interface Write<T> {
  create(document: DeepPartial<T>): Promise<T>;
  preload(entityLike: DeepPartial<T>): Promise<T>;
}

export interface Read<T> {
  findOneBy(filterQuery: FindOneOptions<T>): Promise<T>;
}

export interface BaseServiceInterface<T> extends Write<T>, Read<T> {}
