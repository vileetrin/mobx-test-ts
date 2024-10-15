import CartModel from "../../carts/store/CartModel.ts";
import {IProductEntity} from "../store/Product.ts";

export class ProductVM {
    private _cartModel: CartModel

    constructor(cartModel: CartModel) {
        this._cartModel = cartModel
    }

    getAvailability(productId: number) {
        return this._cartModel.getProductAvailability(productId)
    }

    addToCart(product: IProductEntity) {
        this._cartModel.addToCart(product)
    }

}

