import {makeAutoObservable} from 'mobx';
import {IProduct} from './interfaces';
import {ProductsServerRepo} from "../repo/ProductsServerRepo.ts";

class ProductsStore {
    products: IProduct[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadProducts() {
        // return this.products;
        ProductsServerRepo.loadProducts().then(res => this.products = res);
    }

    getAllProducts() {
        return this.products
    }

    getProductById(id: number): IProduct | undefined {
        return this.products.find(product => product.id === id);
    }
}

export default ProductsStore;
