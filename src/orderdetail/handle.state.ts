// handler.interface.ts
 interface OrderState {
   changeStatus(userId: string, orderDetailId: string): Promise<void>;
 }
