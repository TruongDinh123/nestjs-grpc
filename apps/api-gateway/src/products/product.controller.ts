import { Controller, Post } from '@nestjs/common';
import { ProductsService } from './product.service';
import { Payload } from '@nestjs/microservices';
import { CreateProductRequest } from '@app/common/types/product';
import { CookieMetadata } from '../decorators/use-cookie.decorator';
import { Metadata } from '@grpc/grpc-js';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Payload() createProductDto: CreateProductRequest,
    @CookieMetadata('Authentication') metadata: Metadata,
  ) {
    return this.productsService.create(createProductDto, metadata);
  }
}
