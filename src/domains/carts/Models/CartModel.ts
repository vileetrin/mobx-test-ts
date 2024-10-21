import {makeAutoObservable} from 'mobx';
import {ICartItem} from '../store/CartItem.ts';

class CartModel {
    private _name: string;
    private _items: ICartItem[];

    constructor(items: ICartItem[] = [], name: string) {
        makeAutoObservable(this);
        this._items = items;
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    get items(): ICartItem[] {
        return this._items;
    }

    totalItems(): number {
        return this._items.reduce((sum: number, item: ICartItem): number => sum + item.amount, 0) || 0;

    }

    addToCart(productId: number): void {
        const existing: ICartItem | undefined = this._items.find(p => p.productId === productId);
        if (existing) {
            alert('Цей товар вже у кошику');
        } else {
            this._items.push({productId: productId, amount: 1});
        }
    }

    removeFromCart(productId: number): void {
        const index: number = this._items.findIndex((p): boolean => p.productId === productId);
        if (index > -1) {
            this._items.splice(index, 1);
        }
    }

    increaseQuantity(productId: number): void {
        const item: ICartItem | undefined = this._items.find(item => item.productId === productId);
        if (item) {
            item.amount += 1;
        }
    }

    decreaseQuantity(productId: number): void {
        const item: ICartItem | undefined = this._items.find(item => item.productId === productId);
        if (item && item.amount > 1) {
            item.amount -= 1;
        }
    }

    discount(): number {
        const itemCount: number = this.totalItems();
        if (itemCount >= 3 && itemCount < 10) {
            return 0.07;
        } else if (itemCount >= 10) {
            return 0.10;
        }
        return 0;
    }

}

export default CartModel;
