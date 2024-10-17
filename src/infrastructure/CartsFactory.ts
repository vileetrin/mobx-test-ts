import { makeObservable, observable } from 'mobx';
import {ICartItem} from "../domains/carts/store/CartItem.ts";

interface Carts {
    [key: string]: ICartItem[];
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

    createCarts() {
        for (let i = 1; i <= NUMBER_OF_CARTS; i++) {
            this.carts[`cart${i}`] = [];
        }
    }
}

export const cartsFactory = new CartsFactory();
