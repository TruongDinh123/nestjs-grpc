import { Address, CreateUserDto } from '@app/common';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto implements CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @IsOptional()
  @IsObject()
  address: Address;

  @IsString()
  @IsNotEmpty()
  @Matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
    message: 'phoneNumber must be a valid phone number',
  })
  phoneNumber: string;
}
