import { CartMode2 } from './CartMode2';

export type CartOItem2 = {
  productId: number;
}

// BDD TDD

describe('MobX Reaction Test', () => {
  it('should react to changes in observable properties', () => {
    // GIVEN
    // const cart = new CartTestEntity();

    // let value = 0;
    // reaction(() => cart._items, () => {
    //   value = 1;
    //   console.log("Кількість товарів оновилася");
    // });
    // WHEN
    // cart.addItem();

    // THEN
    // expect(value).toBe(1);
  });

  it('Пользователь может добавтьб товар в корзину', () => {
    // GIVEN
    const cart = new CartMode2();
    const item: CartOItem2 = {
      productId: 1,
    };

    // WHen

    cart.addItems(item);

  });

  it('Пользователь может удалять товар с корзины', () => {

  });

  it('Получить кол-во товара в корзине', () => {

  });

  it('Получить кол-во товара в корзине', () => {

  });
});