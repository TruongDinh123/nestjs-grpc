import { DeepPartial } from 'typeorm';

export interface Write<T> {
  create(document: DeepPartial<T>): Promise<T>;
}

export interface BaseServiceInterface<T> extends Write<T> {}
