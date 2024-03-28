import { ConflictException } from '@nestjs/common';
import { Types } from 'mongoose';

export class EditProductStrategy implements ProductStrategy {
  constructor(private productModel: any) {}

  async execute(product: any): Promise<any> {
    const { _id, ...productChange } = product;
    const foundProduct = await this.productModel.findById(
      new Types.ObjectId(_id),
    );
    if (!foundProduct) throw new ConflictException('Không tìm thấy sản phẩm');

    return await this.productModel.updateOne({ _id }, productChange);
  }
}
