import { Injectable } from '@nestjs/common';
import { IProductFactory } from '../interface/product.interface';
import { ProductDto } from '../dto/product.dto';
import { ProductToCartDto } from '../dto/product.dto';
import { MobilePhone } from '../models/phone.model';
import { Tablet } from '../models/tablet.model';
import { Accessory } from '../models/accessory.model';

@Injectable()
export class ProductFactory implements IProductFactory {
  createProduct(type: string, data: any): any {
    switch (type) {
      case 'mobile':
        return new MobilePhone(data);
      case 'tablet':
        return new Tablet(data);
      case 'accessory':
        return new Accessory(data);
      default:
        throw new Error('Invalid product type');
    }
  }
}
