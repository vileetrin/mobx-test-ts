import CartModel from "../store/CartModel.ts";
import {handleCartsArray} from "../../../infrastructure/CartListService.ts";

export class CartPageVM {
    private _carts: Array<CartModel>;

    constructor(carts: Array<CartModel>) {
        this._carts = carts;
    }

    getCarts() {
        return this._carts = handleCartsArray();
    }

    getCartById(id: number) {
        return this._carts.find(cart => cart.cartId === id);
    }
}