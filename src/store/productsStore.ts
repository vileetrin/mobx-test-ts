import { makeAutoObservable } from 'mobx';
import { IProduct } from './interfaces';

class ProductsStore {
    products: IProduct[] = [];

    constructor(initialProducts: IProduct[]) {
        makeAutoObservable(this);
        this.products = initialProducts;
    }

    getAllProducts(): IProduct[] {
        return this.products;
    }

    getProductById(id: number): IProduct | undefined {
        return this.products.find(product => product.id === id);
    }
}

export default ProductsStore;
