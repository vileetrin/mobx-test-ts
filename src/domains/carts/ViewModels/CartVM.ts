import CartModel from "../store/CartModel.ts";

export class CartVM {
    private _carts: Array<CartModel>;

    constructor(carts: Array<CartModel>) {
        this._carts = carts;
    }

    getCartById(cartId:number){
        return this._carts.find(cart => cart.cartId === cartId);
    }

}