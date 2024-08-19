import { BaseRepositoryAbstract, CategoryEntity } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryRepositoryInterface } from './category.interface';

@Injectable()
export class CategoriesRepository
  extends BaseRepositoryAbstract<CategoryEntity>
  implements CategoryRepositoryInterface
{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categories_repository: Repository<CategoryEntity>,
  ) {
    super(categories_repository);
  }
}
