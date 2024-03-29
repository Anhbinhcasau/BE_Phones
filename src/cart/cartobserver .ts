export class CartObserverUpdate implements Observer {
  update(data: any): void {
    console.log('Cart updated:', data);
  }
}
export class CartObserverDelete implements Observer {
  update(data: any): void {
    console.log('Item delete:', data);
  }
}
