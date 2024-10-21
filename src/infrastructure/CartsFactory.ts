import { makeObservable, observable } from 'mobx';
import CartModel from '../domains/carts/Models/CartModel.ts';

interface Carts {
  [key: string]: CartModel;
}

const NUMBER_OF_CARTS = 3;

class CartsFactory {
  carts: Carts = {};

  constructor() {
    makeObservable(this, {
      carts: observable,
    });
    this.createCarts();
  }

  private createCarts() {
    for (let i = 1; i <= NUMBER_OF_CARTS; i++) {
      this.carts[`cart${i}`] = new CartModel([], `Cart №${i}`);
    }
  }

  getCarts(): Carts {
    return this.carts;
  }
}

export const cartsFactory = new CartsFactory();
