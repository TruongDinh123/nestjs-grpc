import { BaseRepositoryInterface } from '@app/common';
import { Clothing, Product } from '@app/common/entities/product.entity';

export interface ProductRepositoryInterface
  extends BaseRepositoryInterface<Product> {}

export interface ClothingRepositoryInterface
  extends BaseRepositoryInterface<Clothing> {}
