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
    console.log('ProductService initialized:', !!this.productsService);
    console.log('Available methods:', Object.keys(this.productsService));
  }

  createProduct(createProductDto: CreateProductRequest, metadata: any) {
    console.log('Attempting to create product:', createProductDto);
    return this.productsService.createProduct(createProductDto, metadata);
  }
}
