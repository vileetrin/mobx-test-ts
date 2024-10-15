import ProductsStore from "../store/ProductsStore.ts";
import {ProductsServerRepo} from "../../../infrastructure/repo/ProductsServerRepo.ts";
import {IProductEntity} from "../store/Product.ts";

export class ProductPageVM {
    private _productsStore: ProductsStore

    constructor(productsStore: ProductsStore) {
        this._productsStore = productsStore
    }

    public init() {
        ProductsServerRepo.loadProducts()
            .then(products => {
                this._productsStore.setProducts(products)
            });
    }

    getProducts(): Array<IProductEntity> {
        return this._productsStore.getAllProducts()
    }


}