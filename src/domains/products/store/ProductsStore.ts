import { action, computed, observable } from 'mobx';
import { IProductEntity } from './Product.ts';

class ProductsStore {
  @observable private _products: IProductEntity[] = [];

  constructor() {
  }

  @computed
  get products(): Array<IProductEntity> {
    return this._products;
  }

  @action
  setProducts(products: Array<IProductEntity>) {
    this._products = products;
  }

  @action
  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }
}

export default ProductsStore;
