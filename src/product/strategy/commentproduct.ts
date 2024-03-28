import { ForbiddenException } from '@nestjs/common';
import { Types } from 'mongoose';

export class CommentProductStrategy implements ProductStrategy {
  constructor(private productModel: any, private orderDetailService: any) {}

  async execute(product: any): Promise<any> {
    const foundOrderDetailSuccess =
      await this.orderDetailService.isOrderDetailSuccess({
        userId: product.userId,
        productId: product.productId,
      });

    if (!foundOrderDetailSuccess)
      throw new ForbiddenException(
        'Bạn không thể đánh giá vì chưa mua sản phẩm',
      );

    const foundProduct = await this.productModel.find(
      new Types.ObjectId(product.productId),
    );
    const foundComment = foundProduct.flatMap((val) => val.comments);

    const checkExistComment = foundComment.some((val: any) => {
      return val.userId.toString() === product.userId.toString();
    });

    if (checkExistComment)
      throw new ForbiddenException('Bạn đã bình luận sản phẩm này rồi');

    const filter = { _id: product.productId },
      update = {
        $push: {
          comments: { ...product, userId: new Types.ObjectId(product.userId) },
        },
      },
      options = { new: true, upsert: true };
    return await this.productModel.findByIdAndUpdate(filter, update, options);
  }
}
