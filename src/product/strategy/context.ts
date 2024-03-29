export class ProductContext {
  private strategy: ProductStrategy;

  constructor(private productModel: any, private orderDetailService: any) {}

  setStrategy(strategy: ProductStrategy) {
    this.strategy = strategy;
  }

  executeStrategy(product: any): Promise<any> {
    return this.strategy.execute(product);
  }
}
