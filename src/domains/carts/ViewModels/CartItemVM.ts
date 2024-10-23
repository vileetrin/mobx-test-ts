import { action, computed, makeObservable, observable, untracked } from 'mobx';
import ProductsStore from '../../products/store/ProductsStore.ts';
import { IProductEntity } from '../../products/store/Product.ts';
import CartModel from '../Models/CartModel.ts';
import { ICartItem } from '../store/CartItem.ts';


export class CartItemVM {
  private _productsStore: ProductsStore;
  public _cart: CartModel;

  constructor(productsStore: ProductsStore, cart: CartModel) {
    this._productsStore = productsStore;
    this._cart = cart;

    makeObservable(this, {
      _cart: observable,
      totalPriceWithDiscount: computed,
      discount: computed,
      decreaseQuantity: action,
      increaseQuantity: action,
      removeFromCart: action,

    });
  }

  getProductById(productId: number): IProductEntity {
    return <IProductEntity>untracked(() => this._productsStore.getProductById(productId));
  }

  decreaseQuantity(productId: number): void {
    this._cart.decreaseQuantity(productId);
  }

  increaseQuantity(productId: number): void {
    this._cart.increaseQuantity(productId);
  }

  removeFromCart(productId: number): void {
    this._cart.removeFromCart(productId);
  }

  get totalPrice(): number {
    return this._cart.items.reduce((sum: number, item: ICartItem): number => {
      const product: IProductEntity = this.getProductById(item.productId);
      return sum + (product.price * item.amount);
    }, 0);
  }

  get discount(): number {
    return this._cart.discount;
  }

  get totalPriceWithDiscount(): number {
    return this.totalPrice - this.totalPrice * this.discount;

  }

  handleCheckout(): string {
    const orderDetails: string = this._cart.items
      .map((item: ICartItem): string => {
        const product: IProductEntity = this.getProductById(item.productId);
        return `Name: ${product.name}, Price: $${product.price}, Quantity: ${item.amount}`;
      })
      .join('\n');

    const totalPriceWithDiscount: string = this.totalPriceWithDiscount.toFixed(2);

    return `Order details:\n${orderDetails}\nTotal Price: $${totalPriceWithDiscount}`;
  }
}

export default CartItemVM;


