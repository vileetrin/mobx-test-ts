import { action, computed, makeObservable, observable } from 'mobx';
import { IProductEntity } from './Product.ts';

class ProductsStore {
  _products: IProductEntity[] = [];

  constructor() {
    makeObservable(this, {
      products: computed,
      _products: observable,
      setProducts: action,
      getProductById: observable,
    });
  }

  get products(): Array<IProductEntity> {
    return this._products;
  }

  setProducts(products: Array<IProductEntity>): void {
    this._products = products;

  }

  getProductById(id: number): IProductEntity | undefined {
    return this.products.find((product: IProductEntity): boolean => product.id === id);
  }
}

export default ProductsStore;
