import ProductsStore from '../store/ProductsStore.ts';
import { ProductsServerRepo } from '../../../infrastructure/repo/ProductsServerRepo.ts';
import { IProductEntity } from '../store/Product.ts';
import { action, computed, makeObservable } from 'mobx';

export class ProductPageVM {
  private _productsStore: ProductsStore;

  constructor(productsStore: ProductsStore) {
    this._productsStore = productsStore;
    makeObservable(this, {
      init: action,
      products: computed,
    });
  }

  public init() {
    ProductsServerRepo.loadProducts()
      .then(products => {
        this._productsStore.setProducts(products);
      });
  }

  get products(): Array<IProductEntity> {
    return this._productsStore.products;
  }
}

