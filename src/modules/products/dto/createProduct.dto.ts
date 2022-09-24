/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  productName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  productCategory: string;

  @IsDefined()
  @IsNotEmpty()
  productQuantity: number;

  @IsDefined()
  @IsNotEmpty()
  productPrice: number;

  @IsDefined()
  @Type(() => Date)
  @IsDate()
  ProductExe_date: Date;
}
