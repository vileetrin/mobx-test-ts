import {IProductEntity} from "../products/store/Product.ts";

export interface ICartItem extends IProductEntity {
    amount: number;
}