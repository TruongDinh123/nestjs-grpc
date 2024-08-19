import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { BaseServiceAbstract, CategoryEntity } from '@app/common';
import { CategoryRepositoryInterface } from './category.interface';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoriesService
  extends BaseServiceAbstract<CategoryEntity>
  implements OnModuleInit
{
  constructor(
    @Inject('CategoryRepositoryInterface')
    private readonly categories_repository: CategoryRepositoryInterface,
  ) {
    super(categories_repository);
  }

  onModuleInit() {}

  async createCategories(
    createCategoryRequest: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.categories_repository.create(
      createCategoryRequest,
    );
    console.log('🚀 ~ category:', category);
    return category;
  }

  async findByIds(ids: number[]): Promise<CategoryEntity[]> {
    return this.categories_repository.findByIds(ids);
  }
}
