// import { makeAutoObservable } from 'mobx';
// import { cartsFactory } from "../../../infrastructure/CartListService.ts";
// import CartModel from "../Models/CartModel.ts";
//
// class CartsStore {
//     private _carts: CartModel[]
//
//     constructor() {
//         makeAutoObservable(this);
//         this._carts = cartsFactory.carts;
//     }
//
//     get carts (){
//         return this.carts;
//     }
//
//     get totalPrice(){}
//
//     get totalAmount(){}
//
//     get totalDiscount(){}
//
//     get totalPriceWithDiscount(){}
//
//     summaryInfo(){}
// }
//
// export default CartsStore;
//
//






import { makeAutoObservable } from 'mobx';
import { ICartItem } from "./CartItem.ts";
import { cartsFactory } from "../../../infrastructure/CartListService.ts";

class CartsStore {
    carts: { [key: string]: ICartItem[] };
    mainCart: ICartItem[];

    constructor() {
        makeAutoObservable(this);
        this.carts = cartsFactory.carts;
        this.mainCart = [];
    }

    addToCart(cartName: string, product: ICartItem) {
        if (this.carts[cartName]) {
            const existing = this.carts[cartName].find(p => p.id === product.id);
            if (existing) {
                alert("Цей товар вже у кошику")
            } else {
                this.carts[cartName].push({...product, amount: 1})
                this.mainCart.push({...product, amount: 1});
            }
        }
    }

    removeFromCart(cartName: string, productId: number) {
        if (this.carts[cartName]) {
            this.carts[cartName] = this.carts[cartName].filter((p) => p.id !== productId);
        }
                const mainCartItem = this.mainCart.find((p) => p.id === productId);
                if (mainCartItem) {
                    const totalAmountInCarts = Object.values(this.carts)
                        .flat()
                        .filter((item) => item.id === productId)
                        .reduce((sum, item) => sum + item.amount, 0);

                    if (totalAmountInCarts > 0) {
                        mainCartItem.amount -= 1;
                    } else {
                        this.mainCart = this.mainCart.filter((p) => p.id !== productId);
                    }
                }
            }


    increaseQuantity(productId: number, cartName: string) {
        const item = this.carts[cartName]?.find(item => item.id === productId);
        if (item) {
            item.amount += 1;
            const mainCartItem = this.mainCart.find(p => p.id === productId);
            if (mainCartItem) {
                mainCartItem.amount += 1;
            }
        }
    }

    decreaseQuantity(productId: number, cartName: string) {
        const item = this.carts[cartName]?.find(item => item.id === productId);
        if (item && item.amount > 1) {
            item.amount -= 1;
            const mainCartItem = this.mainCart.find(p => p.id === productId);
            if (mainCartItem) {
                mainCartItem.amount -= 1;
            }
        }
    }

    totalItems(cartName?: string): number {
        if(cartName){
            return this.carts[cartName]?.reduce((sum, item) => sum + item.amount, 0) || 0;
        } else {
            return this.mainCart.reduce((sum, item) => sum + item.amount, 0) || 0;
        }

    }


    totalPrice(cartName?: string): number {
        if(cartName){
            return this.carts[cartName]?.reduce((sum, item) => sum + item.price * item.amount, 0) || 0;
        } else {
            return this.mainCart.reduce((sum, item) => sum + item.price * item.amount, 0) || 0;
        }

    }

    discount(cartName: string): number {
        const itemCount = this.totalItems(cartName);
        if (itemCount >= 3 && itemCount < 10) {
            return 0.07;
        } else if (itemCount >= 10) {
            return 0.10;
        }
        return 0;
    }

    mainDiscount(): number{
        const itemCount = this.totalItems();
        if (itemCount >= 3 && itemCount < 10) {
            return 0.07;
        } else if (itemCount >= 10) {
            return 0.10;
        }
        return 0;
    }

    totalPriceWithDiscount(cartName?: string): number {
        if(cartName){
            return this.totalPrice(cartName) - this.totalPrice(cartName) * this.discount(cartName);
        } else {
            return this.totalPrice() - this.totalPrice() * this.mainDiscount();
        }

    }

    getProductAvailability(productId: number): { cart: string; amount: number }[] {
        const availability = [];
        for (const [cartName, items] of Object.entries(this.carts)) {
            const item = items.find(item => item.id === productId);
            if (item) {
                availability.push({ cart: cartName, amount: item.amount });
            }
        }
        return availability;
    }

    getMainCart() {
        const mergedCart: ICartItem[] = [];

        this.mainCart.forEach(product => {
            const existingProduct = mergedCart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.amount += product.amount;
            } else {
                mergedCart.push({ ...product });
            }
        });

        return this.mainCart = mergedCart;
    }

}

export default CartsStore;
