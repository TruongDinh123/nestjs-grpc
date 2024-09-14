import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClothingRepositoryInterface,
  ProductRepositoryInterface,
} from './product.interface';
import { BaseServiceAbstract, GrpcException } from '@app/common';
import { Clothing, Product } from '@app/common/entities/product.entity';
import ProductDto from './product.dto';

@Injectable()
class ProductFactory
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
    @Inject('ClothingRepositoryInterface')
    private readonly clothingRepository: ClothingRepositoryInterface,
  ) {
    super(productRepository);
  }
  onModuleInit() {
    console.log('Registering product types...');
    ProductFactory.registerProductType('Clothing', ClothingService);
    console.log('Registered product types:', ProductFactory.productRegistry);
  }

  async createProduct(
    type: string,
    createProductDto: ProductDto,
  ): Promise<Product> {
    console.log(`Attempting to create product of type: ${type}`);
    console.log('Current product registry:', ProductFactory.productRegistry);
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) {
      throw new Error(`Product type ${type} not found`);
    }

    const productService = new productClass(
      this.productRepository,
      this.clothingRepository,
    );

    const result = await productService.createProduct(createProductDto);
    console.log('ProductFactory createProduct - Result:', result);
    return result;
  }
}

class ProductService {
  constructor(
    protected productRepository: ProductRepositoryInterface,
    protected clothingRepository: ClothingRepositoryInterface,
  ) {}

  async createProduct(
    createProductDto: ProductDto,
    product_id?: number,
  ): Promise<Product | Clothing> {
    console.log(
      '🚀 ~ ProductService createProduct - Input::',
      createProductDto,
    );
    const newProduct = await this.productRepository.create({
      ...createProductDto,
      id: product_id,
      account: createProductDto.account,
    });
    console.log('🚀 ~ ProductService createProduct - Result::', newProduct);
    return newProduct;
  }
}

class ClothingService extends ProductService {
  async createProduct(createProductDto: ProductDto) {
    console.log(
      '🚀 ~ ClothingService createProduct - Input::',
      createProductDto,
    );
    // const { attributes, ...productData } = createProductDto;

    // const clothingData = {
    //   ...productData,
    //   id: productData.id,
    //   attributes: attributes,
    //   brand: attributes.brand,
    //   size: attributes.size,
    //   color: attributes.color,
    //   material: attributes.material,
    // };

    const newClothing = await this.clothingRepository.create({
      ...createProductDto.attributes,
      account: createProductDto.account,
    });

    if (!newClothing) {
      throw new GrpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Failed to create clothing',
      });
    }

    const productData = {
      ...createProductDto,
      product_id: newClothing.id,
      account: createProductDto.account,
    };
    console.log('🚀 ~ productData:', productData);

    const newProduct = await super.createProduct(productData);
    console.log(
      '🚀 ~ ClothingService and newProduct createProduct - Result::',
      {
        ...newProduct,
        ...newClothing,
      },
    );

    return newProduct;
  }
}

ProductFactory.registerProductType('Clothing', ClothingService);

export default ProductFactory;
