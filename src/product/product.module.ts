import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { OrderdetailModule } from 'src/orderdetail/orderdetail.module';
import { UserModule } from 'src/user/user.module';
import { ProductFactory } from './factory/product.factory';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    OrderdetailModule, UserModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductFactory],
  exports: [ProductService],
})
export class ProductModule {}