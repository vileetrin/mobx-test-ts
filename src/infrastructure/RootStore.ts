// import CartsStore from '../domains/carts/store/CartsStore.ts';
import ProductsStore from '../domains/products/store/ProductsStore.ts';
import CartModel from '../domains/carts/store/CartModel.ts';

class RootStore {
    // cartStore: CartsStore;
    cartModel: CartModel;
    productsStore: ProductsStore;

    constructor() {

        this.productsStore = new ProductsStore();
        // this.cartStore = new CartsStore(this);
        this.cartModel = new CartModel();
    }
}

export default RootStore;
