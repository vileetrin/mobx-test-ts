import { makeAutoObservable } from 'mobx';
import CartsStore from '../store/CartsStore.ts';
import CartModel from "../Models/CartModel.ts";

class CartPageVM {
    private _cartsStore: CartsStore;

    constructor(cartStore: CartsStore) {
        this._cartsStore = cartStore;
        makeAutoObservable(this);
    }

    getCarts(): Array<CartModel> {
        return this._cartsStore.getCarts()
    }

    // getSummary(){
    //     return this._cartsStore.summaryInfo()
    // }
}

export { CartPageVM };
