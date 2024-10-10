import {makeAutoObservable} from 'mobx';
import RootStore from "./rootStore.ts";

interface CartItem {
    id: number;
    name: string;
    price: number;
    amount: number;
    image: string;
}

class CartStore {
    cart: CartItem[] = [];
    root: RootStore;

    constructor(root: RootStore) {
        makeAutoObservable(this);
        this.root = root;
    }

    addToCart(id: number): void {
        const productInCart: CartItem | undefined = this.cart.find(product => product.id === id);
        if (productInCart) {
            alert('Цей товар уже є в кошику');
        } else {
            const products = this.root.productsStore.getAllProducts
            const product = products.find(product => product.id === id);
            if (product) {
                this.cart.push(<CartItem>product);
            }
        }
    }

    removeFromCart(id: number): void {
        this.cart = this.cart.filter(item => item.id !== id);
    }

    get totalItems(): number {
        return this.cart.reduce((sum: number, cartItem: CartItem): number => sum + cartItem.amount, 0);
    }

    get totalPrice(): number {
        return this.cart.reduce((sum, cartItem: CartItem) => sum + cartItem.price * cartItem.amount, 0);
    }

    get discount() {
        const totalItems: number = this.totalItems;

        if (totalItems >= 3 && totalItems < 10) {
            return 0.07;
        } else if (totalItems >= 10) {
            return 0.10;
        }
        return 0;
    }

    get totalPriceWithDiscount(): number {
        const discount = this.discount;
        const totalPrice = this.totalPrice;
        return totalPrice - totalPrice * discount;
    }

    increase(index: number): void {
        this.cart[index].amount += 1
    }

    decrease(index: number): void {
        if (this.cart[index].amount > 0) {
            this.cart[index].amount -= 1
        }
    }

    changeName(index: number): void {
        this.cart[index].name = prompt('Enter new name', this.cart[index].name) || this.cart[index].name;
    }
}

export default CartStore;