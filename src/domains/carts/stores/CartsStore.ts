import { makeAutoObservable } from 'mobx';

import RootStore from "../../../infrastructure/RootStore.ts";
import {ICartItem} from "../CartItem.ts";

class CartsStore {
    private _mainCart: ICartItem[] = [];
    private _cart1: ICartItem[] = [];
    private _cart2: ICartItem[] = [];
    private _cart3: ICartItem[] = [];
    private _root: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this._root = rootStore;
    }

    get getMainCart():Array<ICartItem> {
        // const allProducts: ICartItem[] = [
        //     ...this._cart1,
        //     ...this._cart2,
        //     ...this._cart3
        // ];
        // const combinedProducts = allProducts.reduce((acc: ICartItem[], item) =>{
        //     const existing = acc.find(i => i.id === item.id)
        //     if(existing){
        //         existing.amount += 1
        //     }else{
        //         combinedProducts.push(existing)
        //     }
        //     return acc;
        //  }
        // ) ;
        // return this._mainCart = combinedProducts;
        return this._mainCart;
    }

    get getCart1 (): Array<ICartItem> {
        return this._cart1;
    }

    get getCart2 (): Array<ICartItem> {
        return this._cart2;
    }

    get getCart3 (): Array<ICartItem> {
        return this._cart3;
    }

    private _getCartByType(cartType: string) {
        switch (cartType) {
            case 'main': return this._mainCart;
            case 'cart1': return this._cart1;
            case 'cart2': return this._cart2;
            case 'cart3': return this._cart3;
            default: return [];
        }
    }

    addToCart(productId: number, cartType: 'main' | 'cart1' | 'cart2' | 'cart3'): void {
        const cart = this._getCartByType(cartType);
        const productInCart: ICartItem | undefined = cart.find(product => product.id === productId);
        if (productInCart) {
            alert(`Цей товар вже є в ${cartType}`);
        } else {
            const product = this._root.productsStore.getProductById(productId);
            if (product) {
                cart.push({...product, amount: 1});
            }
        }
    }

    removeFromCart(productId: number, cartType: 'cart1' | 'cart2' | 'cart3'): void {
        const cart = this._getCartByType(cartType);
        cart.filter(item => item.id !== productId);
    }

    increaseQuantity(productId: number, cartType: 'cart1' | 'cart2' | 'cart3'): void {
        const cart = this._getCartByType(cartType);
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.amount += 1;
        }
    }

    decreaseQuantity(productId: number, cartType: 'cart1' | 'cart2' | 'cart3'): void {
        const cart = this._getCartByType(cartType);
        const item = cart.find(item => item.id === productId);
        if (item && item.amount > 1) {
            item.amount -= 1;
        }
    }

    get totalItems(): number {
        return this._mainCart.reduce((sum, item) => sum + item.amount, 0);
    }

    get totalPrice(): number {
        return this._mainCart.reduce((sum, item) => sum + item.price * item.amount, 0);
    }

    get discount ():number {
        if (this.totalItems >= 3 && this.totalItems < 10) {
            return 0.07;
        } else if (this.totalItems >= 10) {
            return 0.10;
        }
        return 0;
    }

    get totalPriceWithDiscount(): number {
        return this.totalPrice - this.totalPrice * this.discount;
    }

}

export default CartsStore;
