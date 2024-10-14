import {IProduct} from "../products/Product.ts";

export interface ICartItem extends IProduct {
    amount: number;
}