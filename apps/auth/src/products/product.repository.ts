import { BaseRepositoryAbstract } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRepositoryInterface } from './product.interface';
import {
  Clothing,
  Electronics,
  Product,
} from '@app/common/entities/product.entity';

@Injectable()
export class ProductRepository
  extends BaseRepositoryAbstract<Product | Electronics | Clothing>
  implements ProductRepositoryInterface
{
  constructor(
    @InjectRepository(Product)
    private readonly products_repository: Repository<Product>,
  ) {
    super(products_repository);
  }
}
