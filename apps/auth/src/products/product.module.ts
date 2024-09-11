import { DatabaseModule } from '@app/common';
import { Product } from '@app/common/entities/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'ProductRepositoryInterface',
      useClass: ProductRepository,
    },
  ],
})
export class ProductsModule {}
