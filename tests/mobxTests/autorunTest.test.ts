import { autorun } from 'mobx';
import TestCartStore from './TestCartStore';

const initialProducts = ['Orange', 'Peach'];

describe('Autorun', () => {
  it('Should run autorun when observable changed', () => {
    const cartStore = new TestCartStore(initialProducts);

    let result: string[] = [];

    autorun(() => {
      result = [...cartStore.products];
    });

    cartStore.addProduct('Яблоко');
    expect(result).toEqual(['Orange', 'Peach', 'Яблоко']);

    cartStore.addProduct('Банан');
    expect(result).toEqual(['Orange', 'Peach', 'Яблоко', 'Банан']);
  });
});
