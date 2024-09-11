import { ProductType } from '@app/common/entities/product.entity';
import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export class ProductDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  thumbnail: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsEnum(ProductType)
  @IsNotEmpty()
  productType: ProductType;

  account?: any; // Thay đổi kiểu dữ liệu phù hợp

  @IsNotEmpty()
  attributes: any; // Thay đổi kiểu dữ liệu phù hợp
}

export default ProductDto;
