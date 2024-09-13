import { Controller, Post } from '@nestjs/common';
import { ProductsService } from './product.service';
import { Payload } from '@nestjs/microservices';
import {
  CreateProductRequest,
  ProductResponse,
} from '@app/common/types/product';
import { CookieMetadata } from '../decorators/use-cookie.decorator';
import { Metadata } from '@grpc/grpc-js';
import { lastValueFrom } from 'rxjs';
import { ICustomResponse } from '../interfaces/custom-response.interface';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Payload() createProductDto: CreateProductRequest,
    @CookieMetadata('Authentication') metadata: Metadata,
  ): Promise<ICustomResponse<ProductResponse>> {
    const result = await lastValueFrom(
      this.productsService.createProduct(createProductDto, metadata),
    );
    console.log('🚀 ~ result:', result);
    return {
      message: 'Product created successfully',
      result: result,
    };
  }
}
