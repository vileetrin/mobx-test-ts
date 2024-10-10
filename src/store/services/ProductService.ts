import { IProduct } from '../interfaces.ts';

class ProductService {
    products: IProduct[];

    constructor(products: IProduct[]) {
        this.products = products;
    }

    getProductById(id: number): IProduct | undefined {
        return this.products.find(product => product.id === id);
    }

    getAllProducts(): IProduct[] {
        return this.products;
    }
}

export default ProductService;
