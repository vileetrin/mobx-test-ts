import {makeAutoObservable} from 'mobx';
import {IProductEntity} from "./Product.ts";

class ProductsStore {
    private products: IProductEntity[] = [];

    constructor() {
        makeAutoObservable(this);
    }
    getAllProducts(): Array<IProductEntity> {
        return this.products
    }

    setProducts(products: Array<IProductEntity>) {
        this.products = products
    }

    getProductById(id: number) {
        return this.products.find(product => product.id === id)
    }
}

export default ProductsStore;
