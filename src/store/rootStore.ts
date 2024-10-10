import ProductsStore from "./productsStore.ts";
import CartStore from "./cartStore.ts";

class RootStore {
    productsStore: ProductsStore;
    cartStore: CartStore;
    constructor() {
        this.productsStore = new ProductsStore(this);
        this.cartStore = new CartStore(this);
    }
}

export default RootStore;