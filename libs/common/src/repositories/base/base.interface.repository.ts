import { FilterQuery, UpdateQuery } from 'mongoose';

export interface BaseRepositoryInterface<T> {
  create(document: Omit<T, '_id'>): Promise<T>;

  findOne(filterQuery: FilterQuery<T>): Promise<T>;

  findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T>;

  find(filterQuery: FilterQuery<T>): Promise<T[]>;

  findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T>;
}
