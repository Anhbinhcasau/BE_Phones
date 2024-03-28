import { IProductFactory } from '../interface/product.interface';
import { ProductDto } from '../dto/product.dto';

export class Accessory implements IProductFactory {
  constructor(private data: ProductDto) {}

  createProduct(type: string, data: ProductDto): any {
    const accessoryProduct = {
        type: type,
        name: data.name,
        quantity_sold: data.quantity_sold,
        description: data.description,
        attributes: data.attributes,
        highlights: data.highlights,
        main_image: data.main_image,
        brand: data.brand,
      };
      return accessoryProduct;
  }
}
