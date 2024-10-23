import { reaction } from 'mobx';
import TestCartStore from './TestCartStore';

const initialProducts = ['Orange', 'Peach'];
const cartStore = new TestCartStore(initialProducts);

let a = 2343;

describe('Autorun', () => {
  it('Should run autorun when observable changed', (): void => {

    function ф() {
      console.log('cartStore.products', cartStore.products);
      console.log('a', a);
    }

    ф();
    a = 3454545;
    ф();

    let productCount: number = 0;

    reaction(() => {
        console.log('isHasDiscount', cartStore.hasDiscount);
        return cartStore.products.length;
      },
      (): void => {
        productCount += 1;
      },
    );

    cartStore.addProduct('Яблоко');
    // expect(productCount).toEqual(3);

    cartStore.addProduct('Банан');
    // expect(productCount).toEqual(4);

    cartStore.setHasDiscount(true);

    expect(productCount).toEqual(2);
  });
});

