import { IProductFactory } from '../interface/product.interface';
import { ProductDto } from '../dto/product.dto';

export class MobilePhone implements IProductFactory {
  constructor(private data: ProductDto) {}

  createProduct(type: string, data: ProductDto): any {
    // Triển khai logic tạo sản phẩm điện thoại di động
  }
}
