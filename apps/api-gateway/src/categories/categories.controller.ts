import { Controller, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { CreateCategoryRequest } from '@app/common/types/category';
import { CookieMetadata } from '../decorators/use-cookie.decorator';
import { Metadata } from '@grpc/grpc-js';

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
}
