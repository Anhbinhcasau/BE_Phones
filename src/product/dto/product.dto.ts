import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { AttributeDto } from './attributes.tdo';

export class ProductDto {

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  quantity_sold: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) // Kiểm tra từng phần tử trong mảng
  @Type(() => AttributeDto)
  attributes: AttributeDto[];

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true }) // Kiểm tra từng phần tử trong mảng
  highlights: string[];

  @IsNotEmpty()
  @IsString()
  main_image: string;

  @IsString()
  brand: string;
}

export class ProductToCartDto extends AttributeDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  name: string;
}