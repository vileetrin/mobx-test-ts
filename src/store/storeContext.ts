import { createContext, useContext } from 'react';
import RootStore from './rootStore';
// import { IProduct } from './interfaces';
//
// const products: IProduct[] = [
//     { id: 1, name: 'Shopping bag', price: 200, image: '/img/bag.jpeg' },
//     { id: 2, name: 'Baking forms', price: 850, image: '/img/baking-forms.jpeg' },
//     { id: 3, name: 'Curlers', price: 100, image: '/img/curlers.jpg' },
//     { id: 4, name: 'Scrunchy', price: 300, image: '/img/scrunchy.avif' },
// ];


const storeContext = createContext(new RootStore());

export const useStore = () => useContext(storeContext);
