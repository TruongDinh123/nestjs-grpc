import { DatabaseModule } from '@app/common';
import { Clothing, Product } from '@app/common/entities/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { Module } from '@nestjs/common';
import ProductFactory from './product.service';
import { ClothingRepository } from './clothing.repository';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Product, Clothing]),
  ],
  controllers: [ProductController],
  providers: [
    ProductFactory,
    {
      provide: 'ProductRepositoryInterface',
      useClass: ProductRepository,
    },
    {
      provide: 'ClothingRepositoryInterface',
      useClass: ClothingRepository,
    },
  ],
})
export class ProductsModule {}
