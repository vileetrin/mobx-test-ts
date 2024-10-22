import { action, makeObservable, observable } from 'mobx';

class CartTestEntity {
  @observable accessor _items = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  addItem() {
    this._items++;
  }
}

// const cart = new Cart();

// reaction(
//   () => cart.items,
//   (items) => {
//     console.log(`Кількість товарів оновилася: ${items}`);
//   },
// );

export default CartTestEntity;