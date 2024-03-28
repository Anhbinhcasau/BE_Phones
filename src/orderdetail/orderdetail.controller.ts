import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDecorator } from 'src/user/Decorator/User.decorator';
import { OrderdetailService } from './orderdetail.service';
import { Status } from './status';
import {
  CancelState,
  CompletedState,
  DeliveringState,
  GettingItemState,
  PackingState,
} from './methodhandler';
import { OrderContext } from './OrderContext';

@Controller('orderDetail')
export class OrderdetailController {
  constructor(private orderDetailService: OrderdetailService) {}

  @Get('history')
  async orderHistory(@UserDecorator() user) {
    return this.orderDetailService.findOrderHistoryByUserId({
      userId: user._id,
    });
  }

  @Get('getAll')
  async getAllOrderHistory() {
    return await this.orderDetailService.findAllOrderHistory();
  }

  @Get(':orderId')
  async findOrderDetail(@Param('orderId') orderId) {
    //uh bí quá thì facade đi nha :))) ok hùng ơi

    return await this.orderDetailService.findOrderDetailById({ orderId });
  }

  @Post('change_status')
  async changeOrderStatus(@UserDecorator() user, @Body() orderDetail) {
    const context: OrderContext = new OrderContext(this.orderDetailService);
    const { userId, _id: orderDetailId, status: newStatus } = orderDetail;
    return await context.changeState(userId, orderDetailId, newStatus);
  }
}
