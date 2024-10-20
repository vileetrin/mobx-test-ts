import CartsStore from '../../carts/store/CartsStore.ts';
import CartModel from '../../carts/Models/CartModel.ts';
import { IProductEntity } from '../store/Product.ts';

export class ProductVM {
  private _cartsStore: CartsStore;
  private _productEntity: IProductEntity;

  constructor(productEntity: IProductEntity, cartsStore: CartsStore) {
    this._cartsStore = cartsStore;
    this._productEntity = productEntity;
  }

  getAvailability(productId: number) {
    return this._cartsStore.getProductAvailability(productId);
  }

  getCarts(): Array<CartModel> {
    return this._cartsStore.getCarts();
  }

  getProduct = (): IProductEntity => {
    return this._productEntity;
  };
}

