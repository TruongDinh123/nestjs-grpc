import { CreatePostRequest } from '@app/common/types/post';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class CategoryIdDto {
  @IsNumber()
  id: number;
}

export class CreatePostDto implements CreatePostRequest {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CategoryIdDto)
  categories: CategoryIdDto[];
}
