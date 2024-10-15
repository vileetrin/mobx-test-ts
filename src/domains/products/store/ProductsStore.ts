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

    getProductById(id: number): IProductEntity | undefined {
        return this.products.find(product => product.id === id);
    }

    setProducts(products: Array<IProductEntity>) {
        this.products = products
    }
}

export default ProductsStore;
