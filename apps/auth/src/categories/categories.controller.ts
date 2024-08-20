import { Controller, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateCategoryDto } from './dto/createCategory.dto';
import {
  CATEGORY_SERVICE_NAME,
  GetAllCategoriesResponse,
} from '@app/common/types/category';
import JwtAuthenticationGuard from '../guard/jwt-authentication.guard';
import { CategoryEntity } from '@app/common';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @GrpcMethod(CATEGORY_SERVICE_NAME, 'CreateCategory')
  @UseGuards(JwtAuthenticationGuard)
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const result =
      await this.categoriesService.createCategories(createCategoryDto);
    return result;
  }

  @GrpcMethod(CATEGORY_SERVICE_NAME, 'GetAllCategories')
  async getAllCategories(): Promise<GetAllCategoriesResponse> {
    return this.categoriesService.getAllCategories();
  }
}
