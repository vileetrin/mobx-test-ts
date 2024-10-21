import CartsStore from '../store/CartsStore.ts';
import CartModel from '../Models/CartModel.ts';
import ProductsStore from '../../products/store/ProductsStore.ts';
import { IProductEntity } from '../../products/store/Product.ts';
import { computed, makeObservable } from 'mobx';

class CartPageVM {
  private _cartsStore: CartsStore;
  private _productsStore: ProductsStore;

  constructor(cartStore: CartsStore, productsStore: ProductsStore) {
    this._cartsStore = cartStore;
    this._productsStore = productsStore;
    makeObservable(this, {
      totalPriceWithDiscount: computed,
      discount: computed,
    });
  }

  get carts(): Array<CartModel> {
    return this._cartsStore.carts;
  }

  getProductById(productId: number): IProductEntity | undefined {
    return this._productsStore.getProductById(productId);
  }

  get cartsPrice(): number {
    return Object.values(this.carts).reduce((total: number, cart: CartModel): number => {
      cart.items.forEach(item => {
        const product = this.getProductById(item.productId);
        if (!product) return;

        total += (product.price * item.amount);
      });
      return total;
    }, 0);
  }

  get discount(): number {
    return this._cartsStore.discount;
  }

  get totalPriceWithDiscount(): number {
    const _cartPrice = this.cartsPrice;
    return _cartPrice - (_cartPrice * this.discount);
  }

  // handleCheckout(): string {
  //     return untracked(() => {
  //         const orderDetails: string[] = Object.values(this.carts).map((cart: CartModel): string => {
  //             const items = untracked(() => cart.items)
  //             return items.map(item => {
  //                 const untrackedItem = untracked(() => item);
  //                 const product: IProductEntity = this.getProductById(untrackedItem.productId);
  //                 return `Name: ${product.name}, Price: $${product.price}, Quantity: ${untrackedItem.amount}`;
  //             }).join('\n');
  //         })
  //         const totalPriceWithDiscount: string = this.totalPriceWithDiscount.toFixed(2);
  //
  //         return `Order details:\n${orderDetails}\nTotal Price: $${totalPriceWithDiscount}`;
  //     })
  // }
}

export { CartPageVM };
