import { CreateCategoryRequest } from '@app/common/types/category';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto implements CreateCategoryRequest {
  @IsNotEmpty()
  @IsString()
  name: string;
}
