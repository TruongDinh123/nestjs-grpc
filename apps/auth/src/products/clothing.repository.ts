import { Injectable } from '@nestjs/common';
import { ClothingRepositoryInterface } from './product.interface';
import { BaseRepositoryAbstract } from '@app/common';
import { Clothing } from '@app/common/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClothingRepository
  extends BaseRepositoryAbstract<Clothing>
  implements ClothingRepositoryInterface
{
  constructor(
    @InjectRepository(Clothing)
    private readonly clothings_repository: Repository<Clothing>,
  ) {
    super(clothings_repository);
  }

  async create(data: Partial<Clothing>): Promise<Clothing> {
    return super.create(data);
  }
}
