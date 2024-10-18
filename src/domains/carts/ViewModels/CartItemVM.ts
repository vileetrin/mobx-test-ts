import {makeAutoObservable} from 'mobx';
import ProductsStore from "../../products/store/ProductsStore.ts";
import {IProductEntity} from "../../products/store/Product.ts";
import {ICartItem} from "../store/CartItem.ts";


export class CartItemVM {
    private _productsStore: ProductsStore;

    constructor(productsStore: ProductsStore ) {
        makeAutoObservable(this);
        this._productsStore = productsStore;
    }

    getProductById(productId: number): IProductEntity{
        return <IProductEntity>this._productsStore.getProductById(productId);
    }

    getProductsById(products: ICartItem[]){
        // console.log(cartName, products);
        const full = [];
        const fullProduct = products.map(product => {
            const oneProduct = this.getProductById(product.productId)
            // full.push({...oneProduct, ...product});
        });
        console.log(fullProduct)

    }

    // totalPrice(products: ICartItem[]): number {
    //     return this.getProductsById(products).reduce((sum, item) => sum + item.price * item.amount, 0) || 0;
    // }



    // handleCheckout(): string {
    //     const orderDetails: string = this.getCartItems()
    //         .map(
    //             (item): string =>
    //                 `Name: ${item.name}, Price: $${item.price}, Quantity: ${item.amount}`
    //         )
    //         .join('\n');
    //
    //     return (`Order details:\n${orderDetails}\nTotal Price: $${this.cartsStore.totalPriceWithDiscount('cart1').toFixed(2)}`);
    // };
}

export default CartItemVM;