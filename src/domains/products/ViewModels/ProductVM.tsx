import CartsStore from "../../carts/store/CartsStore.ts";
import { ICartItem } from "../../carts/store/CartItem.ts";

export class ProductVM {
    private _cartsStore: CartsStore;

    constructor(cartsStore: CartsStore) {
        this._cartsStore = cartsStore;
    }

    getAvailability(productId: number) {
        return this._cartsStore.getProductAvailability(productId);
    }

    getCartNames() {
        return Object.keys(this._cartsStore.carts);
    }

    addToCart(cartName: string, product: ICartItem) {
        this._cartsStore.addToCart(cartName, product);
    }
}

