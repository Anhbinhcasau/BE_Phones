import { CancelState, CompletedState, DeliveringState, GettingItemState, PackingState } from "./methodhandler";
import { OrderdetailService } from "./orderdetail.service";
import { Status } from "./status";

export class OrderContext {
  private currentState: OrderState;
  private orderDetailService: OrderdetailService;

  constructor(orderDetailService: OrderdetailService) {
    this.orderDetailService = orderDetailService;
  }

  setState(newState: OrderState) {
    this.currentState = newState;
  }

  changeStatus(userId: string, orderDetailId: string) {
    this.currentState.changeStatus(userId, orderDetailId);
  }
  async changeState(userId: string, orderDetailId: string, newStatus: Status) {
    switch (newStatus) {
      case Status.GETTING_ITEM:
        this.currentState = new GettingItemState(this.orderDetailService);
        break;
      case Status.PACKAGING:
        this.currentState = new PackingState(this.orderDetailService);
        break;
      case Status.DELIVERING:
        this.currentState = new DeliveringState(this.orderDetailService);
        break;
      case Status.COMPLETED:
        this.currentState = new CompletedState(this.orderDetailService);
        break;
      case Status.CANCELED:
        this.currentState = new CancelState(this.orderDetailService);
        break;
      default:
        throw new Error('Invalid status');
    }
    await this.changeStatus(userId, orderDetailId);
  }
}
