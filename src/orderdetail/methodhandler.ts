import { Model } from 'mongoose';
import { OrderdetailService } from './orderdetail.service';
import { Status } from './status';
import { OrderDetail } from './schemas/OrderDetail.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

export class GettingItemState implements OrderState {
  constructor(private orderDetailService: OrderdetailService) {}

  async changeStatus(userId: string, orderDetailId: string): Promise<void> {
    await this.orderDetailService.changeStatusOrderDetail({
      userId,
      orderDetailId,
      status: Status.GETTING_ITEM,
    });
  }
}
export class PackingState implements OrderState {
  constructor(private orderDetailService: OrderdetailService) {}

  async changeStatus(userId: string, orderDetailId: string): Promise<void> {
    await this.orderDetailService.changeStatusOrderDetail({
      userId,
      orderDetailId,
      status: Status.PACKAGING,
    });
  }
}
export class DeliveringState implements OrderState {
  constructor(private orderDetailService: OrderdetailService) {}

  async changeStatus(userId: string, orderDetailId: string): Promise<void> {
    await this.orderDetailService.changeStatusOrderDetail({
      userId,
      orderDetailId,
      status: Status.DELIVERING,
    });
  }
}
export class CompletedState implements OrderState {
  constructor(private orderDetailService: OrderdetailService) {}

  async changeStatus(userId: string, orderDetailId: string): Promise<void> {
    await this.orderDetailService.changeStatusOrderDetail({
      userId,
      orderDetailId,
      status: Status.COMPLETED,
    });
  }
}
export class CancelState implements OrderState {
  constructor(private orderDetailService: OrderdetailService) {}

  async changeStatus(userId: string, orderDetailId: string): Promise<void> {
    await this.orderDetailService.changeStatusOrderDetail({
      userId,
      orderDetailId,
      status: Status.CANCELED,
    });
  }
}



// Tương tự, tạo các lớp cụ thể cho các trạng thái khác như 'packaging', 'delivering', 'cancel'...
