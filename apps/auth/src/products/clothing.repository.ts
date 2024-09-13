import { Injectable } from '@nestjs/common';
import { ProductRepositoryInterface } from './product.interface';
import { BaseRepositoryAbstract } from '@app/common';
import { Clothing } from '@app/common/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClothingRepository
  extends BaseRepositoryAbstract<Clothing>
  implements ProductRepositoryInterface
{
  constructor(
    @InjectRepository(Clothing)
    private readonly clothings_repository: Repository<Clothing>,
  ) {
    super(clothings_repository);
  }
}
