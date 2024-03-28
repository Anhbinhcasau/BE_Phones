
export interface IProductFactory {
  createProduct(type: string, data: any): any;
}