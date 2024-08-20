import { UpdateCategoryRequest } from '@app/common/types/category';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto implements UpdateCategoryRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}
