import CartsStore from '../domains/carts/stores/CartsStore.ts';
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
        // this.firstCartStore = new MainCartStore(this);
        // this.secondCartStore = new MainCartStore(this);
        // this.thirdCartStore = new MainCartStore(this);
    }
}

export default RootStore;
