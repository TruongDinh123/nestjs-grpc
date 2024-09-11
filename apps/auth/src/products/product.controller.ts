import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PRODUCT_SERVICE_NAME } from '@app/common/types/product';
import ProductDto from './product.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import UserEntity from '@app/common/entities/user.entity';
import { Product } from '@app/common/entities/product.entity';
import { ProductFactory } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productsService: ProductFactory) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
  async createProduct(
    @Body() product: ProductDto,
    @CurrentUser() user: UserEntity,
  ): Promise<Product> {
    const result = await this.productsService.createProduct(
      product.productType,
      {
        ...product,
        account: user.id,
      },
    );
    return result;
  }
}
