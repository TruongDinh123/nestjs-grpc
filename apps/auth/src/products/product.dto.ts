import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export enum ProductType {
  Clothing = 'Clothing',
  Electronics = 'Electronics',
}
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

  @IsString()
  @IsNotEmpty()
  productType: string;

  account?: any; // Thay đổi kiểu dữ liệu phù hợp

  @IsNotEmpty()
  attributes: any; // Thay đổi kiểu dữ liệu phù hợp
}

export default ProductDto;
