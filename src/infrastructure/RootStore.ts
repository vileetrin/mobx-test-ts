import CartsStore from '../domains/carts/store/CartsStore.ts';
import ProductsStore from '../domains/products/ProductsStore.ts';

class RootStore {
    cartStore: CartsStore;
    // firstCartStore: MainCartStore;
    // secondCartStore: MainCartStore;
    // thirdCartStore: MainCartStore;
    productsStore: ProductsStore;

    constructor() {

        this.productsStore = new ProductsStore();
        this.cartStore = new CartsStore(this);
    }
}

export default RootStore;
