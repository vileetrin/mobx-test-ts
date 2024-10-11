import { makeAutoObservable } from 'mobx';
import { ICartItem} from './interfaces';
import DiscountService from './services/DiscountService';
import ProductService from './services/ProductService';

class CartStore {
    private _cart: ICartItem[] = [];
    private _discountService: DiscountService;
    private _productService: ProductService;

    constructor(discountService: DiscountService, productService: ProductService) {
        makeAutoObservable(this);
        this._discountService = discountService;
        this._productService = productService;
    }

    get cart():Array<ICartItem> {
        return this._cart;
    }

    addToCart(productId: number): void {
        const productInCart = this.cart.find(item => item.id === productId);
        if (!productInCart) {
            const product = this._productService.getProductById(productId);
            if (product) {
                this.cart.push({ ...product, amount: 1 });
            }
        } else {
            alert('Цей товар вже є в кошику');
        }
    }

    removeFromCart(productId: number): void {
        this._cart = this._cart.filter(item => item.id !== productId);
    }

    increaseQuantity(productId: number): void {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.amount += 1;
        }
    }

    decreaseQuantity(productId: number): void {
        const item = this.cart.find(item => item.id === productId);
        if (item && item.amount > 1) {
            item.amount -= 1;
        }
    }

    get totalItems(): number {
        return this.cart.reduce((sum, item) => sum + item.amount, 0);
    }

    get totalPrice(): number {
        return this.cart.reduce((sum, item) => sum + item.price * item.amount, 0);
    }

    get totalPriceWithDiscount(): number {
        const discount = this._discountService.calculateDiscount(this.totalItems);
        return this.totalPrice - this.totalPrice * discount;
    }

    get discount(): number {
        return this._discountService.calculateDiscount(this.totalItems);
    }
}

export default CartStore;
