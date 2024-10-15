import CartsStore from '../domains/carts/store/CartsStore.ts';
import ProductsStore from '../domains/products/store/ProductsStore.ts';

class RootStore {
    cartStore: CartsStore;
    productsStore: ProductsStore;

    constructor() {

        this.productsStore = new ProductsStore();
        this.cartStore = new CartsStore();
    }
}

export default RootStore;
