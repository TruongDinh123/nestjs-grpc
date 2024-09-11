import {
  CreateProductRequest,
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
} from '@app/common/types/product';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ProductsService implements OnModuleInit {
  private productsService: ProductServiceClient;
  constructor(@Inject(PRODUCT_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.productsService =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }
  create(createProductDto: CreateProductRequest, metadata: any) {
    return this.productsService.createProduct(createProductDto, metadata);
  }
}
