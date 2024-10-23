import { action, computed, makeObservable, observable } from 'mobx';
import { IProductEntity } from './Product.ts';

class ProductsStore {
  private _products: IProductEntity[] = [];

  constructor() {
    makeObservable(this, {
      products: computed,
      setProducts: action,
      getProductById: observable,
    });
  }

  get products(): Array<IProductEntity> {
    return this._products;
  }

  setProducts(products: Array<IProductEntity>) {
    this._products = products;
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }
}

export default ProductsStore;
