import ProductsStore from '../store/ProductsStore.ts';
import { ProductsServerRepo } from '../../../infrastructure/repo/ProductsServerRepo.ts';
import { IProductEntity } from '../store/Product.ts';
import { computed, makeObservable, observable } from 'mobx';

export class ProductPageVM {
  private _productsStore: ProductsStore;

  constructor(productsStore: ProductsStore) {
    this._productsStore = productsStore;
    makeObservable(this, {
      init: observable,
      products: computed,
    });
  }

  public init(): void {
    ProductsServerRepo.loadProducts()
      .then((products: IProductEntity[]): void => {
        this._productsStore.setProducts(products);
      });
  }

  get products(): Array<IProductEntity> {
    return this._productsStore.products;
  }
}

