import { Controller, Get, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryRequest,
  GetAllCategoriesResponse,
} from '@app/common/types/category';
import { CookieMetadata } from '../decorators/use-cookie.decorator';
import { Metadata } from '@grpc/grpc-js';
import { lastValueFrom } from 'rxjs';
import { ICustomResponse } from '../interfaces/custom-response.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Payload() createCategoryDto: CreateCategoryRequest,
    @CookieMetadata('Authentication') metadata: Metadata,
  ) {
    return this.categoriesService.create(createCategoryDto, metadata);
  }

  @Get()
  async getCategories(
    @CookieMetadata('Authentication') metadata: Metadata,
  ): Promise<ICustomResponse<GetAllCategoriesResponse>> {
    const result = await lastValueFrom(
      this.categoriesService.getCategories({}, metadata),
    );
    return {
      message: 'Lấy danh mục thành công',
      result: result,
    };
  }
}
