import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductToCartDto } from 'src/product/dto/product.dto';
import { DeleteItemDto, ItemToCartDto } from './dto/cart.dto';
import { info } from 'console';
import { UserDecorator } from 'src/user/Decorator/User.decorator';
import { CartObservable } from './cartobservable';
import { CartObserverDelete } from './CartObserver ';

@Controller('cart')
export class CartController {
  private cartObservable: CartObservable;
  private cartObservableDelete = new CartObserverDelete();

  constructor(private cartService: CartService) {
    this.cartObservable = new CartObservable();
  }

  @Post()
  async addToCart(@Body() item: ItemToCartDto) {
    const result = await this.cartService.addToCart({
      userId: item.userId,
      product: item,
    });
    this.cartObservable.notifyObservers(result);
    return result;
  }

  @Post('update')
  async updateItemCart(@Body() infoUpdate) {
    const { userId, ...product } = infoUpdate;
    const result = await this.cartService.updateQuantityItemCart(
      userId,
      product,
    );
    this.cartObservable.notifyObservers(result);
    return result;
  }

  @Post('delete')
  async removeItemInCart(@Body() item: DeleteItemDto) {
    const { userId, cartId, ...infoItem } = item;
    const result = await this.cartService.deleteItemCart(
      { userId, cartId },
      infoItem,
    );
    this.cartObservable.notifyObservers(result);
    return result;
  }

  @Get('findCart/:userId')
  async findCartByUserId(@Param('userId') userId) {
    return await this.cartService.findCartByUserId(userId);
  }

  @Get('findCart')
  async findCart(@UserDecorator() user) {
    return await this.cartService.findCartByUserId(user._id);
  }

  @Post('newCart')
  async newCart(@Body() newCart) {
    return await this.cartService.newUserCartAndUpdateItem(newCart);
  }
}
