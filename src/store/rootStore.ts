import CartStore from './cartStore';
import ProductsStore from './productsStore';
import DiscountService from './services/DiscountService';

class RootStore {
    cartStore: CartStore;
    productsStore: ProductsStore;

    constructor() {
        const discountService = new DiscountService();

        this.productsStore = new ProductsStore();
        this.cartStore = new CartStore( discountService, this);
    }
}

export default RootStore;
