import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { PRODUCT_SERVICE_NAME } from '@app/common/types/product';
import ProductDto from './product.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import UserEntity from '@app/common/entities/user.entity';
import { Product } from '@app/common/entities/product.entity';
import JwtAuthenticationGuard from '../guard/jwt-authentication.guard';
import ProductFactory from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productsService: ProductFactory) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
  @UseGuards(JwtAuthenticationGuard)
  async createProduct(
    @Payload() product: ProductDto,
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
