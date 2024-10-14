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
        const allProducts: ICartItem[] = [
            ...this._cart1,
            ...this._cart2,
            ...this._cart3
        ];
         const combined: ICartItem[] = allProducts.reduce((acc: ICartItem[], item: ICartItem): ICartItem[] => {
            const existing:ICartItem | undefined = acc.find((i: { id: number; }) => i.id === item.id)
            if(existing){
                existing.amount += item.amount
            } else {
                acc.push({...item})
            }
            return acc;
        }, [])

        return this._mainCart = combined;
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

    addToCart(productId: number, cartType: 'cart1' | 'cart2' | 'cart3'): void {
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

    totalItems(cartType: 'main' | 'cart1' | 'cart2' | 'cart3'): number {
        const cart = this._getCartByType(cartType);
        return cart.reduce((sum, item) => sum + item.amount, 0);
    }

    totalPrice(cartType: 'main' | 'cart1' | 'cart2' | 'cart3'): number {
        const cart = this._getCartByType(cartType);
        return cart.reduce((sum, item) => sum + item.price * item.amount, 0);
    }

    discount (cartType: 'main' | 'cart1' | 'cart2' | 'cart3'):number {
        if (this.totalItems(cartType) >= 3 && this.totalItems(cartType) < 10) {
            return 0.07;
        } else if (this.totalItems(cartType) >= 10) {
            return 0.10;
        }
        return 0;
    }

    totalPriceWithDiscount(cartType: 'main' | 'cart1' | 'cart2' | 'cart3'): number {
        return this.totalPrice(cartType) - this.totalPrice(cartType) * this.discount(cartType);
    }

    getProductAvailability(productId: number): { cart: string; amount: number }[] {
        const availability = [];
        const cart1Item = this.getCart1.find(item => item.id === productId);
        const cart2Item = this.getCart2.find(item => item.id === productId);
        const cart3Item = this.getCart3.find(item => item.id === productId);

        if (cart1Item) availability.push({ cart: "Cart №1", amount: cart1Item.amount });
        if (cart2Item) availability.push({ cart: "Cart №2", amount: cart2Item.amount });
        if (cart3Item) availability.push({ cart: "Cart №3", amount: cart3Item.amount });

        return availability;
    }

}

export default CartsStore;
