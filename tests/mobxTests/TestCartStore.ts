import { action, makeObservable, observable } from 'mobx';

class TestCartStore {
  products: string[];
  hasDiscount: boolean = false;

  constructor(initialProducts: string[]) {
    this.products = initialProducts;

    makeObservable(this, {
      products: observable,
      hasDiscount: observable,
      addProduct: action,
      setHasDiscount: action,
    });
  }

  addProduct(product: string): void {
    this.products.push(product);
  };

  setHasDiscount(value: boolean): void {
    this.hasDiscount = value;
  }
}

export default TestCartStore;