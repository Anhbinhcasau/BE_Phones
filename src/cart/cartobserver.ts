import { Cart } from './schemas/cart.schema';
 export class CartObservable {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(cart: Cart): void {
    for (let observer of this.observers) {
      observer.update(cart);
    }
  }
}
