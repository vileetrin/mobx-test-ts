import {IProduct} from "../../domains/products/Product.ts";

export class ProductsServerRepo {

    static loadProducts = (): Promise<Array<IProduct>> => {
        // go to server
        // and fetch data from them
        return Promise.resolve(
            [
                { id: 1, name: 'Shopping bag', price: 200, image: '/img/bag.jpeg' },
                { id: 2, name: 'Baking forms', price: 850, image: '/img/baking-forms.jpeg' },
                { id: 3, name: 'Curlers', price: 100, image: '/img/curlers.jpg' },
                { id: 4, name: 'Scrunchy', price: 300, image: '/img/scrunchy.avif' },
                { id: 5, name: 'Cup', price: 650, image: '/img/cup.jpg' },
                { id: 6, name: 'Notebooks', price: 400, image: '/img/notebooks.jpg' },
                { id: 7, name: 'Pens', price: 550, image: '/img/pens.jpg' },
            ]
        );
    }
}