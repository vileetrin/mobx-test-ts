import {makeAutoObservable} from 'mobx';
import {ProductsServerRepo} from "../../infrastructure/repo/ProductsServerRepo.ts";
import {IProduct} from "./Product.ts";

class ProductsStore {
    private products: IProduct[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadProducts(): void {
        // return this.products;
        ProductsServerRepo.loadProducts().then(res => this.products = res);
    }

    getAllProducts(): Array<IProduct> {
        return this.products
    }

    getProductById(id: number): IProduct | undefined {
        return this.products.find(product => product.id === id);
    }
}

export default ProductsStore;
