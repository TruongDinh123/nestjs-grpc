export interface Write<T> {
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T>;
}

export interface Read<T> {
  find(item: T): Promise<T[]>;
}

export interface BaseServiceInterface<T> extends Write<T>, Read<T> {}
