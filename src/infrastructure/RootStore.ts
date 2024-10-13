import CartStore from '../domain/cart/CartStore.ts';
import ProductsStore from '../domain/products/ProductsStore.ts';
import DiscountService from '../domain/discount/DiscountService.ts';

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
