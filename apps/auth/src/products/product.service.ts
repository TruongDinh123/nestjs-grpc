import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ProductRepositoryInterface } from './product.interface';
import { BaseServiceAbstract } from '@app/common';
import {
  Clothing,
  Electronics,
  Product,
} from '@app/common/entities/product.entity';
import ProductDto from './product.dto';

@Injectable()
export class ProductFactory
  extends BaseServiceAbstract<Product>
  implements OnModuleInit
{
  static productRegistry: Record<string, any> = {};

  static registerProductType(type: string, classRef: any): void {
    ProductFactory.productRegistry[type] = classRef;
  }

  constructor(
    @Inject('ProductRepositoryInterface')
    private readonly productRepository: ProductRepositoryInterface,
  ) {
    super(productRepository);
  }

  onModuleInit() {}

  async createProduct(
    type: string,
    createProductDto: ProductDto,
  ): Promise<Product | Electronics | Clothing> {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) {
      throw new Error(`Product type ${type} not found`);
    }

    const product = new productClass(this.productRepository);

    return product.create(createProductDto);
  }
}

export class ProductService {
  constructor(
    protected productRepository: ProductRepositoryInterface,
    protected clothingRepositorty: ProductRepositoryInterface,
    protected electronicsRepository: ProductRepositoryInterface,
  ) {
    this.productRepository = productRepository;
    this.clothingRepositorty = clothingRepositorty;
    this.electronicsRepository = electronicsRepository;
  }

  async createProduct(
    createProductDto: ProductDto,
    product_id?: number,
  ): Promise<Product | Electronics | Clothing> {
    const newProduct = await this.productRepository.create({
      ...createProductDto,
      id: product_id,
      account: createProductDto.account,
    });
    return newProduct;
  }
}

class ClothingService extends ProductService {
  async createProduct(createProductDto: ProductDto) {
    const newClothing = await this.clothingRepositorty.create({
      ...createProductDto.attributes,
      account: createProductDto.account,
    });

    const productData = {
      ...createProductDto,
      id: newClothing.id,
    };

    const newProduct = await super.createProduct(productData, newClothing.id);

    return newProduct;
  }
}

ProductFactory.registerProductType('clothing', ClothingService);
