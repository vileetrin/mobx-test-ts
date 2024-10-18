import CartsStore from '../domains/carts/store/CartsStore.ts';
import ProductsStore from '../domains/products/store/ProductsStore.ts';
import {cartsFactory} from "./CartsFactory.ts";
import CartModel from "../domains/carts/Models/CartModel.ts";
import {Carts} from "../domains/carts/Models/Carts.ts";

class RootStore {
    cartsStore: CartsStore;
    productsStore: ProductsStore;

    constructor() {
        this.productsStore = new ProductsStore();
        const carts = Object.keys(cartsFactory.carts).reduce((acc: Carts, key) => {
            acc[key] = new CartModel(cartsFactory.carts[key], key);
            return acc;
        }, {});
        this.cartsStore = new CartsStore(carts);
    }
}

export default RootStore;
