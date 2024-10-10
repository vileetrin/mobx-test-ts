import {makeAutoObservable} from 'mobx';
import RootStore from './rootStore';

interface Product {
    id: number;
    name: string;
    price: number;
    amount: number;
    image: string;
}

class ProductsStore {
    products: Product[] = [
        {
            id: 1,
            name: 'Shopping bag',
            price: 200,
            amount: 1,
            image: '/img/bag.jpeg',
        },
        {
            id: 2,
            name: 'Baking forms',
            price: 850,
            amount: 1,
            image: '/img/baking-forms.jpeg'
        },
        {
            id: 3,
            name: 'Curlers',
            price: 100,
            amount: 1,
            image: '/img/curlers.jpg'
        },
        {
            id: 4,
            name: 'Scrunchy',
            price: 300,
            amount: 1,
            image: '/img/scrunchy.avif'
        },
    ];

    root: RootStore;

    constructor(root:RootStore) {
        makeAutoObservable(this);
        this.root = root;
    }

    get getAllProducts(): Product[] {
        return this.products;
    }


}

export default ProductsStore;