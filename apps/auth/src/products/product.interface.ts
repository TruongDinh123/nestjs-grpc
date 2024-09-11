import { BaseRepositoryInterface } from '@app/common';
import {
  Clothing,
  Electronics,
  Product,
} from '@app/common/entities/product.entity';

export interface ProductRepositoryInterface
  extends BaseRepositoryInterface<Product | Electronics | Clothing> {}
