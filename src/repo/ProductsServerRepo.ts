import {IProduct} from "../store/interfaces.ts";

export class ProductsServerRepo {

    static loadProducts = (): Promise<Array<IProduct>> => {
        // go to server
        // and fetch data from them
        return Promise.resolve(
            [
                { id: 1, name: 'SERVER_Shopping bag', price: 200, image: '/img/bag.jpeg' },
                { id: 2, name: 'SERVER_Baking forms', price: 850, image: '/img/baking-forms.jpeg' },
                { id: 3, name: 'SERVER_Curlers', price: 100, image: '/img/curlers.jpg' },
                { id: 4, name: 'SERVER_Scrunchy', price: 300, image: '/img/scrunchy.avif' },
            ]
        );
    }
}