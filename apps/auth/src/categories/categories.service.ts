import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  BaseServiceAbstract,
  CategoryEntity,
  GrpcException,
} from '@app/common';
import { CategoryRepositoryInterface } from './category.interface';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { GetAllCategoriesResponse } from '@app/common/types/category';

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
    return category;
  }

  async getAllCategories(): Promise<GetAllCategoriesResponse> {
    const categories = await this.categories_repository.find({
      relations: ['posts'],
    });
    return { categories };
  }

  async getCategoryById(id: number) {
    return this.categories_repository.findOneBy({
      where: {
        id,
      },
    });
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    await this.categories_repository.preload(updateCategoryDto);
    const updatedCategory = await this.categories_repository.findOneBy({
      where: {
        id: updateCategoryDto.id,
      },
      relations: ['posts'],
    });
    if (updateCategoryDto) {
      return updatedCategory;
    }
    throw new GrpcException({
      status: HttpStatus.NOT_FOUND,
      message: 'Không tìm thấy danh mục',
    });
  }

  async findByIds(ids: number[]): Promise<CategoryEntity[]> {
    return this.categories_repository.findByIds(ids);
  }
}
