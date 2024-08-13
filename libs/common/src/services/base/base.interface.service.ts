export interface Write<T> {
  create(document: Omit<T, '_id'>): Promise<T>;
  update(id: string, item: T): Promise<T>;
}

export interface Read<T> {
  find(item: T): Promise<T[]>;
}

export interface BaseServiceInterface<T> extends Write<T>, Read<T> {}
