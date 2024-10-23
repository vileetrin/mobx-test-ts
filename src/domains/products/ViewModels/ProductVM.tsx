import CartsStore from '../../carts/store/CartsStore.ts';
import CartModel from '../../carts/Models/CartModel.ts';
import { IProductEntity } from '../store/Product.ts';

import { computed, makeObservable } from 'mobx';

export class ProductVM {
  private _cartsStore: CartsStore;
  private _productEntity: IProductEntity;

  constructor(productEntity: IProductEntity, cartsStore: CartsStore) {
    this._cartsStore = cartsStore;
    this._productEntity = productEntity;

    makeObservable(this, {
      availability: computed,
      carts: computed,
      product: computed,
    });
  }

  get availability(): { cartName: string, amount: number }[] {
    return this._cartsStore.getProductAvailability(this._productEntity.id);
  }

  get carts(): Array<CartModel> {
    return this._cartsStore.carts;
  }

  get product(): IProductEntity {
    return this._productEntity;
  };
}

