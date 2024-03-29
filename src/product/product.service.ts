import {
  BadGatewayException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { ProductDto } from './dto/product.dto';

import { OrderdetailService } from 'src/orderdetail/orderdetail.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { CommentProductStrategy } from './strategy/commentproduct';
import { EditProductStrategy } from './strategy/editproducts';
import { ProductContext } from './strategy/context';

@Injectable()
export class ProductService {
  private productContext: ProductContext;
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private orderDetailService: OrderdetailService,
    private userService: UserService,

  ) {
    this.productContext = new ProductContext(
      this.productModel,
      this.orderDetailService,
    );
  }


  async create(product: ProductDto) {
    const idsAttribute = product.attributes.map((value, index) => {
      return {
        id: index,
        ...value,
      };
    });
    const newItem = await this.productModel.create({
      ...product,
      attributes: idsAttribute,
    });
    if (!newItem) throw new ConflictException('Lỗi khi tạo sản phẩm');

    return {
      message: 'Tạo mới sản phẩm thành công',
      status: 201,
      metadata: product,
    };
  }

  async listPros() {
    const listItems = await this.productModel.find().exec();
    if (!listItems) throw new ConflictException('Không tìm thấy sản phẩm');

    return listItems;
  }

  async deleteProductById({ productId }) {
    return await this.productModel.findOneAndDelete({ _id: productId });
  }

  async updateQuantityProduct({ productId, productAttrId, quantityChange }) {
    const query = { _id: productId, 'attributes.$[].id': productAttrId },
      update = {
        $inc: {
          'attributes.$[].quantity': quantityChange,
        },
      },
      options = { upsert: true };
    return await this.productModel.findOneAndUpdate(query, update, options);
  }
  async countQuantItemById(idItem, idAttr) {
    const { attributes } = await this.productModel.findById(idItem).exec();
    if (!attributes) throw new Error('Lỗi không tìm thấy item');
    const quantity = await attributes.filter((item) => {
      if (item.id === idAttr) return item.quantity;
      else return 0;
    });
    return quantity;
  }

  async getProductById({ idProduct }) {
    const foundProduct: any = await this.productModel.findById(idProduct);
    if (!foundProduct) throw new BadGatewayException('Không tìm thấy sản phẩm');
    const comments: any = foundProduct.comments || [];

    for (const [index, comment] of comments.entries()) {
      const user: any = await this.userService.findByUserId(comment.userId);
      foundProduct.comments[index].userId = user;
    }
    return foundProduct;
  }
  async getSubProductById({
    idProduct,
    idAttr,
  }: {
    idProduct: Types.ObjectId;
    idAttr: Number;
  }) {
    const foundProduct = await this.productModel.findById(idProduct).exec();
    if (!foundProduct) throw new BadGatewayException('Không tìm thấy sản phẩm');

    return foundProduct.attributes.find((value) => value.id === idAttr);
  }


  async editProductById(product) {
    this.productContext.setStrategy(new EditProductStrategy(this.productModel));
    return this.productContext.executeStrategy(product);
  }

  async commentProduct(product) {
    this.productContext.setStrategy(
      new CommentProductStrategy(this.productModel, this.orderDetailService),
    );
    return this.productContext.executeStrategy(product);

  }
}
