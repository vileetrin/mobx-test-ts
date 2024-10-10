import CartStore from './cartStore';
import ProductsStore from './productsStore';
import DiscountService from './services/DiscountService';
import ProductService from './services/ProductService';
import { IProduct } from './interfaces';

class RootStore {
    cartStore: CartStore;
    productsStore: ProductsStore;

    constructor(products: IProduct[]) {
        const discountService = new DiscountService();
        const productService = new ProductService(products);

        this.productsStore = new ProductsStore(products);
        this.cartStore = new CartStore(discountService, productService);
    }
}

export default RootStore;
