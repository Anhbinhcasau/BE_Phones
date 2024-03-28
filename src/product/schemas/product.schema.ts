import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsArray } from 'class-validator';

@Schema()
export class Product extends Document {
  @Prop({
    required: true,
    default: [],
  })
  attributes: {
    id: number;
    color: string;
    class: string;
    quantity: number;
    devide_storage: string;
    price: number;
    image: string;
  }[];

  @Prop({
    required: true,
    length: 40,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({
    required: true,
    default: 0,
    validate: [IsPositive],
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @Prop({
    required: true,
    default: 0,
    validate: [IsPositive],
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity_sold: number;

  @Prop({
    required: true,
    default: 'Không có mô tả',
    length: 1000,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  main_image: string;

  @Prop({
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  highlights: [];

  @Prop({
    required: true,
  })
  @IsString()
  brand: string;

  @Prop({
    default: []
  })
  comments: []
}

export const ProductSchema = SchemaFactory.createForClass(Product);