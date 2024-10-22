import CartsStore from '../domains/carts/store/CartsStore.ts';
import ProductsStore from '../domains/products/store/ProductsStore.ts';
import { cartsFactory } from './CartsFactory.ts';

class RootStore {
  cartsStore: CartsStore;
  productsStore: ProductsStore;

  constructor() {
    this.productsStore = new ProductsStore();

    const carts = cartsFactory.getCarts();

    this.cartsStore = new CartsStore(carts);
  }
}

export default RootStore;


