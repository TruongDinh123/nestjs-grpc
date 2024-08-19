import {
  CATEGORY_SERVICE_NAME,
  CategoryServiceClient,
  CreateCategoryRequest,
} from '@app/common/types/category';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class CategoriesService implements OnModuleInit {
  private categoriesService: CategoryServiceClient;
  constructor(@Inject(CATEGORY_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.categoriesService = this.client.getService<CategoryServiceClient>(
      CATEGORY_SERVICE_NAME,
    );
  }
  create(createCategoryDto: CreateCategoryRequest, metadata: any) {
    return this.categoriesService.createCategory(createCategoryDto, metadata);
  }
}
